# CSGO-TRADEBASE v.0.0
![logo App]()

Esta app va a ir dirigida a toda esa gente que quiere intercambiar sus skins de CS:GO (Counter Strike Global Ofensive) mediante un sistema de posteo de anuncios y llegando a un acuerdo con la otra persona por un chat dentro de la misma app.

## Functional description
Características de la app:
- Registro de usuarios.
- Posteo de anuncios(Skins que tienes o quieres).
- Conversaciones por un chat.
- Añadir a la base de datos usuario, skins, posts...

## Technical Description

- verifyToken(): Verifica el token del usuario para dar acceso a las partes no visibles a los usuarios no registrados.

- chatRouter.post(): Crea un mensaje en la base de datos que se reflejara en un   chat.  

- skinRouter.patch(): Modifica los datos de la skin de un usuario.

- postRouter.delete(): Elimina u usuario de la base de datos.

### Casos de uso 

![Diagrama de uso](img\diagrama.png)
- Postear skins que tienes y no quieres para cambiarlas por otras, indicando el nombre, el float y poniendo una imagen.

## Tecnologías

![Tecnologias usadas]()

Tecnologias usadas en este proyecto:
- Java Script

## To-Dos

- Añadir un chat.
- Que requiera el token del usuario creador para poder modificar/eliminar.
- Front.
- Añadir mas funciones.
