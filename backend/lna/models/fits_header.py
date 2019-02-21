from django.db import models

from lna.models import Exposure
class Header(models.Model):

    exposure = models.ForeignKey(
        Exposure, 
        related_name='headers',
        on_delete=models.CASCADE
    )

    name = models.CharField(
        verbose_name='Header', 
        max_length=256,
    )

    value = models.TextField(
        verbose_name='Value',
        null=True, 
        blank=True,
        default=None
    )

    class Meta:
        indexes = [
            models.Index(fields=['exposure']),
            models.Index(fields=['name']),
        ]