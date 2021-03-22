from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from .models import AQI_Calculator, User
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


@admin.register(AQI_Calculator)
class AQI_CalculatorAdmin(admin.ModelAdmin):
    fields = (
        'id', 'pollutant', 'concentration', 'aqi', 'aqi_category', 'sensitive_groups', 'health_effects_statements', 'cautionary_statements',
        'created', 'updated',
    )
    list_display = (
        'id', 'pollutant',
        'created', 'updated',
    )
    list_filter = (
        'pollutant',
    )
    readonly_fields = (
        'id', 'created', 'updated',
    )
