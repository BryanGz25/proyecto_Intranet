# Guia de contribucion

## Flujo de trabajo

1. Crear una rama descriptiva desde `main`.
2. Hacer cambios pequenos y verificables.
3. Probar la aplicacion con `npm run dev`.
4. Registrar cambios relevantes en `CHANGELOG.md`.
5. Solicitar revision antes de integrar.

## Ramas

| Tipo | Ejemplo | Uso |
| --- | --- | --- |
| `feature/*` | `feature/comunicados` | Nuevas funciones |
| `fix/*` | `fix/login-roles` | Correcciones |
| `docs/*` | `docs/arquitectura` | Documentacion |

## Commits

Usar mensajes claros en presente:

```text
Agrega registro de asistencia
Corrige rutas de modulos JavaScript
Documenta arquitectura del prototipo
```

## Revision

- Verificar que no se agreguen dependencias innecesarias.
- Confirmar que los datos se persistan en LocalStorage.
- Revisar contraste, etiquetas y navegacion por teclado.
- Mantener documentacion Markdown actualizada.

> El proyecto prioriza claridad, alcance controlado y documentacion tecnica.
