# ccss-salud-app Backend

## Descripción
Este proyecto es el backend de la aplicación móvil "ccss-salud-app", desarrollado en Node.js y utilizando SQL Server como base de datos. La aplicación está diseñada para gestionar recursos de salud y proporcionar una API robusta para la interacción con la aplicación móvil.

## Estructura del Proyecto
El proyecto está organizado en varias carpetas y archivos, cada uno con una responsabilidad específica:

- **src/app.js**: Punto de entrada de la aplicación. Configura el servidor Express y define las rutas.
- **src/config/db.js**: Configuración de la conexión a la base de datos SQL Server.
- **src/controllers/index.js**: Controladores que manejan la lógica de negocio y las solicitudes de la API.
- **src/models/index.js**: Modelos de datos que representan las entidades de la base de datos.
- **src/routes/index.js**: Configuración de las rutas de la aplicación.
- **src/services/index.js**: Lógica de negocio y funciones que interactúan con los modelos.
- **src/types/index.d.ts**: Definiciones de tipos y interfaces para TypeScript.

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd ccss-salud-app-backend
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura las variables de entorno en el archivo `.env` según sea necesario.

## Uso
Para iniciar el servidor, ejecuta el siguiente comando:
```
npm start
```
El servidor se ejecutará en el puerto especificado en las variables de entorno.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.