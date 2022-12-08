# Django imports
from django.urls import path

# Views
from apps.usuarios.api.views import (
    ListaUsuariosApiView,
    CrearUsuarioApiView,
    DetallesUsuarioApiView,
    ValidarUsuarioApiView
)


# Urls
urlpatterns = [
    path('usuarios/', ListaUsuariosApiView.as_view(), name='Lista_usuarios'),
    path('crear-usuario/', CrearUsuarioApiView.as_view(), name='crear_usuario'),
    path('detalles-usuario/<int:pk>/', DetallesUsuarioApiView.as_view(), name='detalles_usuario'),
    path('login/', ValidarUsuarioApiView.as_view(), name='login')
]
