from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
	list_display = ('username', 'public_key', 'token_access')

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
	list_display = ('id', 'last_message_date', 'get_users')
	def get_users(self, obj):
		return "\n".join([p.username for p in obj.users.all()])
	get_users.short_description = "Пользователи"


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
	list_display = ('id', 'created_date', 'token', 'user', 'chat')


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
	list_display = ('id', 'created_date', 'user', 'text')
