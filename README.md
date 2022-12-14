# Proyecto final integrador del PIL

## App de notas

## Puesta en marcha del proyecto completo

1. Clonar o descargar el repositorio de Github
2. Verificar que tenemos descargado node.js en nuestro equipo
3. A traves del cmd, crear un ambiente virtual en el repostorio
4. Activar el ambiente virtual
5. Descargar todos los paquetes del requirements.txt (`pip install -r requirements.txt`)
6. A traves del cmd, entrar a la carpeta frontend y descargar los node modules (`npm i`)
7. Abrir XAMPP, activar apache y MySQL, luego entrar a phpMyAdmin e importar la base de datos notesapp.sql
8. Abrir una instancia de cmd e ingresar a la carpeta backend y correr el comando `python manage.py runserver`
9. Abrir otra instancia del cmd e ingresar a la carpeta frontend y correr el comando `npm start`
10. Alli se cargará en el navegador el localhost con la app en funcionamiento.

## Funcionamiento del proyecto

al iniciar la app la página de inicio o principal muestra la **lista de usuarios registrados**, luego a traves de la navbar podemos ir, además de a la lista de usuarios registrados, a los formularios para **registrar un nuevo usuario** e **iniciar sesión**.

Cuando iniciamos sesión, la app nos redirige a la **lista de nuestras notas** en donde podemos ver todas nuestras notas registradas, y alli podemos **editarlas** y **borrarlas**.
Al estar logueados, atraves de la barra de navegación, podemos acceder al **formulario para agregar una nueva nota**, al **formulario para editar nuestro usuario o eliminarlo**, y además podemos **cerrar sesión** que nos redirige a la pagina de inicio en donde estan todos los usuarios registrados.
