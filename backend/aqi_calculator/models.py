import uuid
from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from datetime import datetime, timedelta
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from .managers import UserManager


# Create your models here.
class AQI_Calculator(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    pollutant = models.CharField(max_length=100, null=False, blank=False)
    aqi = models.FloatField(null=False, blank=False)
    concentration = models.FloatField(null=False, blank=False)
    aqi_category = models.CharField(max_length=1000, null=False, blank=False)
    sensitive_groups = models.TextField(max_length=1000, blank=True)
    health_effects_statements = models.TextField(max_length=1000, blank=True)
    cautionary_statements = models.TextField(max_length=500, blank=True)
    user = models.ForeignKey(
        'User',
        on_delete=models.DO_NOTHING,
        related_name='AQI_Calculator',
        blank=True,
        null=True,
    )

    def __str__(self):
        return f'{self.id}'


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
