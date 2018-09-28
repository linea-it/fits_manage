from django.db import models


class Header(models.Model):

    filename = models.CharField(
        max_length=256,
        verbose_name='Filename', 
        help_text='Filename',
        null=True, 
        blank=True
    )
    path = models.CharField(
        max_length=1024,
        verbose_name='Path',
        help_text='Path',
        null=True, 
        blank=True
    )
    simple = models.BooleanField(
        verbose_name='Simple', 
        help_text='',
        default=False
    )

    file_size = models.PositiveIntegerField(
        verbose_name='File Size',
        null=True, 
        blank=True, 
        default=None, 
        help_text='File Size in bytes'
    )

