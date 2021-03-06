# Generated by Django 3.1.5 on 2021-05-20 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatroom', '0004_auto_20210520_1805'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='access_token',
            new_name='token_access',
        ),
        migrations.RemoveField(
            model_name='token',
            name='message',
        ),
        migrations.AddField(
            model_name='token',
            name='message',
            field=models.ManyToManyField(null=True, to='chatroom.Message', verbose_name='Сообщение'),
        ),
    ]
