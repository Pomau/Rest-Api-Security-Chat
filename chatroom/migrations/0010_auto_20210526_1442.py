# Generated by Django 3.1.5 on 2021-05-26 14:42

import chatroom.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatroom', '0009_auto_20210526_1220'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='public_key',
            field=models.CharField(max_length=256, null=True, verbose_name='Публичный ключ'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='token_access',
            field=models.CharField(max_length=256, verbose_name='Токен'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='username',
            field=models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[chatroom.validators.UnicodeUsernameValidator()], verbose_name='username'),
        ),
    ]
