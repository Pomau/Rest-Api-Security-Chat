from django.urls import path

from . import views

urlpatterns = [
	path("chat/get", views.ChatListView.as_view()),
	path("chat/nowork/get", views.ChatNoWorkListView.as_view()),
	path("message/get", views.MessageListView.as_view()),
	path("user/get", views.UserListView.as_view()),
	path("token/get", views.TokenListView.as_view()),
	path("chat/create", views.ChatCreateView.as_view()),
	path("chat/public_key", views.PublicKeyCreateView.as_view()),
	path("message/create", views.MessageCreateView.as_view()),
	path("user/create", views.UserCreateView.as_view()),
	path("user/session", views.SessionCreateView.as_view()),
	path("token/create", views.TokenCreateView.as_view()),
]
