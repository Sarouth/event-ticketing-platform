#below all are created according to chatgpt

"""from django.urls import path
from . import views


urlpatterns = [
    path('admin/sales/', views.sales_report, name='admin-sales'),
    path('admin/events/', views.admin_events, name='admin-events'),
    path('admin/bookings/', views.admin_bookings, name='admin-bookings'),
    path('admin/events/<uuid:pk>/close/', views.close_event, name='admin-close-event'),
    path('sales/', views.sales_report, name='sales_report'),
    #path('admin/sales/', views.AdminSalesReport.as_view(), name='admin-sales'),  #what are these?
    #path('admin/events/', views.AdminEventList.as_view(), name='admin-events'), #what are these?
]
"""
from django.urls import path
from . import views

urlpatterns = [
    path('admin/sales/', views.sales_report, name='admin-sales'),
    path('admin/events/', views.admin_events, name='admin-events'),
    path('admin/bookings/', views.admin_bookings, name='admin-bookings'),
    path('admin/events/<uuid:pk>/close/', views.close_event, name='admin-close-event'),
]

"""
from django.urls import path
from . import views

urlpatterns = [
    path('sales/', views.sales_report, name='sales_report'),
    path('events/', views.admin_events, name='admin_events'),
    path('bookings/', views.admin_bookings, name='admin_bookings'),

"""
