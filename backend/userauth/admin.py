from django.contrib import admin
from userauth.models  import User,Profile
# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display=["user","full_name","date"]

admin.site.register(User)
admin.site.register(Profile,ProfileAdmin)