# Generated by Django 3.2 on 2021-06-14 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0016_alter_subscription_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='deposit',
            field=models.PositiveSmallIntegerField(blank=True, default=0),
        ),
    ]
