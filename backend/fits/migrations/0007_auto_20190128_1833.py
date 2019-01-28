# Generated by Django 2.1.1 on 2019-01-28 18:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fits', '0006_header_archive'),
    ]

    operations = [
        migrations.AlterField(
            model_name='header',
            name='archive',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='headers', to='fits.Exposure'),
        ),
    ]
