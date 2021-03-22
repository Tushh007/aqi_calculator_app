from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.db.models import Q
from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.response import Response
from .models import AQI_Calculator
from .serializers import UserSerializer, AQI_CalculatorSerializer
from .permissions import ReadOnly
from rest_framework import filters
from django.shortcuts import get_object_or_404


# Create your views here.
def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


class UserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )


class AQI_CalculatorViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the AQI_Calculator model
    """
    queryset = AQI_Calculator.objects.all()
    serializer_class = AQI_CalculatorSerializer
    permission_classes = (permissions.AllowAny, )
