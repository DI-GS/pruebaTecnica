## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- **Node.js** (versión 16 o superior) - [Descargar Node.js](https://nodejs.org/)
- **npm** (se incluye con Node.js)

## Instalación

1. Clona el repositorio.
2. Instala las dependencias en ambos proyectos (frontend/backend):
   ```bash
   npm install
   
## Ejecución del Proyecto en Modo Desarrollo 
Para iniciar el servidor en modo desarrollo, utiliza el siguiente comando:
 ```bash
npm run dev
 ```

## Compilación para Producción
Para compilar y optimizar el proyecto para producción, utiliza:
```bash
npm run build
 ```
## Descripción Breve de la Arquitectura
1. Arquitectura Cliente-Servidor
Frontend (Cliente): Implementado con Vue 3 para manejar la interfaz de usuario. El cliente envía solicitudes al backend para obtener datos y renderizar la información de manera interactiva.
Backend (Servidor): Desarrollado con Node.js y Express, encargado de procesar las solicitudes del cliente, realizar la lógica de negocio, manejar la base de datos y devolver respuestas en formato JSON.

2. Comunicación mediante APIs RESTful
La interacción entre el cliente y el servidor se realiza a través de APIs RESTful, donde el cliente consume los datos expuestos por el backend.

3. Base de Datos
Aunque no se proporcionaron detalles específicos sobre la base de datos, es común que el backend maneje la persistencia de datos en una base de datos relacional (como MySQL o PostgreSQL) o NoSQL (como MongoDB).

4. Separación de Responsabilidades
El proyecto sigue la filosofía de separar el frontend y el backend, lo que facilita la escalabilidad, el mantenimiento y la reutilización de código.
