# SurveillanceApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Structure for angular-architecture
src/app/
├── core/               # El cerebro de la app (Solo se importa en AppModule)
│   ├── guards/         # Protecciones de rutas (ej. si no está logueado, no entra)
│   ├── interceptors/   # Modificadores de peticiones HTTP (para enviar el token de sesión)
│   ├── models/         # Interfaces TypeScript (ej. Camera, User)
│   └── services/       # Servicios globales que mantienen estado (AuthService, ApiService)
│
├── layout/             # El esqueleto visual
│   ├── header/         # Barra superior (perfil, notificaciones)
│   ├── sidebar/        # Menú lateral para navegar entre Dashboard y Cámaras
│   └── main-layout/    # El contenedor principal que une todo
│
├── shared/             # Las piezas de lego (Se importa en múltiples features)
│   ├── components/     # Botones, modales, reproductores de video genéricos
│   └── directives/     # Directivas personalizadas
│
└── features/           # Las páginas principales de tu negocio (Lazy Loaded)
    ├── auth/           # Login, registro, recuperación de contraseña
    ├── dashboard/      # Resumen general (creado)
    └── cameras/        # Grilla de videos, configuraciones (creado)