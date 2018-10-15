from django.contrib import admin


from .models import Header, Exposure

@admin.register(Exposure)
class ExposureAdmin(admin.ModelAdmin):
    list_display = ('id', 'filename', 'file_path', 'file_size')
    search_fields = ()

@admin.register(Header)
class HeaderAdmin(admin.ModelAdmin):
    list_display = ('id', 'archive', 'ra', 'dec')
    search_fields = ()