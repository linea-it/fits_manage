from django.contrib import admin

from lna.models import Header, Exposure

@admin.register(Exposure)
class ExposureAdmin(admin.ModelAdmin):
    list_display = ('id', 'filename', 'file_path', 'file_size')
    search_fields = ('filename',)

@admin.register(Header)
class HeaderAdmin(admin.ModelAdmin):
    list_display = ('id', 'archive', 'name', 'value')
    # search_fields = ()