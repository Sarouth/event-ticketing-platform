from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import send_booking_confirmation

class BookingView(APIView):
    def post(self, request):
        user_email = request.data.get('email')
        event_name = request.data.get('event_name')
        # (save booking logic here)
        send_booking_confirmation(user_email, event_name)
        return Response({"message": "Booking confirmed and email sent!"})
