# Generated by Django 3.2 on 2021-06-03 20:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0012_alter_reservation_umbrella'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='umbrella',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.umbrella'),
        ),
    ]
