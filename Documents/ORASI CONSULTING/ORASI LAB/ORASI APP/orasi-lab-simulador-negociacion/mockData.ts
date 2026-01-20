
import { Case, CasePhase, RiskLevel, ActorPosture, User, UserRole, UserBelt, Alert, AARData, PNRData, LibraryCase, AARType, AIAnalysis } from './types';

// --- USUARIOS ---
const BASE_USERS: User[] = [
  { id: 'generic-manager', name: 'Gerencia General', email: 'gerencia@orasi.com', role: UserRole.MANAGER, belt: UserBelt.LEVEL_3, company: 'Corporativo' },
  { id: 'U3', name: 'Luis Supervisor', email: 'luis@orasi.com', role: UserRole.SUPERVISOR, belt: UserBelt.LEVEL_2, company: 'Operaciones' },
];

const SOCIAL_MANAGERS: User[] = Array.from({ length: 50 }, (_, i) => {
  const num = i + 1;
  const zones = ['Norte', 'Sur', 'Costa', 'Sierra', 'Selva', 'Bajío', 'Altiplano'];
  return {
    id: `GST-${num.toString().padStart(3, '0')}`,
    name: `Gestor Territorial ${num}`,
    email: `gestor.${num}@orasi.com`,
    role: UserRole.RELATIONIST,
    belt: i < 10 ? UserBelt.LEVEL_2 : UserBelt.LEVEL_1,
    company: `Zona ${zones[i % zones.length]}`
  };
});

export const MOCK_USERS: User[] = [...BASE_USERS, ...SOCIAL_MANAGERS];

// --- DATOS RICOS PARA NIVELES DE SIMULACIÓN (ESTRUCTURA PEDAGÓGICA) ---

export const LEVEL_CASES_DATA = {
    LEVEL_2: {
        title: 'Nivel 2: Disputa Laboral Local (La Esperanza)',
        description: `CONTEXTO:
La comunidad de "La Esperanza", ubicada a 5km de la operación, ha convivido pacíficamente con la mina durante 5 años. Sin embargo, la reciente fase de expansión requiere soldadores y técnicos certificados. La tasa de desempleo local ha subido al 15% debido a una mala cosecha agrícola este año.

SITUACIÓN ACTUAL:
El Comité de Empleo Local ha bloqueado el ingreso de los buses de contratistas foráneos esta mañana. No hay violencia física aún, pero han quemado llantas. Exigen que el 100% de las vacantes de la expansión sean cubiertas por locales, independientemente de la certificación.

POSICIONES DE LAS PARTES:
1. Comité Local (Sra. Juana): "Ni un foráneo más hasta que todos los hijos del pueblo tengan trabajo. La mina se lleva la riqueza y nos deja el polvo".
2. Gerente de Proyecto (Ing. Davila): "Necesito gente certificada por norma ISO mañana mismo o paramos la obra. Los locales no pasan el examen técnico. No voy a bajar el estándar de seguridad".`,
        scenarios: 'Riesgo de escalada: Si el turno de noche no ingresa, se pierden 24h de avance crítico ($50k). El sindicato nacional amenaza con sumarse si hay represión policial.',
        keyRisks: ['Paralización de obra civil', 'Alianza Sindicato-Comunidad', 'Accidentes por personal no calificado'],
        actors: [
            {
                id: 'ACT-L2-01', name: 'Sra. Juana (Presidenta Comité)', role: 'Líder Comunitario', organization: 'Comunidad La Esperanza', 
                posture: ActorPosture.OPPONENT, influence: 8, interests: ['Ingreso económico para familias', 'Validación de su liderazgo', 'Evitar migración juvenil'], caseId: 'SIM-LVL-2'
            },
            {
                id: 'ACT-L2-02', name: 'Ing. Dávila (Jefe Proyecto)', role: 'Gerente Construcción', organization: 'Empresa', 
                posture: ActorPosture.CRITIC, influence: 9, interests: ['Cumplir cronograma', 'Seguridad en obra', 'Bonificación por metas'], caseId: 'SIM-LVL-2'
            }
        ]
    },
    LEVEL_3: {
        title: 'Nivel 3: Coalición Regional Hídrica',
        description: `CONTEXTO:
Tres cuencas hidrográficas convergen en la zona de influencia. Históricamente, la empresa ha operado en la cuenca baja, pero el nuevo Estudio de Impacto Ambiental (EIA) propone una represa en la cuenca alta. Una ONG nacional ("Agua Vida") ha llegado a la zona y está unificando a alcaldes distritales que antes eran rivales.

SITUACIÓN ACTUAL:
Se ha formado la "Mancomunidad de Defensa Hídrica". Han presentado una demanda cautelar para detener el EIA y han convocado a un paro regional preventivo en 48 horas. No buscan dinero inmediato, buscan una renegociación del "Acuerdo Marco" completo y participación en el monitoreo ambiental con veto.

POSICIONES DE LAS PARTES:
1. Mancomunidad (Alcalde Ruiz): "El agua no se negocia. Queremos anular el EIA actual y un nuevo estudio hecho por la ONU, no por la mina".
2. ONG Agua Vida: "Este proyecto destruirá el ecosistema de cabecera de cuenca. Moratoria minera ya".
3. Directorio Empresa: "El EIA está aprobado legalmente. No podemos retroceder en la inversión. El Estado debe imponer el orden".`,
        scenarios: 'Escenario Complejo: El conflicto ya no es local, es político-regional. Un error en la comunicación activará cobertura de prensa nacional.',
        keyRisks: ['Suspensión de Licencia Social', 'Politización electoral del conflicto', 'Judicialización del proyecto'],
        actors: [
            {
                id: 'ACT-L3-01', name: 'Alcalde Ruiz', role: 'Político Regional', organization: 'Mancomunidad', 
                posture: ActorPosture.RADICAL, influence: 10, interests: ['Capital político para reelección', 'Control de presupuesto hídrico', 'Ser visto como protector'], caseId: 'SIM-LVL-3'
            },
            {
                id: 'ACT-L3-02', name: 'Carlos (ONG Agua Vida)', role: 'Asesor Técnico', organization: 'ONG Nacional', 
                posture: ActorPosture.OPPONENT, influence: 7, interests: ['Visibilidad nacional', 'Financiamiento internacional', 'Proteger ecosistema'], caseId: 'SIM-LVL-3'
            }
        ]
    }
};

