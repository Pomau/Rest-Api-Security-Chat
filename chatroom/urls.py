from django.urls import path, include
from . import views
from django.conf import settings

urlpatterns = [
    path('registration', views.registration, name='registration'),
    path('login', views.login, name='login'),
    path('messager', views.messager, name='messager'),
]
