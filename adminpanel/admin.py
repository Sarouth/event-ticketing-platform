#below all are updated sccording to chatgpt in phase1

from django.contrib import admin

from .models import Event, Booking, Payment

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'venue', 'capacity', 'price', 'is_open')
    list_filter = ('is_open', 'date')
    search_fields = ('title', 'venue')
    actions = ['close_event']

    def close_event(self, request, queryset):
        updated = queryset.update(is_open=False)
        self.message_user(request, f"{updated} event(s) closed.")
    close_event.short_description = "Close selected events"

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'user', 'ticket_count', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__email', 'event__title')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'booking', 'provider', 'status', 'transaction_id', 'created_at')
    list_filter = ('provider', 'status', 'created_at')

# Register your models here.
