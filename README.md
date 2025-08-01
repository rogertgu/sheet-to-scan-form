# Sheet to Scan Form

Este proyecto es una aplicación de React diseñada para crear y gestionar hojas de respuestas de exámenes tipo test. Permite a los usuarios introducir respuestas, corregirlas y exportar los resultados a un archivo de Excel o como una captura de pantalla del formulario.

## Descripción del Proyecto

La aplicación proporciona una interfaz para rellenar una hoja de respuestas con hasta 100 preguntas de opción múltiple (A, B, C, D) y 3 preguntas adicionales. Los usuarios pueden cambiar sus respuestas y marcarlas para su corrección. La aplicación calcula la puntuación final y permite la exportación de los datos.

## Tecnologías Utilizadas

*   **Vite:** Herramienta de construcción y servidor de desarrollo rápido.
*   **React:** Biblioteca para construir interfaces de usuario.
*   **TypeScript:** Superset de JavaScript que añade tipado estático.
*   **shadcn-ui:** Colección de componentes de interfaz de usuario reutilizables.
*   **Tailwind CSS:** Framework de CSS para un diseño rápido y personalizado.
*   **React Router:** Para el enrutamiento del lado del cliente.
*   **html2canvas:** Para realizar capturas de pantalla del formulario.
*   **xlsx:** Para la generación de archivos de Excel.

## Estructura de Archivos

El código fuente está organizado de la siguiente manera:

```
/src
|-- /components/ui       # Componentes de UI de shadcn
|-- /hooks               # Hooks personalizados de React
|-- /lib                 # Funciones de utilidad (ej. cn)
|-- /pages
|   |-- Index.tsx        # Componente de la página principal
|   `-- NotFound.tsx     # Componente para la página 404
|-- App.tsx              # Componente raíz de la aplicación y configuración de rutas
|-- main.tsx             # Punto de entrada de la aplicación
|-- index.css            # Estilos globales y variables de CSS
`-- ...
```

## Funcionalidades Clave

*   **Introducción de Respuestas:** Formulario para 100 preguntas de opción múltiple y 3 adicionales.
*   **Corrección de Respuestas:** Posibilidad de marcar respuestas como "correctas" o "incorrectas".
*   **Generación de Excel:** Exporta las respuestas y la puntuación a un archivo `.xlsx`.
*   **Captura de Pantalla:** Genera y descarga una imagen del formulario completo.
*   **Diseño Adaptable:** La interfaz se ajusta a diferentes tamaños de pantalla.

## Scripts Disponibles

En el `package.json`, encontrarás los siguientes scripts:

*   `npm run dev`: Inicia el servidor de desarrollo en modo local.
*   `npm run build`: Compila la aplicación para producción en el directorio `dist/`.
*   `npm run preview`: Sirve el build de producción localmente para previsualización.
*   `npm run deploy`: Ejecuta el script de predeploy y despliega la aplicación en GitHub Pages.
*   `npm run predeploy`: Construye la aplicación y copia `index.html` a `404.html` para el correcto funcionamiento en GitHub Pages.

## Configuración de Despliegue

La aplicación está configurada para ser desplegada en GitHub Pages desde la rama `main` y la carpeta `/dist`.

*   **`vite.config.ts`**: El `base` se establece dinámicamente en `/sheet-to-scan-form/` para producción y `/` para desarrollo.
*   **`src/App.tsx`**: El `BrowserRouter` utiliza un `basename` dinámico que coincide con la configuración de Vite para asegurar que el enrutamiento funcione tanto en local como en producción.
*   **Manejo de 404 en GitHub Pages**: El script `predeploy` copia `dist/index.html` a `dist/404.html`. Esto redirige todas las solicitudes de rutas no encontradas a la aplicación de React, permitiendo que React Router maneje el enrutamiento en el lado del cliente.
