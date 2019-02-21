from django.contrib import admin

from lna.models import Header, Exposure


@admin.register(Exposure)
class ExposureAdmin(admin.ModelAdmin):
    list_display = ('id', 'filename', 'date', 'target', 'ra_deg',
                    'dec_deg', 'ra', 'dec', 'band', 'exposure_time', 'telescope', 'instrument', 'observer')
    search_fields = ('filename', 'target', 'observer')


@admin.register(Header)
class HeaderAdmin(admin.ModelAdmin):
    list_display = ('id', 'exposure', 'name', 'value')
    # search_fields = ()
