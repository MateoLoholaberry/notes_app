from django.shortcuts import render

# Rest imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models imports
from apps.usuarios.models import Usuario

# serializers imports
from apps.usuarios.api.serializers import UsuariosSerializer


# Create your views here.

class ListaUsuariosApiView(APIView):
    """vista para listar todos los usuarios que hay registrados
    """

    def get(self, request):
        """Lista todos los usuarios
        """

        usuarios = Usuario.objects.all()

        lista_usuarios = UsuariosSerializer(usuarios, many=True)


        return Response(
            data = lista_usuarios.data,
            status=status.HTTP_200_OK
        )



class CrearUsuarioApiView(APIView):
    """Vista para crear un nuevo usuario
    """

    def post(self, request):
        """Crear un nuevo usuario
        """

        serializer = UsuariosSerializer(data=request.data)


        if serializer.is_valid():
            serializer.save()

            data = {
                'mensaje': 'El usuario se creó correctamente',
                'status':'Ok'
            }

            return Response(
                data=data,
                status=status.HTTP_201_CREATED
            )

        return Response (
            data=serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )



# login
class ValidarUsuarioApiView(APIView):

    def get(self, request, user_name, contrasenia):

        # print("-----DATA---")
        # print(request.data['user_name'])
        # print(request.data['contrasenia'])

        # user_name = request.data['user_name']
        # contrasenia = request.data['contrasenia']

        try:
            usuario = Usuario.objects.filter(user_name=user_name, contrasenia=contrasenia).get()
        except:
            data = {
                'mensaje': 'usuario o contraseña incorrecto',
                'status':''
            }

            return Response (
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )


        # print("USUARIO")
        # print(usuario)

        usuario_serializer = UsuariosSerializer(usuario)

        return Response (
            data=usuario_serializer.data,
            status=status.HTTP_200_OK
        )



class DetallesUsuarioApiView(APIView):
    """Vista para obtener, modificar o eliminar un usuario
    """


    def get(self, request, pk):
        """Obtiene un usuario específico
        """

        try:
            usuario = Usuario.objects.get(pk=pk)

        except:
            data = {
                'menaje':'Usuario no encontrado',
                'status':''
            }

            return Response(
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )


        usuario_serializer = UsuariosSerializer(usuario)

        return Response(
            data=usuario_serializer.data,
            status=status.HTTP_200_OK
        )


    def put(self, request, pk):
        """Modifica un usuario específico
        """

        try:
            usuario = Usuario.objects.get(pk=pk)
        except:

            data = {
                'menaje':'Usuario no encontrado',
                'status':''
            }

            return Response(
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )


        usuario_serializer = UsuariosSerializer(usuario, data=request.data)

        if usuario_serializer.is_valid():
            usuario_serializer.save()

            data = {
                'mensaje': 'El usuario se modificó correctamente',
                'status':'Ok'
            }

            return Response(
                data=data,
                status=status.HTTP_200_OK
            )

        return Response(
            data=usuario_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    def delete(self, request, pk):

        try:
            usuario = Usuario.objects.get(pk=pk)
        except:

            data = {
                'menaje':'Usuario no encontrado',
                'status':''
            }

            return Response(
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario.delete()

        data = {
            'mensaje':'El usuario ha sido eliminado correctamente',
            'status':'Ok'
        }

        return Response(
            data=data,
            status=status.HTTP_200_OK
        )



