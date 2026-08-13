# AGENTS.md - Memoria del agente

## 1. Contexto

La Intranet Escolar es un prototipo web para una institucion educativa publica. Su objetivo es centralizar informacion interna para administracion, docentes, estudiantes y familias.

El proyecto es academico y funciona como aplicacion frontend sin backend.

## 2. Requerimientos

- Autenticacion por roles.
- Gestion de usuarios.
- Registro y consulta de calificaciones.
- Registro y consulta de asistencia.
- Creacion y consulta de comunicados.
- Consulta diferenciada segun rol.
- Persistencia con LocalStorage.
- Documentacion tecnica en Markdown.

## 3. Reglas

- Usar HTML5, CSS3 y JavaScript puro.
- Mantener JavaScript separado en ES Modules.
- Usar `const` y `let`.
- Evitar dependencias innecesarias.
- Escribir nombres descriptivos en espanol.
- Mantener accesibilidad basica: etiquetas, contraste y navegacion por teclado.

## 4. Restricciones

- No usar React, Vue, Angular ni TypeScript.
- No usar Express, Firebase, PostgreSQL, MongoDB ni otra base de datos.
- No crear backend.
- No consumir APIs externas.
- No guardar datos sensibles reales.

## 5. Objetivos

- Entregar un prototipo funcional de intranet escolar.
- Demostrar separacion de responsabilidades.
- Demostrar uso de LocalStorage.
- Mantener documentacion Markdown clara y completa.

## 6. Memoria del proyecto

### Agosto de 2026

Se eligio una arquitectura frontend para cumplir las restricciones academicas. Los datos de demostracion se inicializan en LocalStorage y pueden modificarse desde la interfaz.

Se separaron responsabilidades en:

```text
auth.js
storage.js
ui.js
app.js
```

## 7. Buenas practicas

- Documentar el por que de las decisiones.
- Mantener cambios pequenos y verificables.
- No duplicar logica de lectura o escritura de LocalStorage.
- Validar datos antes de guardarlos.
- Mostrar solo la informacion necesaria para cada rol.
