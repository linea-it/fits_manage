from django.db import models


class FilePath(models.Model):

    filename = models.CharField(
        max_length=256,
        null=True, blank=True,
        verbose_name='Filename', help_text='Filename'
    )

    file_size = models.PositiveIntegerField(
        verbose_name='File Size',
        null=True, blank=True, default=None, help_text='File Size in bytes')

