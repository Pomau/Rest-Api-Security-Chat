from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.files import File
from django.conf import settings
from .models import *
# Create your views here.


def registration(request):
    return render(request, 'chatroom/registration.html', {})


def login(request):
    return render(request, 'chatroom/login.html', {})



def messager(request):
    return render(request, 'chatroom/messager.html', {})