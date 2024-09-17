# Proyecto de Gestión de Personas - Front-End

Este repositorio contiene el front-end para la aplicación de gestión de personas. Está construido utilizando Angular y Tailwind CSS, y proporciona una interfaz para interactuar con la API del back-end, permitiendo la visualización, creación, edición y eliminación de registros de personas mediante modales.

## Índice

-   [Características](#características)
-   [Tecnologías](#tecnologías)
-   [Instalación](#instalación)
-   [Uso](#uso)

## Características

-   **Visualización de Personas**: Página principal que lista todos los registros de personas.
-   **Creación de Personas**: Modal para agregar nuevos registros de personas.
-   **Edición de Personas**: Modal para actualizar los datos de los registros existentes.
-   **Eliminación de Personas**: Modal para eliminar registros de personas.
-   **Paginación y Filtrado**: Opciones para paginar y filtrar la lista de personas.

## Tecnologías

-   **Angular**: Framework para construir la interfaz de usuario.
-   **Tailwind CSS**: Biblioteca de utilidades para estilos y diseño.
-   **TypeScript**: Lenguaje de programación utilizado en el desarrollo.
-   **RxJS**: Biblioteca para la gestión de eventos y programación reactiva.
-   **HttpClient**: Módulo de Angular para realizar solicitudes HTTP a la API.

## Instalación

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/CristinaOsorio/people-app
    ```

2. **Navegar al directorio del proyecto:**

    ```bash
    cd people-app
    ```

3. **Instalar `nvm` (Node Version Manager) [Opcional]:**

    Si prefieres usar `nvm` para gestionar versiones de Node.js, sigue las instrucciones en la [documentación oficial de nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para instalarlo.

    Luego, instala la versión recomendada de Node.js especificada en el archivo `.nvmrc`:

    ```bash
    nvm install
    ```

    Asegúrate de usar la versión correcta con:

    ```bash
    nvm use
    ```

    **Nota:** Si no utilizas `nvm`, asegúrate de tener la versión recomendada de Node.js instalada. La versión requerida está especificada en el archivo `.nvmrc`.

4. **Instalar las dependencias:**

    ```bash
    npm install
    ```

5. **Configurar la URL de la API:**

    Edita el archivo `src/environments/environment.ts` y configura la URL de la API:

    ```typescript
    export const environment = {
        production: false,
        apiUrl: 'http://localhost:3000',
    };
    ```

6. **Iniciar el servidor de desarrollo:**

    ```bash
    ng serve
    ```

    La aplicación estará disponible en `http://localhost:4200`.

## Uso

Una vez que el servidor esté en funcionamiento, puedes interactuar con la aplicación en la página principal en `http://localhost:4200/person`. Desde allí, puedes:

-   **Ver la lista de personas**: La página principal muestra una lista de todas las personas almacenadas en la base de datos.
-   **Crear una nueva persona**: Usa el modal de creación para agregar una nueva persona a la base de datos.
-   **Editar una persona existente**: Usa el modal de edición para actualizar los detalles de una persona seleccionada.
-   **Eliminar una persona**: Usa el modal de eliminación para eliminar una persona seleccionada.
