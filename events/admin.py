from django.contrib import admin
from .models import CustomUser, Category, Event

# ---------------- Custom User Admin ----------------
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role')  
    fields = ('username', 'email', 'password', 'role') 
    search_fields = ('username', 'email')  
    ordering = ('username',)

# ---------------- Category Admin ----------------
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name') 
    search_fields = ('name',)
    ordering = ('name',)

# ---------------- Event Admin ----------------
class EventAdmin(admin.ModelAdmin):
    list_display = (
        'event_name', 'category', 'location', 'date', 'time', 
        'ticket_price', 'total_tickets', 'available_tickets', 'created_at'
    )
    list_filter = ('category', 'date')
    search_fields = ('event_name', 'location')
    ordering = ('date',)

# ---------------- Register models ----------------
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Event, EventAdmin)

