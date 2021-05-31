# Generated by Django 3.2 on 2021-05-31 19:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_rename_dater_reservation_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Constant',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('key', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='reservation',
            name='beachLoungers',
            field=models.PositiveSmallIntegerField(default=2),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='subscription',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.subscription'),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='umbrella',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='umbrella', to='myapp.umbrella'),
        ),
    ]
