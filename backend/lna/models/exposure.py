from django.db import models

class Exposure(models.Model):

    filename = models.CharField(
        max_length=256,
        verbose_name='Filename', 
        help_text='Filename',
        null=True, 
        blank=True
    )

    ra_deg = models.FloatField(
        verbose_name='RA (deg)',
        null=True, 
        blank=True
    )

    dec_deg = models.FloatField(
        verbose_name='Dec (deg)',
        null=True, 
        blank=True
    )

    file_path = models.CharField(
        max_length=256,
        verbose_name='File Path',
        help_text='Path',
        null=True, 
        blank=True
    )

    file_size = models.PositiveIntegerField(
        verbose_name='File Size',
        null=True, 
        blank=True, 
        default=None, 
        help_text='File Size in bytes'
    )

    def __str__(self):
        return (self.filename)
