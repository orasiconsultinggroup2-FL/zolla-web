# ORASI LAB - Documento de Arquitectura y Diseño

## 1. Resumen Ejecutivo
ORASI LAB es una plataforma digital SaaS diseñada para orquestar la gestión de conflictos, negociaciones complejas y construcción de consensos en entornos multi-actor. Integra metodologías de clase mundial (MGA, WCNO) con herramientas operativas (CRM Social, PNR, AAR) para transformar la gestión de crisis en construcción de valor sostenible. Permite a las organizaciones pasar de una postura reactiva a una preventiva y estratégica, asegurando la trazabilidad de los acuerdos y el fortalecimiento del capital relacional.

## 2. Roles y Permisos

| Rol | Alcance | Permisos Clave |
| :--- | :--- | :--- |
| **Alta Dirección** | Visión Global | Ver Dashboard Ejecutivo, Aprobar Acuerdos Críticos, Ver Mapa de Riesgos. (Solo Lectura + Aprobación) |
| **Equipo Social / Sostenibilidad** | Gestión Operativa | Crear/Editar Casos, Gestionar Actores, Registrar Minutas, Actualizar Alertas. (Full Acceso Operativo) |
| **Líderes de Área** | Casos Específicos | Participar en PNR, Ver Tareas Asignadas, Validar Viabilidad Técnica. (Edición Limitada) |
| **NCC (Centro de Excelencia)** | Metodología y Métricas | Auditar Calidad PNR/AAR, Gestionar Biblioteca de Conocimiento, Configurar Estándares. |
| **Facilitadores** | Procesos de Diálogo | Registrar Avances de Mesa, Moderar Sesiones, Cargar Actas. |

## 3. Módulos Principales

1.  **Dashboard Ejecutivo (Tower Control):** Visualización de riesgos, índice WCNO, y estado del portafolio.
2.  **Gestión de Casos:** CRUD de conflictos con clasificación por fase, riesgo y territorio.
3.  **CRM Social:** Directorio de stakeholders con análisis de influencia, postura y red de confianza.
4.  **Toolkit de Negociación (PNR/MGA):** Herramienta interactiva para preparar negociaciones basada en intereses, opciones y legitimidad.
5.  **Aprendizaje (AAR/RDE):** Módulo de retrospectiva para capturar lecciones aprendidas y alimentar la base de conocimiento.

## 4. Entidades de Datos Clave

*   **Caso:** ID, Título, Fase (Prevención/Crisis/Mesa), Riesgo (Alto/Medio/Bajo), Territorio, Valor en Juego.
*   **Actor:** Nombre, Organización, Rol, Postura (Aliado/Neutro/Opositor), Poder, Intereses Clave.
*   **Interacción:** Fecha, Tipo (Reunión/Asamblea), Participantes, Acuerdos, Temperatura Social.
*   **PNR (Plan de Negociación):** Matriz de 7 Elementos (Intereses, Opciones, Legitimidad, MAAN, Comunicación, Relación, Compromiso).

## 5. Flujo Prioritario: Preparación (PNR)
1.  Usuario selecciona un **Caso Activo**.
2.  Ingresa al módulo **Herramientas > Nuevo PNR**.
3.  Define el **Objetivo** de la reunión específica.
4.  Mapea **Intereses** propios y de la contraparte (no posiciones).
5.  Lluvia de ideas de **Opciones** de mutuo beneficio.
6.  Define criterios de **Legitimidad** (leyes, precedentes).
7.  Analiza su **MAAN** (Mejor Alternativa al Acuerdo Negociado) y el de la contraparte.
8.  Sistema genera un **Resumen de Estrategia** PDF/Vista para llevar a la mesa.

## 6. Métricas Recomendadas
*   **NMI (Negotiation Maturity Index):** % de casos que usan metodología PNR.
*   **Índice de Cumplimiento de Acuerdos:** % de compromisos cerrados a tiempo.
*   **Costo Evitado:** Estimación financiera de conflictos prevenidos o desescalados.
*   **Termómetro Social:** Sentimiento promedio de actores clave en el tiempo.
