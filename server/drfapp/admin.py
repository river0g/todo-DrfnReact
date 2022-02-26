from django.contrib import admin

# Register your models here.
from .models import Task, Member

admin.site.register(Task)
admin.site.register(Member)