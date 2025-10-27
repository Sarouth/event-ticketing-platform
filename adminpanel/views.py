from django.shortcuts import render

#below all are created according to chatgpt
from django.db.models import Sum, Count, F
from django.utils.dateparse import parse_datetime, parse_date
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .models import Event, Booking
from .serializers import EventSerializer, BookingSerializer
from django.http import HttpResponse

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def sales_report(request):
    # parse query params (YYYY-MM-DD)
    start = request.GET.get('start')
    end = request.GET.get('end')
    bookings = Booking.objects.filter(status='paid')
    if start:
        bookings = bookings.filter(created_at__date__gte=start)
    if end:
        bookings = bookings.filter(created_at__date__lte=end)

    total_tickets = bookings.aggregate(total=Sum('ticket_count'))['total'] or 0
    total_revenue = bookings.aggregate(revenue=Sum('total_amount'))['revenue'] or 0

    # per-event aggregation
    per_event = bookings.values(event_title=F('event__title'), event_pk=F('event__id')).annotate(tickets_sold=Sum('ticket_count'),revenue=Sum('total_amount'),bookings_count=Count('id')).order_by('-revenue') #changed event_id to "event_pk" to prevent conflict

    per_event_list = list(per_event)

    return Response({
        'total_tickets': total_tickets,
        'total_revenue': total_revenue,
        'per_event': per_event_list
    })

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_events(request):
    qs = Event.objects.all()
    serializer = EventSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_bookings(request):
    qs = Booking.objects.select_related('event','user').all()
    serializer = BookingSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def close_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'detail': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    event.is_open = False
    event.save()
    return Response({'detail': 'Event closed successfully'})



def home(request):
    return HttpResponse("May Peace and blessing be upon you!\nWelcome to the Event Ticketing Platform API 👋")
   



class AdminSalesReport(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_tickets = Booking.objects.aggregate(total=Sum('ticket_count'))['total'] or 0
        total_revenue = Booking.objects.aggregate(total=Sum('total_amount'))['total'] or 0

        per_event = Booking.objects.values(
            'event__title', 'event__id'
        ).annotate(
            tickets_sold=Sum('ticket_count'),
            revenue=Sum('total_amount'),
            bookings_count=Count('id')
        )

        return Response({
            'total_tickets': total_tickets,
            'total_revenue': total_revenue,
            'per_event': list(per_event)
        })