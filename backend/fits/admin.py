from django.contrib import admin


from .models import Header
@admin.register(Header)
class HeaderAdmin(admin.ModelAdmin):
    list_display = ('id', 'filename', )
    search_fields = ()