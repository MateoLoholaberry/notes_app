from django.db import models
from apps.usuarios.models import Usuario
from django.utils import timezone

# Create your models here.
class Nota(models.Model):

    titulo = models.CharField(
        max_length=30,
        verbose_name = 'Título'
    )

    contenido = models.CharField(
        max_length=255,
        verbose_name= 'Contenido'
    )

    fecha_creacion = models.DateField(
        verbose_name='Fecha de creación',
        default= timezone.now
    )

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE
    )

    # Configuración
    class Meta:
        verbose_name_plural = 'Notas'
        db_table = 'nota'

    def __str__(self):
        return self.titulo