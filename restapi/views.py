from django.shortcuts import render
from django.db.models import F, Q
from django.db import models
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import schema
from chatroom.models import *
from .serializers import *
from argon2 import PasswordHasher
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import random
import string
from django.shortcuts import get_object_or_404

def login(auth, profile):
	ph = PasswordHasher(hash_len=120, time_cost=250,memory_cost=10240)
	try:
		ph.verify(profile.token_access, auth)
		if ph.check_needs_rehash(profile.token_access):
			profile.token_access = ph.hash(auth)
			profile.save()
		return True
	except:
		return False

def paginator(resources, page, page_count=1000):
	paginator = Paginator(resources, page_count)
	try:
		resources = paginator.page(page)
	except PageNotAnInteger:
		# If page is not an integer, deliver first page.
		resources = paginator.page(1)
	except EmptyPage:
		# If page is out of range (e.g. 9999), deliver last page of results.
		resources = resources[page_count*page:]
	return resources


def generate_session():
	length = 128
	letters = string.ascii_letters + string.digits
	rand_string = ''.join(random.choice(letters) for i in range(length))
	return rand_string

def generate_digits(length):
	letters = string.digits
	rand_string = ''.join(random.choice(letters) for i in range(length))
	return rand_string

# Create your views here.
class ChatListView(APIView):
	"""Вывод чатов"""
	# {}
	def post(self, request):
		session = request.COOKIES.get('session')
		if session is not None:
			profile = get_object_or_404(Profile, session_key=session)
			apps = profile.chates.order_by('-last_message_date')
			page = request.data.get('page')
			apps = paginator(apps, page)

			profile_arr = [app.users.filter(~Q(pk=profile.pk))[0] for app in apps]
			print(profile_arr)
			serializer = ProfileChatListSerializers(profile_arr, many=True)
			# serializer = ChatListSerializers(apps, many=True)
			data = serializer.data
			for i in range(len(data)):
				data[i]["chat_id"] = apps[i].pk
				data[i]["status"] = apps[i].status
			return Response(serializer.data)
		else:
			return Response(status=400)

class ChatNoWorkListView(APIView):
	"""Вывод не сделанных чатов"""
	# {}
	def post(self, request):
		session = request.COOKIES.get('session')
		if session is not None:
			profile = get_object_or_404(Profile, session_key=session)
			apps = profile.chates.filter((Q(status__in=[1,3]) & Q(create_user=profile))|(Q(status=2) & ~Q(create_user=profile)))
			serializer = ChatListSerializers(apps, many=True)
			print(apps)
			# serializer = ChatListSerializers(apps, many=True)
			return Response(serializer.data)
		else:
			return Response(status=400)


class MessageListView(APIView):
	"""Вывод сообщений"""
	# {"pk":"0eec4f13-9555-48ab-866b-21a1019cf503"}
	def post(self, request):
		pk = request.data.get('pk')
		session = request.COOKIES.get('session')
		if session is not None:
			profile = get_object_or_404(Profile, session_key=session)
			chat = profile.chates.get(pk=pk)
			messages = chat.messages.order_by("created_date")
			page = request.data.get('page')
			messages = paginator(messages, page)
			serializer = MessageListSerializers(messages, many=True)
			data = serializer.data
			if len(data) > 0:
				data[0]["token"] = chat.token_set.get(user=profile).token
				data[0]["myuser"] = profile.pk
				data[0]["username"] = profile.username
				data[0]["opponent"] = chat.users.filter(~Q(pk=profile.pk))[0].pk
			return Response(serializer.data)
		else:
			return Response(status=400)



class UserListView(APIView):
	"""Вывод пользователей"""
	# {"username":"pom"}
	def post(self, request):
		session = request.COOKIES.get('session')
		if session is not None:
			profile = get_object_or_404(Profile, session_key=session)
			name = request.data.get('username')
			profile = Profile.objects.filter(username__startswith=name).exclude(pk=profile.pk)[:15]
			serializer = ProfileChatListSerializers(profile, many=True)
			return Response(serializer.data)
		else:
			return Response(status=400)

