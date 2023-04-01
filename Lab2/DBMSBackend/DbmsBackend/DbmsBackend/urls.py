"""DbmsBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from .controller.comprehensive_controller import ComprehensiveController

comprehensive_controller=ComprehensiveController()

urlpatterns = [
    path('api/add_flight', comprehensive_controller.add_flight),
    path('api/delete_flight', comprehensive_controller.delete_flight),
    path('api/get_all_flight_info', comprehensive_controller.get_all_flight_info),
    path('api/get_air_controller_by_flight_nbr', comprehensive_controller.get_air_controller_by_flight_nbr),
    path('api/get_all_airline_flight_count', comprehensive_controller.get_all_airline_flight_count),
]
