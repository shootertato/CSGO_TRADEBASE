# CSGO-TRADEBASE v.0.0
![logo App](img\logo_white_large.png)

Esta app va dirigida a toda esa gente que quiere intercambiar sus skins de CS:GO (Counter Strike Global Ofensive) y no sabe donde hacerlo mediante un sistema de posteo de anuncios.

## Functional description
Características de la app:
- Registro de usuarios.
- Posteo de anuncios.
- Añadir a la base de datos usuario y posts/anuncios.
- Crear, modificar y eliminar los anuncios.
- enlace directo a steam para enviar la oferta de intercambio.

## Technical Description

- verifyToken(): Verifica el token del usuario para dar acceso a las partes no visibles a los usuarios no registrados.
- catch(): Muestra errores en la aplicacion para informar al usuario de lo que sucede. 
- postRouter.delete(): Elimina u usuario de la base de datos.

### Casos de uso 

![Diagrama de uso](img\diagrama.png)
- Postear skins que tienes y no quieres para cambiarlas por otras, indicando el nombre, el float y poniendo una imagen.

## Tecnologías

![Tecnologias usadas](img\descarga.png)

Tecnologias usadas en este proyecto:
- Java Script
- Css
- Bootstrap
- React
- HTML


## To-Dos

- Añadir un chat.
- Añadir una pagina para seleccionar las skins mediante iconos.
- Añadir deplegable debajo de los iconos de las skins para indicar el float/desgaste de la misma
- Añadir mas mensajes al usuario(Cuando las cosas funcionan o no).
- Añadir paginación o un filtro para cuando haya más posts.
