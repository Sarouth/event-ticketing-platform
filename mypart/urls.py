"""
URL configuration for mypart project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
"""#from django.contrib import admin
#from django.urls import path

#below two are pasted according to chatgpt
from django.contrib import admin
from django.urls import path, include
#after homepage error(for temp)
#from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView  #added accord to phase2




urlpatterns = [
    #path('', lambda request: HttpResponse("<h2>May peace and blessing be upon you!</h2>")), #for temp to get homepage
    path('admin/', admin.site.urls),
    path('api/', include('adminpanel.urls')),  # adminpanel APIs under /api/ (pasted according to chatgpt)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]   

"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from adminpanel import views
# below for temporary email check
from django.urls import path
from bookings.views import test_email


urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('adminpanel.urls')),  # if you have an app with API endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test-email/', test_email), # this is for temp email check

]