class TokenListView(APIView):
	"""Вывод токенов"""
	# {}
	def post(self, request):
		session = request.COOKIES.get('session')
		if session is not None:
			profile = get_object_or_404(Profile, session_key=session)
			chat = profile.chates.order_by('-last_message_date')
			token = [ch.token_set.get(user=profile) for ch in chat]
			page = request.data.get('page')
			token = paginator(token, page)
			serializer = TokenListSerializers(token, many=True)
			return Response(serializer.data)
		else:
			return Response(status=400)

class ChatCreateView(APIView):
	"""Создание чата"""
	# { "user": 2 }
	def post(self, request):
		chat = ChatListSerializers(data=request.data)
		session = request.COOKIES.get('session')
		if session is not None and chat.is_valid():
			profile = get_object_or_404(Profile, session_key=session)
			interlocutor = get_object_or_404(Profile, pk=request.data['user'])
			chat.save(p=generate_digits(256), g=generate_digits(10), create_user=profile, status="1", users = [profile, interlocutor])
			return Response(chat.data)
		else:
			print(chat.errors)
			return Response(status=400)


class MessageCreateView(APIView):
	"""Создание сообщений"""
	# { "chat":"0eec4f13-9555-48ab-866b-21a1019cf503", "text":"Profile"}
	def post(self, request):
		message = MessageListSerializers(data=request.data)
		session = request.COOKIES.get('session')
		if session is not None:
			profile = get_object_or_404(Profile, session_key=session)
			# message.is_valid()
			# print(message.errors)
			if message.is_valid():
				chat_id = request.data['chat']
				chat = Chat.objects.get(id=chat_id)
				chat.save()
				message.save(user=profile)
				return Response(message.data)
			else:
				return Response(status=400)
		else:
			return Response(status=400)

class UserCreateView(APIView):
	"""Создание пользователя"""
	# {"username":"pom", "token":"sad", "public_key":"1"}
	def post(self, request):
		user = ProfileListSerializers(data=request.data)
		if user.is_valid():
			ph = PasswordHasher(hash_len=120, time_cost=250,memory_cost=10240)
			token1 = ph.hash(request.data.get('token'))
			
			user.save(token_access=token1)
			return Response(user.data)
		else:
			print(user.errors)
			return Response(status=400)

class TokenCreateView(APIView):
	"""Создание токена"""
	# {"token":"234fwerwet213", "chat":"0eec4f13-9555-48ab-866b-21a1019cf503"}
	def post(self, request):
		token = TokenListSerializers(data=request.data)
		session = request.COOKIES.get('session')
		if session is not None and token.is_valid():
			profile = get_object_or_404(Profile, session_key=session)
			token.save(user=profile)
			chat = get_object_or_404(Chat, id=request.data.get('chat'))
			if chat.status == "3" and chat.create_user == profile:
				chat.status = "4"
				chat.p = ""
				chat.g = ""
				chat.public_key_user1 = ""
				chat.public_key_user2 = ""
				chat.save()
			return Response(token.data)
		else:
			print(token.errors)
			return Response(status=400)


class PublicKeyCreateView(APIView):
	"""Создание публичного ключа"""
	# {"key":"234fwerwet213", "chat":"0eec4f13-9555-48ab-866b-21a1019cf503"}
	def post(self, request):
		session = request.COOKIES.get('session')
		id_chat = request.data.get('chat')
		key = request.data.get('key')
		if session is not None:
			profile = get_object_or_404(Profile, session_key=session)
			chat = get_object_or_404(Chat, id=id_chat)
			if chat.status == "1" and chat.create_user == profile:
				chat.public_key_user2 = key
				chat.status = "2"
			elif chat.status == "2" and chat.create_user != profile and len(chat.users.filter(pk=profile.pk)) == 1:
				chat.public_key_user1 = key
				chat.status = "3"
			chat.save()
			return Response("OK")
		else:
			print(token.errors)
			return Response(status=400)

class SessionCreateView(APIView):
	"""Создание сессии при входе пользователя"""
	# {"token":"sad", "public_key":"1"}
	def post(self, request):
		auth = request.data.get('token')
		pb_key = request.data.get('public_key')
		print("---------------------------",pb_key, "---------------------------")
		profile = Profile.objects.get(public_key=pb_key)

		if login(auth, profile):
			print(2)
			session = generate_session()
			profile.session_key = session
			profile.save()
			response = Response("OK")
			response.set_cookie('session', session, max_age=None, secure=settings.SESSION_COOKIE_SECURE or None, httponly=True)
			return response
		else:
			return Response(status=400)
