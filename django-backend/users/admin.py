from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

User = get_user_model()


@admin.register(User)
class CustomUserAdmin(UserAdmin):
	model = User
	fieldsets = UserAdmin.fieldsets
	add_fieldsets = UserAdmin.add_fieldsets
	list_display = ("username", "email", "is_staff", "is_active", "role")
	list_filter = ("is_staff", "is_active", "role")
