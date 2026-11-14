# Vigía

App móvil de reporte anónimo de extorsión para comerciantes y bodegueros de Lima.

**Curso:** 1ASI0385 IHC y Tecnologías Móviles (NRC 6299), UPC, ciclo 2026-2
**Docente:** Salazar Ruiz, Kevin Edgar
**Entrega:** Challenge Landing Page (work-in-progress)

## Descripción del proyecto

Vigía es una app de celular donde el comerciante, apenas recibe una amenaza de extorsión, registra en menos de 30 segundos qué pasó (llamada, nota o visita) sin dar su nombre ni ningún dato que lo identifique.

Cada reporte se suma a un mapa que muestra, por zona, cuántos incidentes recientes hay. Nunca se muestran casos individuales, solo el patrón. Si un negocio está cerca de una zona con varios reportes, la app le avisa. Y si el patrón se vuelve fuerte, conecta a los comerciantes con su asociación para actuar juntos ante las autoridades.

### Misión

Dar a los comerciantes de Lima un canal anónimo, rápido y confiable para reportar extorsión, y convertir esos reportes en datos accionables por zona que reduzcan el silencio frente al problema.

### Visión

Ser la referencia en Lima para el reporte comunitario y anónimo de extorsión a pequeños negocios, contribuyendo a que más zonas de riesgo sean visibles y atendidas antes de que el patrón se agrave.

## Problemática

La extorsión (principalmente el "cobro de cupo") afecta a bodegas, mercados y pequeños negocios de Lima. Según la Asociación de Bodegueros del Perú, el 99% de los bodegueros ha sido víctima de extorsión y algunos gastan hasta el 10% de sus ingresos en seguridad (La República, 2026).

Los canales formales exigen identificarse y no dan seguimiento visible, lo que genera temor a represalias. Así, la mayoría de los incidentes queda sin registrar.

## Segmentos objetivo

| Segmento | Rol en la app | Necesidad principal |
|---|---|---|
| **Comerciantes víctimas** (bodegueros, dueños de talleres, comerciantes de mercados) | Reportadores | Canal ultrarrápido y anónimo para reportar sin temor a represalias |
| **Representantes de asociaciones y gremios** (dirigentes de mercados, juntas vecinales) | Gestores de seguridad | Tableros de datos y mapas de calor por zona para formalizar reclamos y coordinar con las autoridades |
| **Nuevos emprendedores y comerciantes en prevención** | Lectores | Consultar mapas de incidentes y alertas para evaluar el riesgo de una zona antes de invertir |

## Características principales

- **Reporte anónimo** en menos de 30 segundos, sin registro de datos personales
- **Mapa de calor** por zona con reportes agregados, de consulta preventiva
- **Alertas comunitarias** por proximidad a negocios cercanos
- **Comunidad**: feed de reportes de la zona
- **Dashboard** de datos agregados para asociaciones y gremios
- Interfaz simple, pensada para smartphones de gama media y usuarios con poca familiaridad con apps complejas

## Competidores

No existe aún una app con el mismo rol (canal 100% anónimo para pequeños comerciantes). Se identifican competidores indirectos:

- **Mininter, plataforma de denuncia cifrada:** sistema estatal lanzado en 2026, inicialmente para transportistas
- **Mi Policía Digital (PNP):** app oficial para reportar delitos con evidencia y ubicación
- **Citizen:** app internacional de alertas de seguridad en tiempo real por zona

## Modelo de negocio

Freemium B2B2G: la app es gratuita para el comerciante, y el dashboard se ofrece a asociaciones, municipalidades y aseguradoras.

## Equipo

| Integrante | Código |
|---|---|
| Avalos Arias, Diego Alessandro | U20221D254 |
| Chavez Rodriguez, Jose David Stewart | U20231B970 |
| Flores Medina, Aaron Andres | U20241A206 |
| Flores Siguas, Marlon Alessandro | U202415412 |
| Herbay Perez, André Josue | U202418441 |
| Jara Espinoza, Miguel Angel | U202512856 |

## Tecnologías

HTML, CSS y JavaScript, sin frameworks CSS. Google Fonts (Poppins) y Font Awesome.

## Estructura del proyecto

```
public/
├── index.html
├── favicon.ico
└── assets/
    ├── styles/styles.css
    ├── scripts/main.js
    └── images/
```

## Flujo de trabajo (GitFlow)

- `main`: versión estable
- `develop`: integración del trabajo del equipo
- `feature/*`: una rama por tarea, creada desde `develop`

## Cómo ver la landing

Abre `public/index.html` en el navegador, o usa el servidor integrado de WebStorm.
