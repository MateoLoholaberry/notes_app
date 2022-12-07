# Django imports
from django.urls import path

# Views
from apps.usuarios.api.views import (
    ListaUsuariosApiView,
    CrearUsuarioApiView,
    DetallesUsuarioApiView
)


# Urls
urlpatterns = [
    path('usuarios/', ListaUsuariosApiView.as_view(), name='Lista_usuarios'),
    path('crear-usuario/', CrearUsuarioApiView.as_view(), name='crear_usuario'),
    path('detalles-usuario/<int:pk>/', DetallesUsuarioApiView.as_view(), name='detalles_usuario')
    
]
