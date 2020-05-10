from django.db import models

class Exposure(models.Model):

    filename = models.CharField(
        max_length=256,
        verbose_name='Filename', 
        help_text='Filename',
    )

    date_obs = models.DateTimeField(
        verbose_name="Date Observation",
        null=True, 
        blank=True,
        default=None,
    )

    target = models.CharField(
        verbose_name='Target',
        max_length=256,
        null=True, 
        blank=True,
        default=None,
    )

    ra_deg = models.FloatField(
        verbose_name='RA (deg)',
        null=True, 
        blank=True,
        default=None,
    )

    dec_deg = models.FloatField(
        verbose_name='Dec (deg)',
        null=True, 
        blank=True,
        default=None,
    )

    ra = models.CharField(
        verbose_name='RA',
        max_length=30,
        null=True, 
        blank=True,
        default=None,
    )

    dec = models.CharField(
        verbose_name='Dec',
        max_length=30,
        null=True, 
        blank=True,
        default=None,
    )

    band = models.CharField(
        verbose_name='Band',
        max_length=24,
        null=True, 
        blank=True,
        default=None,
    )

    exposure_time = models.FloatField(
        verbose_name='Exposure Time',
        null=True, 
        blank=True,
        default=None,
    )

    telescope = models.CharField(
        verbose_name='Telescope',
        max_length=256,
        null=True, 
        blank=True,
        default=None,
    )

    instrument = models.CharField(
        verbose_name='Instrument',
        max_length=256,
        null=True, 
        blank=True,
        default=None,
    )

    observer = models.CharField(
        verbose_name='Observer',
        max_length=256,
        null=True, 
        blank=True,
        default=None,        
    )

    file_path = models.CharField(
        verbose_name='File Path',
        max_length=2000,
        null=False, 
        blank=False, 
        default=None, 
    )

    file_type = models.CharField(
        verbose_name='File Type',
        max_length=10,
        null=True, 
        blank=True, 
        default=None, 
    )

    file_size = models.PositiveIntegerField(
        verbose_name='File Size',
        null=True, 
        blank=True, 
        default=None, 
        help_text='File Size in bytes'
    )

    class Meta:
        indexes = [
            models.Index(fields=['filename']),
            #models.Index(fields=['date']),
            models.Index(fields=['date_obs']),
            models.Index(fields=['target']),
            models.Index(fields=['ra', 'dec']),
            models.Index(fields=['ra_deg', 'dec_deg']),
        ]

    def __str__(self):
        return (self.filename)