// --- SIMULADOR DE IA HARVARD/MIT ---
export const getMockAIAnalysis = (risk: RiskLevel, title: string): AIAnalysis => {
    // Lógica para generar respuestas específicas según el nivel del caso
    if (risk === RiskLevel.CRITICAL) { // Nivel 1
        return {
            caseId: '',
            score: 72,
            summary: "El usuario identificó correctamente la necesidad de frenar la escalada, pero se centró demasiado en la posición de 'desbloquear la vía' en lugar del interés subyacente: la crisis de confianza por el incumplimiento previo.",
            expertInterests: "1. Comunidad: Seguridad hídrica (supervivencia), Respeto (cumplimiento de palabra).\n2. Empresa: Continuidad operativa, Reputación corporativa.",
            expertOptions: "- Mesa de diálogo inmediata con facilitador externo.\n- 'Fondo de Agua' temporal mientras se construye el reservorio.\n- Visita conjunta de verificación técnica.",
            expertLegitimacy: "- Convenio Marco firmado hace 5 años (Pacta Sunt Servanda).\n- Estudios hidrológicos de la ANA (Autoridad Nacional del Agua).",
            uryAdvice: "Recuerda 'Subir al Balcón'. En una crisis caliente, tu primer movimiento no es reaccionar, es ganar perspectiva. Si presionas a Pedro cuando está arrinconado por sus bases, solo radicalizarás su postura. Dale un 'puente de oro' para que pueda retirarse sin perder cara ante su gente.",
            susskindCritique: "Observo una carencia en la fase de 'Joint Fact Finding'. Antes de negociar la solución del reservorio, deberían haber acordado qué datos técnicos usarían para medir la sequía. Sin un acuerdo sobre los hechos, la negociación se vuelve una batalla de voluntades."
        };
    } else if (risk === RiskLevel.HIGH) { // Nivel 2
        return {
            caseId: '',
            score: 78,
            summary: "Buen intento de manejar la tensión laboral. Sin embargo, aceptar el 100% de mano de obra local sin certificación crea un precedente peligroso. La solución óptima debe separar el interés (empleo) de la posición (contratación inmediata sin filtro).",
            expertInterests: "1. Sra. Juana: Validar su liderazgo, ingresos para familias desesperadas.\n2. Ing. Dávila: Seguridad industrial (no accidentes), cumplir plazos.",
            expertOptions: "- Programa de 'Empleo Rotativo' para labores no calificadas.\n- Academia de Soldadura in-situ pagada por la empresa (Valor Compartido).\n- Contratación de empresas locales de catering/servicios.",
            expertLegitimacy: "- Normativa ISO de seguridad.\n- Ley de Canon (prioridad local en mano de obra no calificada).",
            uryAdvice: "Aquí aplica 'Separa a las personas del problema'. La Sra. Juana no es el enemigo; la falta de capacidades técnicas lo es. Invítala a ser parte de la solución: 'Ayúdanos a seleccionar a los jóvenes con más potencial para becarlos'.",
            susskindCritique: "Faltó construir una coalición interna. El Ingeniero Dávila necesita entender que invertir en capacitación hoy es comprar paz social mañana. El costo de la huelga supera al costo de la capacitación."
        };
    } else { // Nivel 3
        return {
            caseId: '',
            score: 85,
            summary: "En este nivel estratégico, el usuario demostró buena visión política. El desafío es que el conflicto ya no es bilateral, es multiparte. Se requiere un enfoque de 'Consensus Building'.",
            expertInterests: "1. Alcalde: Capital político, control de recursos.\n2. ONG: Visibilidad, protección ambiental real.",
            expertOptions: "- Crear un Comité de Monitoreo Ambiental Participativo con veto técnico.\n- Fondo Fiduciario para el agua gestionado por la Mancomunidad.",
            expertLegitimacy: "- Estándares del Banco Mundial sobre reasentamiento.\n- Legislación de recursos hídricos.",
            uryAdvice: "El poder de negociación en situaciones multiparte radica en la BATNA de la coalición. Si logras separar al Alcalde de la ONG radical satisfaciendo sus intereses políticos, la coalición opositora se debilita.",
            susskindCritique: "La legitimidad del proceso es más importante que el resultado. Si impones el EIA legalmente aprobado sin validación social, tendrás un conflicto crónico. Diseña un proceso ad-hoc de revisión técnica conjunta."
        };
    }
};

