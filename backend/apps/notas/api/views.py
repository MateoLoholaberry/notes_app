# Django imports
from django.shortcuts import render

# Rest Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Models imports
from apps.notas.models import Nota
from apps.usuarios.models import Usuario

# Serializers imports
from apps.notas.api.serializers import NotaSerializer


# Create your views here.

class CrearNotaApiView(APIView):
    """Vista para crear un nota
    """

    def post(self, request):
        """Crea un nuevo registro
        """

        nota_serializer = NotaSerializer(data=request.data)

        if nota_serializer.is_valid():
            nota_serializer.save()

            data = {
                'mensaje':'La nota se creó correctamente'
            }

            return Response(
                data=data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            data=nota_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class VerNotasUsuarioApiView(APIView):
    """Vista para ver todas las notas de un usuario
    """

    def get(self, request, id_usuario):
        """Obtiene todos los registros de un usuario especifico
        """

        notas = Nota.objects.filter(usuario = id_usuario).all()

        # print("NOTAS")
        # print(notas)

        notas_serializer = NotaSerializer(notas, many=True)

        if len(notas_serializer.data) == 0:

            try:
                Usuario.objects.get(pk=id_usuario)

            except:
                data = {
                    'mensaje': 'El usuario no existe'
                }

                return Response(
                    data=data,
                    status=status.HTTP_400_BAD_REQUEST
                )


            data = {
                'mensaje': 'No hay notas registradas en este usuario'
            }

            return Response(
                data=data,
                status=status.HTTP_200_OK
            )


        # print("----DATOS DE NOTAS:")
        # print(notas_serializer.data)

        return Response(
            data=notas_serializer.data,
            status=status.HTTP_200_OK
        )



class detallesNotaApiView(APIView):
    """Vista para obtener modificar y eliminar una nota
    """

    def get(self, request, pk):
        """Obtiene un registro espeficio
        """

        try:
            nota = Nota.objects.get(pk=pk)
        except:

            data = {
                'mensaje':'Nota no encontrada'
            }

            return Response(
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )

        nota_serializer = NotaSerializer(nota)

        return Response(
            data=nota_serializer.data,
            status=status.HTTP_200_OK
        )


    def put(self, request, pk):
        """Modifica un registro espeficio
        """

        try:
            nota = Nota.objects.get(pk=pk)
        except:

            data = {
                'mensaje':'Nota no encontrada'
            }

            return Response(
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )

        nota_serializer = NotaSerializer(nota, data=request.data)

        if nota_serializer.is_valid():

            nota_serializer.save()

            data = {
                'mensaje':'La nota se modificó correctamente'
            }

            return Response(
                data=data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            data=nota_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    def delete(self, request, pk):
        """Elimina un registro espeficio
        """

        try:
            nota = Nota.objects.get(pk=pk)
        except:

            data = {
                'mensaje':'Nota no encontrada'
            }

            return Response(
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )

        nota.delete()

        data = {
            'mensaje': 'Nota eliminada correctamente'
        }

        return Response(
            data=data,
            status=status.HTTP_200_OK
        )