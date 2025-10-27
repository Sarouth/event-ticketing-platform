from django.core.mail import send_mail
from django.conf import settings

def send_booking_confirmation(user_email, event_name):
    subject = f"Booking Confirmation — {event_name}"
    message = f"Dear user,\n\nYour booking for '{event_name}' has been confirmed.\n\nThank you for using our platform!"
    from_email = settings.DEFAULT_FROM_EMAIL
    send_mail(subject, message, from_email, [user_email])
