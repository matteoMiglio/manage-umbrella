# Generated by Django 3.2 on 2021-04-29 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Umbrella',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=120)),
                ('description', models.TextField()),
                ('pos_x', models.CharField(max_length=3)),
                ('pos_y', models.CharField(max_length=3)),
                ('state', models.BooleanField(default=False)),
            ],
        ),
    ]
