from urllib.parse import urljoin

from django.conf import settings
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import AQI_Calculator


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=False, style={
                                      'input_type': 'password', 'placeholder': 'Password'})
    password2 = serializers.CharField(write_only=True, required=False, style={
                                      'input_type': 'password', 'placeholder': 'Password'})

    def validate(self, data):
        if 'password1' in data.keys() and 'password2' in data.keys():
            if data['password1'] != data['password2']:
                raise serializers.ValidationError('Passwords must match.')
        return data

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }
        if 'password1' in validated_data.keys() and 'password2' in validated_data.keys():
            data['password'] = validated_data['password1']
        data['first_name'] = validated_data['first_name'].capitalize()
        data['last_name'] = validated_data['last_name'].capitalize()
        user = self.Meta.model.objects.create_user(**data)
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = (
            'id', 'email', 'password1', 'password2',
            'first_name', 'last_name'
        )
        read_only_fields = ('id',)


class AQI_CalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = AQI_Calculator
        fields = ('id', 'pollutant', 'concentration', 'aqi', 'aqi_category', 'sensitive_groups', 'health_effects_statements', 'cautionary_statements',
                  'created', 'updated', 'user')
        read_only_fields = ('id', 'created', 'updated')
        extra_kwargs = {
            'user': {'required': True},
        }
