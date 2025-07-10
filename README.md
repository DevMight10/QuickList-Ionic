# QuickList - Aplicación de Gestión de Productos

## Descripción del Proyecto

QuickList es una aplicación móvil desarrollada con Ionic y Angular, diseñada para simular un sistema de gestión de productos (CRUD). Permite a los usuarios autenticarse (mediante un login simulado) y realizar operaciones completas de Crear, Leer, Actualizar y Eliminar (CRUD) sobre una lista de productos.

La aplicación está diseñada siguiendo una arquitectura modular basada en características, lo que facilita su mantenimiento y escalabilidad.

## Características Principales

*   **Login Simulado:** Autenticación de usuario con credenciales fijas para acceder a la aplicación.
*   **Lista de Productos:** Visualización de todos los productos disponibles.
*   **Detalle de Producto:** Vista detallada de la información de un producto específico.
*   **Creación de Productos:** Formulario para añadir nuevos productos a la lista.
*   **Edición de Productos:** Funcionalidad para modificar la información de productos existentes.
*   **Eliminación de Productos:** Opción para remover productos de la lista.
*   **Gestión de Imágenes:** Cada producto puede tener una imagen asociada.

## Arquitectura y Patrones

El proyecto sigue una **Arquitectura Modular Basada en Características (Feature-based Modular Architecture)**, donde cada funcionalidad principal (autenticación, productos, etc.) se organiza en módulos independientes.

Se aplica el **Patrón de Capa de Servicios (Service Layer Pattern)**, centralizando la lógica de negocio y el acceso a datos en servicios dedicados, lo que promueve la reutilización de código y una clara separación de responsabilidades.

## Tecnologías Utilizadas

*   **Framework:** Ionic (v7+)
*   **Framework Frontend:** Angular (v16+)
*   **Lenguaje:** TypeScript
*   **Gestión de Estado:** RxJS (Observables, BehaviorSubject)
*   **Almacenamiento Local:** Ionic Storage
*   **Plataforma Nativa:** Capacitor

## Credenciales de Acceso (Usuario Administrador)

Para acceder a la aplicación, utiliza las siguientes credenciales de administrador:

*   **Usuario:** `admin`
*   **Contraseña:** `123456`

## Cómo Ejecutar el Proyecto

1.  **Clonar el Repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd ProyectoIonic
    ```
2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```
3.  **Inicializar Ionic Storage (si es necesario):**
    Asegúrate de que el servicio de almacenamiento se inicialice correctamente. Esto suele manejarse automáticamente, pero si encuentras problemas, verifica la configuración de `ProductService` y `app.component.ts`.
4.  **Ejecutar en el Navegador:**
    ```bash
    ionic serve
    ```
5.  **Ejecutar en un Dispositivo/Emulador (Android/iOS):**
    ```bash
    ionic cap add android # o ios
    ionic cap sync
    ionic cap open android # o ios
    ```

---