// --- GENERADOR DE BIBLIOTECA (CASOS DE SIMULACIÓN - 15 POR SECTOR) ---

const TEMAS_MINERIA = [
    'Bloqueo de Acceso Principal por Comuneros',
    'Contaminación Hídrica Río Alto (Derrame)',
    'Renegociación de Tierras Comunales', 
    'Exigencia de Cuotas de Empleo Local (80%)',
    'Disputa por Distribución del Canon Minero',
    'Consulta Previa para Expansión Norte', 
    'Plan de Cierre de Mina: Pasivos Ambientales',
    'Derrame de Relaves en Pastizales de Alpaca',
    'Conflicto Proveedores Locales vs Externos', 
    'Huelga General de Sindicato Unificado',
    'Minería Ilegal dentro de la Concesión',
    'Afectación a Restos Arqueológicos no Mapeados',
    'Daños por Polvo y Vibraciones en Viviendas',
    'Disputa por Uso de Agua Subterránea',
    'Exigencia de Monitoreo Ambiental Participativo'
];

const TEMAS_CONSTRUCCION = [
    'Paralización de Obra por Sindicato Civil',
    'Enfrentamiento Sindicatos Rivales en Portón',
    'Grietas en Viviendas Colindantes por Excavación', 
    'Expropiación de Predios Urbanos Resistida',
    'Denuncias por Ruido Nocturno en Zona Residencial',
    'Impacto Vial y Colapso por Tráfico Pesado', 
    'Permisos Municipales Denegados por Presión Vecinal',
    'Hallazgo Arqueológico Importante en Excavación',
    'Accidente Laboral Fatal y Protesta Familiar', 
    'Sobrecostos por Retrasos de Licencia Social',
    'Boicot de Contratación de Mano de Obra Local',
    'Incumplimiento de Plazos de Entrega de Vías',
    'Accesos Peatonales Bloqueados a Negocios',
    'Polvo Afectando Cultivos Vecinos (Viveros)',
    'Extorsión por "Seguridad" en Obra (Crimen Org.)'
];

const TEMAS_AGRO = [
    'Escasez de Agua en Temporada Seca (Cuenca)',
    'Quema de Caña y Humo en Poblaciones',
    'Huelga de Salarios de Temporeros Migrantes', 
    'Denuncia de Uso de Agroquímicos Prohibidos',
    'Reclamo de Tierras Ancestrales en Fundo',
    'Exportación Bloqueada en Carretera Nacional', 
    'Precios Justos para Productores Asociados',
    'Plaga en Cultivos de Exportación (Control)',
    'Disputa Interna en Cooperativa Agraria', 
    'Pérdida de Certificación Bio por Vecino',
    'Desvío Ilegal de Cauce de Río',
    'Condiciones Precarias de Vivienda Trabajadores',
    'Impacto de Pesticidas en Apicultura Local',
    'Protesta contra Uso de Transgénicos',
    'Competencia Desleal por Importaciones Baratas'
];

