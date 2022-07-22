## Bienvenidos al repositorio de mi proyecto final de backend

-----------

### Este proyecto consiste en un ecommerce haciendo uso de del framework de nodejs "Express"

-----------

### Como funciona:

El servidor provee funciones para listar agregar modificar y eliminar productos a partir de la ruta /api/productos:

get "/"  -> listar todos los productos
get "/:id"  -> obtener un producto por id o por categoria
post "/" -> agregar un nuevo producto
put "/:id" -> modificar un producto por id
delete "/:id" -> eliminar un producto por id

El servidor contiene un sistema de autenticacion basado en passport y JWT.

La base de datos usada es mongoDB en un entorno de desarrollo configurable desde la variable de entorno NODE_ENV.

El usuario puede registrarse y guardar sus credenciales en la base de datos automaticamente al hacerlo.

El servidor cuenta con un canal de chat basado en websockets para atender las consultas al cual se puede 
acceder desde el menu del perfil del usuario.

Al autenticarse exitosamente el usuario dispondra de una sesion con tiempo configurable 
a traves de la variable de entorno SESSION_EXP.

El proyecto esta basado en una arquitectura SOA.

Se pueden visualizar las variables de configuracion actuales en la ruta "/config"

Al registrarse un nuevo usuario el servidor envia un mail al email definido por la variable
de entorno "ADMIN_EMAIL"

Los errores quedan registrados en el archivo "error.log" gracias a  "winston logger"
