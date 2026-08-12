# AGENTS.md — Memoria del proyecto

## 1. Contexto

La Intranet Escolar es un prototipo web para una institución educativa pública.

Su objetivo es proporcionar una interfaz interna donde administración, docentes, estudiantes y familias puedan consultar y gestionar información institucional.

El proyecto tiene un alcance académico y no pretende ser un sistema de producción.

### Tecnologías permitidas

- HTML5
- CSS3
- JavaScript puro
- Node.js
- npm
- ES Modules
- LocalStorage

---

## 2. Requerimientos

El sistema debe permitir:

- [ ] Iniciar sesión.
- [ ] Diferenciar usuarios mediante roles.
- [ ] Gestionar usuarios.
- [ ] Consultar calificaciones.
- [ ] Consultar asistencia.
- [ ] Crear comunicados.
- [ ] Consultar comunicados.
- [ ] Mostrar información diferente según el rol.
- [ ] Persistir información utilizando LocalStorage.
- [ ] Mantener una interfaz accesible.
- [ ] Mantener documentación en Markdown.

---

## 3. Reglas

### JavaScript

- Utilizar ES Modules.
- Utilizar `const` y `let`.
- Evitar código global innecesario.
- Separar las responsabilidades por módulos.
- Utilizar nombres descriptivos.
- Evitar duplicar lógica.

### HTML

- Utilizar HTML5 semántico.
- Mantener una estructura accesible.
- Asociar etiquetas con controles.
- Utilizar atributos ARIA cuando sean necesarios.

### CSS

- Utilizar CSS3.
- Mantener diseño responsive.
- Evitar estilos inline.
- Utilizar variables CSS.

### Documentación

La documentación del proyecto debe escribirse en Markdown.

---

## 4. Restricciones

El proyecto NO debe utilizar:

- React.
- Vue.
- Angular.
- TypeScript.
- Express.
- Firebase.
- PostgreSQL.
- MongoDB.
- Cualquier otra base de datos.
- Backend.
- APIs externas.

Node.js y npm solamente se utilizan para administrar el proyecto y ejecutar el entorno de desarrollo.

No introducir dependencias innecesarias.

---

## 5. Objetivos

### Objetivo principal

Crear un prototipo funcional de intranet escolar.

### Objetivos secundarios

- Mantener una arquitectura sencilla.
- Demostrar dominio de JavaScript.
- Demostrar uso de LocalStorage.
- Aplicar separación de responsabilidades.
- Crear una interfaz clara.
- Mantener documentación técnica completa.
- Aplicar buenas prácticas de accesibilidad.

---

## 6. Memoria del proyecto

### Agosto de 2026

Se decidió desarrollar el proyecto como una aplicación frontend sin backend.

La persistencia se realizará exclusivamente mediante LocalStorage.

La decisión se tomó para cumplir las restricciones académicas del proyecto y mantener el alcance controlado.

### Arquitectura

Se decidió separar:

```text
auth.js