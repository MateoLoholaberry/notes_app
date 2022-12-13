# rest_framework imports
from rest_framework import serializers

# Models imports
from apps.notas.models import Nota

# Serializers
class NotaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Nota
        fields = '__all__'