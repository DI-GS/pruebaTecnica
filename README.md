Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

Node.js (versión 16 o superior) - Descargar Node.js
npm (se incluye con Node.js)


Instalación
Clona el repositorio.

Instala las dependencias en ambos proyecto(frontend/backend):
npm install

Ejecución del Proyecto en Modo Desarrollo
utiliza el siguiente comando:
npm run dev
El servidor estará disponible en http://localhost:5173/ (o el puerto asignado por Vite).

Compilación para Producción
Para compilar y optimizar el proyecto para producción:
npm run build
El código optimizado se generará en el directorio dist/.

Vista Previa del Build de Producción
Si deseas ver cómo se comporta la versión de producción localmente:
npm run preview

Ejecución de Pruebas Unitarias
Este proyecto utiliza Vitest para pruebas unitarias:
npm run test:unit

Linter y Formateo de Código
Corrección automática con ESLint:
npm run lint

Formateo del código con Prettier:
npm run format

Estructura del Proyecto
root/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── router/
│   │   ├── stores/
│   │   └── views/
│   └── main.js
│
└── package.json


Descripción Breve de la Arquitectura:

1.- Arquitectura Cliente-Servidor:

    *Frontend (Cliente): Implementado con Vue 3 para manejar la interfaz de usuario. El cliente envía solicitudes al backend para obtener datos y renderizar la información de manera interactiva.
    *Backend (Servidor): Desarrollado con Node.js y Express, encargado de procesar las solicitudes del cliente, realizar la lógica de negocio, manejar la base de datos y devolver respuestas en formato JSON.

2.-Comunicación mediante APIs RESTful:
    *La interacción entre el cliente y el servidor se realiza a través de APIs RESTful, donde el cliente consume los datos expuestos por el backend.

3.- Base de Datos:
    *Aunque no proporcionaste detalles específicos sobre la base de datos, es común que el backend maneje la persistencia de datos en una base de datos relacional (como MySQL o PostgreSQL) o NoSQL (como MongoDB).

4.- Separación de Responsabilidades:
    *El proyecto sigue la filosofía de separar el frontend y el backend, lo que facilita la escalabilidad, el mantenimiento y la reutilización de código.

