# Generated by Django 2.1.1 on 2019-01-28 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fits', '0007_auto_20190128_1833'),
    ]

    operations = [
        migrations.AddField(
            model_name='exposure',
            name='dec_deg',
            field=models.FloatField(blank=True, null=True, verbose_name='Dec (deg)'),
        ),
        migrations.AddField(
            model_name='exposure',
            name='ra_deg',
            field=models.FloatField(blank=True, null=True, verbose_name='RA (deg)'),
        ),
    ]
