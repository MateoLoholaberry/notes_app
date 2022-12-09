# Django imports
from django.urls import path

# Views imports
from apps.notas.api.views import (
    CrearNotaApiView,
    VerNotasUsuarioApiView,
    detallesNotaApiView,
)


# Urls
urlpatterns = [
    path('crear-nota/', CrearNotaApiView.as_view(), name='Crear_nota'),
    path('ver-notas/<int:id_usuario>/', VerNotasUsuarioApiView.as_view(), name='Ver-notas-usuario'),
    path('detalles-nota/<int:pk>/', detallesNotaApiView.as_view(), name='detalles_nota')
]
