# Generated by Django 3.0.4 on 2020-03-27 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lna', '0014_auto_20191011_1314'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exposure',
            name='dec',
            field=models.CharField(blank=True, default=None, max_length=30, null=True, verbose_name='Dec'),
        ),
        migrations.AlterField(
            model_name='exposure',
            name='file_type',
            field=models.CharField(blank=True, default=None, max_length=10, null=True, verbose_name='File Type'),
        ),
        migrations.AlterField(
            model_name='exposure',
            name='ra',
            field=models.CharField(blank=True, default=None, max_length=30, null=True, verbose_name='RA'),
        ),
    ]