const TEMAS_ENERGIA = [
    'Servidumbre de Paso para Alta Tensión',
    'Impacto Visual y Sonoro Parque Eólico',
    'Reclamo por Tarifas Eléctricas en Zona Generadora', 
    'Inundación de Valle Fértil por Represa',
    'Gasoducto Urbano: Temor Vecinal a Explosión',
    'Fuga de Gas y Evacuación de Emergencia', 
    'Licencia Social para Planta Solar en Desierto',
    'Compensación Económica por Torres en Cultivos',
    'Reasentamiento Involuntario de Poblado', 
    'Afectación de Patrimonio Cultural en Trazado',
    'Ruido de Turbinas Eólicas Afectando Sueño',
    'Afectación a Rutas Migratorias de Aves',
    'Exigencia de Beneficios Directos (Luz Gratis)',
    'Cortes por Mantenimiento de Líneas sin Aviso',
    'Disputa por Canon Hidroenergético Distrital'
];

const generateLibraryCases = (): LibraryCase[] => {
    let cases: LibraryCase[] = [];
    let idCounter = 1;

    // Helper para generar descripciones ricas en la biblioteca
    const getRichDescription = (sector: string, title: string) => {
        return `CONTEXTO:
En el sector ${sector}, el caso "${title}" presenta un desafío clásico pero volátil. La comunidad local siente que los beneficios del proyecto no permean, mientras que las externalidades negativas son constantes.

SITUACIÓN:
Actores clave han movilizado a la base social. Existen rumores de corrupción o incumplimiento en acuerdos anteriores. La contraparte exige una mesa de diálogo inmediata bajo amenaza de paralización o bloqueo.

POSICIONES:
- Líderes Locales: "Revisión total de acuerdos y compensaciones inmediatas".
- Empresa: "Cumplimiento estricto de lo firmado y continuidad operativa".
- Gobierno: "Mantener el orden público y facilitar el diálogo".`;
    };

    const createCase = (sector: string, titleBase: string, i: number, themeList: string[]) => ({
        id: `SIM-${sector.substring(0,3).toUpperCase()}-${(i + 1).toString().padStart(2, '0')}`,
        title: titleBase,
        countryRegion: ['Perú', 'Chile', 'México', 'Colombia', 'Argentina', 'Brasil'][i % 6],
        conflictType: ['Socio-Ambiental', 'Laboral', 'Comunitario', 'Normativo', 'Territorial'][i % 5],
        sector: sector,
        risk: i % 3 === 0 ? RiskLevel.CRITICAL : (i % 2 === 0 ? RiskLevel.HIGH : RiskLevel.MEDIUM),
        difficulty: i % 3 === 0 ? 'Alta' : (i % 2 === 0 ? 'Media' : 'Baja'),
        summary: getRichDescription(sector, titleBase),
        lessons: 'Claves: Identificar al actor con poder de veto, separar las posiciones de los intereses reales, buscar criterios de legitimidad externos y construir un MAAN sólido antes de sentarse a negociar.'
    });

    TEMAS_MINERIA.forEach((t, i) => cases.push(createCase('Minería', t, i, TEMAS_MINERIA)));
    TEMAS_CONSTRUCCION.forEach((t, i) => cases.push(createCase('Construcción', t, i, TEMAS_CONSTRUCCION)));
    TEMAS_AGRO.forEach((t, i) => cases.push(createCase('Agroindustria', t, i, TEMAS_AGRO)));
    TEMAS_ENERGIA.forEach((t, i) => cases.push(createCase('Energía', t, i, TEMAS_ENERGIA)));

    return cases;
};

export const MOCK_LIBRARY_CASES: LibraryCase[] = generateLibraryCases();

