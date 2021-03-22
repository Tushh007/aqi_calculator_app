from django.urls import path, include
from rest_framework import routers

from . import views


app_name = 'aqi_calculator'

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'history', views.AQI_CalculatorViewSet,
                basename='aqi_calculator')

urlpatterns = [
    path('', include(router.urls)),
]
