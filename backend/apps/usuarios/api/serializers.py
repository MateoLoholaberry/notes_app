# rest_framework imports
from rest_framework import serializers

# Models imports
from apps.usuarios.models import Usuario

# Serializers
class UsuariosSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Usuario
        fields = '__all__'