// --- CASOS ACTIVOS (PORTAFOLIO) ---
const generateActiveCases = (): Case[] => {
    const activeCases: Case[] = [];
    
    // REGLA: CASO INICIAL SIEMPRE CRÍTICO (NIVEL 1) - CONTEXTO RICO
    activeCases.push({
        id: 'CAS-SIM-NIVEL1',
        title: 'Nivel 1: Crisis en Planta Procesadora (Valle Alto)',
        description: `CONTEXTO:
El Valle Alto ha sufrido 3 años consecutivos de sequía. Hace 5 años, la empresa firmó un convenio marco comprometiéndose a construir un micro-reservorio para la comunidad de "San Pedro", pero la obra se ha retrasado por burocracia interna y cambio de gerentes. La confianza está rota.

SITUACIÓN ACTUAL:
Hace 4 horas, 300 comuneros tomaron la carretera principal de acceso a la Planta. Han retenido (sin violencia física) a 3 camiones de concentrado. La policía está a 10km esperando órdenes. El Gerente de Operaciones quiere despejar la vía por la fuerza para no perder el turno de exportación.

POSICIONES DE LAS PARTES:
1. Pedro (Líder Frente de Defensa): "¡Cierre definitivo de la mina! Son unos mentirosos. No nos moveremos hasta que el Gerente General venga y firme ante notario, o que se vayan".
2. Gerencia de Operaciones: "Esto es secuestro y extorsión. No negociamos bajo presión. Que entre la policía y despeje. Tenemos pérdidas de $100k por hora".
3. Alcalde Distrital: (Neutro/Ambiguo) "Yo apoyo a mi pueblo, pero necesitamos el canon. Resuelvan esto rápido".`,
        territory: 'Valle Alto',
        countryRegion: 'Simulación Inicial',
        phase: CasePhase.CRISIS, // FASE CRÍTICA
        risk: RiskLevel.CRITICAL, // RIESGO CRÍTICO
        startDate: '2023-11-01',
        updatedAt: '2023-11-01',
        financialImpact: 2500000,
        ownerId: 'GST-001', // Asignado a Gestor 1
        sector: 'Minería',
        caseType: 'Socio-Ambiental',
        complexity: 'Alta', // Complejidad inicial alta por ser crisis
        objective: 'Desescalar la crisis inmediata sin uso de fuerza pública y establecer una mesa de diálogo legítima para tratar el tema del reservorio.',
        keyRisks: ['Enfrentamiento policial con heridos', 'Pérdida total de confianza', 'Paralización indefinida'],
        scenarios: 'Si la policía entra, el conflicto se expande a las 4 comunidades vecinas. Si cedes en todo, pierdes autoridad.',
        usage: 'Simulación Nivel 1',
        nextSteps: 'Realizar PNR urgente para la reunión de emergencia.',
        improvementOpportunities: '',
        caseStatus: 'Activa',
        lastReviewDate: '2023-11-01',
        actors: [
            {
                id: 'ACT-01', name: 'Pedro Líder', role: 'Presidente Frente Defensa', organization: 'Comunidad San Pedro', 
                posture: ActorPosture.RADICAL, influence: 9, interests: ['Agua para riego (Supervivencia)', 'Validación frente a sus bases', 'Castigar a la mina por mentir'], caseId: 'CAS-SIM-NIVEL1'
            },
            {
                id: 'ACT-02', name: 'Gerente Operaciones', role: 'Gerente Interno', organization: 'Empresa', 
                posture: ActorPosture.RADICAL, influence: 8, interests: ['Cumplir cuota de exportación', 'Orden y autoridad', 'No parecer débil'], caseId: 'CAS-SIM-NIVEL1'
            }
        ],
        history: []
    });

    // Caso Manager (Sin cambios mayores)
    activeCases.push({
        id: 'CAS-CORP-001',
        title: 'Estrategia Regional Andina',
        description: 'Caso corporativo de alto nivel para supervisión.',
        territory: 'Latam',
        countryRegion: 'Corporativo',
        phase: CasePhase.PREVENTION,
        risk: RiskLevel.LOW,
        startDate: '2023-01-01',
        updatedAt: '2023-10-01',
        financialImpact: 0,
        ownerId: 'generic-manager',
        sector: 'Transversal',
        caseType: 'Estratégico',
        complexity: 'Alta',
        objective: 'Estandarizar procesos.',
        keyRisks: [],
        scenarios: '',
        usage: 'Real',
        nextSteps: '',
        improvementOpportunities: '',
        caseStatus: 'Activa',
        lastReviewDate: '2023-06-01',
        actors: [],
        history: []
    });

    return activeCases;
};

export const MOCK_CASES: Case[] = generateActiveCases();

export const MOCK_PNRS: PNRData[] = [];
export const MOCK_ALERTS: Alert[] = [];
export const MOCK_AARS: AARData[] = [];
