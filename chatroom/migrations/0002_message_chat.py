# Generated by Django 3.1.5 on 2021-05-20 17:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chatroom', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='chat',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='chatroom.chat', verbose_name='Чат'),
        ),
    ]
