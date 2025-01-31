# Generated by Django 2.1.5 on 2019-01-29 17:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exposure',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename', models.CharField(blank=True, help_text='Filename', max_length=256, null=True, verbose_name='Filename')),
                ('ra_deg', models.FloatField(blank=True, null=True, verbose_name='RA (deg)')),
                ('dec_deg', models.FloatField(blank=True, null=True, verbose_name='Dec (deg)')),
                ('file_path', models.CharField(blank=True, help_text='Path', max_length=256, null=True, verbose_name='File Path')),
                ('file_size', models.PositiveIntegerField(blank=True, default=None, help_text='File Size in bytes', null=True, verbose_name='File Size')),
            ],
        ),
        migrations.CreateModel(
            name='Header',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256, verbose_name='Header')),
                ('value', models.CharField(blank=True, max_length=2048, null=True, verbose_name='Value')),
                ('archive', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='headers', to='lna.Exposure')),
            ],
        ),
    ]
