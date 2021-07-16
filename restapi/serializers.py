from rest_framework import serializers
from chatroom.models import *
from rest_framework import fields
from django.conf import settings

class MessageListSerializers(serializers.ModelSerializer):
	"""Список сообщений из чата"""
	class Meta:
		model = Message
		fields = "__all__"


class ProfileListSerializers(serializers.ModelSerializer):
	"""Список пользователей"""
	class Meta:
		model = Profile
		fields = "__all__"
	

class ProfileChatListSerializers(serializers.ModelSerializer):
	"""Список пользователей краткая информация"""
	class Meta:
		model = Profile
		fields = ("id", "username")

class ChatListSerializers(serializers.ModelSerializer):
	"""Список чатов"""
	#messages = MessageListSerializers(many=True, read_only=True, source="less_message")
	#users_chat = ProfileListSerializers(many=True)
	class Meta:
		model = Chat
		fields = "__all__"

class TokenListSerializers(serializers.ModelSerializer):
	"""Список сообщений из чата"""
	class Meta:
		model = Token
		fields = "__all__"


class UserGetSerializers(serializers.ModelSerializer):
	"""Список сообщений из чата"""
	class Meta:
		model = settings.AUTH_USER_MODEL
		fields = ('username',)

