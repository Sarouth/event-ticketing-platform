from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .utils import send_booking_confirmation

def create_booking(request):
    # example only — you’ll later implement real logic here
    user_email = "test@example.com"
    event_name = "Concert Night"

    send_booking_confirmation(user_email, event_name)

    return render(request, "booking_done.html")
#Example (assuming you’ll later have a Booking model and a view to handle creation):


#temporary checking below
from django.http import HttpResponse
from .utils import send_booking_confirmation

def test_email(request):
    send_booking_confirmation("zain8638yn@gmail.com", "Sample Event")
    return HttpResponse("Email sent! Check your console.")
