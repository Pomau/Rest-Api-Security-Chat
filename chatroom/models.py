from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
import uuid
from django.utils.translation import gettext_lazy as _
from .validators import UnicodeUsernameValidator
# Create your models here.


class Profile(models.Model):
	# user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
	public_key = models.CharField("Публичный ключ", max_length=256)
	token_access = models.CharField("Токен", max_length=256, null=True)
	username_validator = UnicodeUsernameValidator()
	username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        }
    )
	session_key = models.CharField("Сессия", max_length=256, null=True)

	def __str__(self):
		return self.username

	class Meta:
		verbose_name = 'Профиль'
		verbose_name_plural = 'Профиль'

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
# 	if created:
# 		Profile.objects.create(user=instance)
#
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
# 	instance.profile.save()


class Chat(models.Model):
	status_code = (
		('1', 'Чат создан'),
		('2', 'Первый пользователь отправил приглашение'),
        ('3', 'Второй пользователь принял'),
		('4', 'Успешно создан')
    )
	id = models.UUIDField("ID", primary_key=True, default=uuid.uuid4, editable=False)
	users = models.ManyToManyField(Profile, verbose_name="Пользователи", null=True, related_name="chates", blank=True)
	last_message_date = models.DateTimeField("Дата последнего сообщения", auto_now=True, blank=True, null=True)
	p = models.CharField("Модуль", max_length=256, null=True)
	g = models.CharField("Число для степени", max_length=10, null=True)
	public_key_user1 = models.CharField("Публичное число для первого пользователя", max_length=256, null=True)
	public_key_user2 = models.CharField("Публичное число для второго пользователя", max_length=256, null=True)
	create_user = models.ForeignKey(Profile, verbose_name="Создатель чата", on_delete=models.CASCADE, related_name="my_create_chat", null=True)
	status = models.CharField("Статус", max_length=256, choices=status_code, null=True)
	def less_message(self):
		return Message.objects.all().filter(chat=self).order_by("-created_date")[:1]

	class Meta:
		verbose_name = 'Чат'
		verbose_name_plural = 'Чат'

class Token(models.Model):
	id = models.UUIDField("ID", primary_key=True, default=uuid.uuid4, editable=False)
	created_date = models.DateTimeField("Дата создания", auto_now_add=True, blank=True)
	token = models.CharField("Токен", max_length=512)
	user = models.ForeignKey(Profile, verbose_name="Пользователь токена", on_delete=models.CASCADE, null=True)
	chat = models.ForeignKey(Chat, verbose_name="Чат", on_delete=models.CASCADE)

	class Meta:
		verbose_name = 'Токен'
		verbose_name_plural = 'Токен'

class Message(models.Model):
	id = models.UUIDField("ID", primary_key=True, default=uuid.uuid4, editable=False)
	chat = models.ForeignKey(Chat, on_delete=models.DO_NOTHING, verbose_name="Чат", related_name="messages")
	created_date = models.DateTimeField("Дата создания", auto_now_add=True)
	text = models.TextField("Текст сообщения")
	user = models.ForeignKey(Profile, verbose_name="Отправитель", on_delete=models.CASCADE, null=True)

	class Meta:
		verbose_name = 'Сообщение'
		verbose_name_plural = 'Сообщение'
