# Arquitectura

## Decisiones tecnicas

La intranet escolar es una aplicacion frontend sin backend. Se usa HTML5, CSS3, JavaScript puro con ES Modules y LocalStorage para persistir datos de demostracion.

## Stack

| Capa | Tecnologia | Motivo |
| --- | --- | --- |
| Interfaz | HTML5 semantico | Accesibilidad y estructura clara |
| Estilos | CSS3 | Diseno responsive sin frameworks |
| Logica | JavaScript ES Modules | Separacion de responsabilidades |
| Persistencia | LocalStorage | Cumple el alcance academico |
| Entorno | Node.js | Servidor estatico local |

## Estructura

```text
.
├── index.html
├── server.js
├── src/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── storage.js
│       └── ui.js
└── docs/
    ├── arquitectura.md
    └── requerimientos.md
```

## Modulos

- `app.js`: inicializa la aplicacion, navegacion, sesion y eventos principales.
- `auth.js`: autentica usuarios y resuelve roles.
- `storage.js`: lee, guarda e inicializa datos en LocalStorage.
- `ui.js`: renderiza vistas, tablas, modales y mensajes.

## Roles

| Rol | Permisos principales |
| --- | --- |
| Administracion | Gestiona usuarios, calificaciones, asistencia y comunicados |
| Docente | Registra calificaciones, asistencia y comunicados |
| Estudiante | Consulta su informacion academica |
| Familia | Consulta informacion academica asociada |

---

> Se documenta el por que de las decisiones para que cualquier persona o agente de IA pueda continuar el trabajo.
