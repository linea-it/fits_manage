# Generated by Django 3.0.4 on 2020-04-10 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lna', '0015_auto_20200327_1736'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='exposure',
            index=models.Index(fields=['ra_deg', 'dec_deg'], name='lna_exposur_ra_deg_8e8926_idx'),
        ),
    ]
