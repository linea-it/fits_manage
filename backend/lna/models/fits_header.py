from django.db import models

from lna.models import Exposure
class Header(models.Model):

    archive = models.ForeignKey(
        Exposure, 
        related_name='headers',
        on_delete=models.CASCADE
    )

    name = models.CharField(
        verbose_name='Header', 
        max_length=256,
    )

    value = models.CharField(
        max_length=2048,
        verbose_name='Value',
        null=True, 
        blank=True
    )