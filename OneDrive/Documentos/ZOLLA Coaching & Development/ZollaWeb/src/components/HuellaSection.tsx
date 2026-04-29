'use client';

const indiceStyles = `
  .huella-autonomous-section .indice { background: #0D0D0D !important; padding: 100px 8%; }
  .indice-niveles { display: flex; flex-direction: column; gap: 2px; margin-top: 48px; }
  .indice-nivel-card { background: #111; overflow: hidden; }
  .indice-nivel-header { display: flex; align-items: stretch; cursor: pointer; transition: background 0.2s; }
  .indice-nivel-header:hover { background: rgba(255,255,255,0.03); }
  .indice-nivel-num { background: #D92B14; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; writing-mode: vertical-rl; transform: rotate(180deg); padding: 24px 14px; display: flex; align-items: center; justify-content: center; min-width: 48px; flex-shrink: 0; text-transform: uppercase; }
  .indice-nivel-info { padding: 28px 32px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
  .indice-nivel-tag { font-size: 10px; letter-spacing: 0.12em; color: #D92B14; font-weight: 700; text-transform: uppercase; }
  .indice-nivel-nombre { font-size: 20px; font-weight: 900; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; }
  .indice-nivel-sub { font-size: 13px; color: #888; line-height: 1.5; }
  .indice-toggle { display: flex; align-items: center; padding: 0 28px; color: #888; font-size: 22px; font-weight: 300; transition: transform 0.3s, color 0.2s; flex-shrink: 0; }
  .indice-toggle.open { transform: rotate(45deg); color: #D92B14; }
  .indice-nivel-body { display: none; border-top: 0.5px solid rgba(255,255,255,0.08); grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0; }
  .indice-nivel-body.open { display: grid; }
  .indice-sub-item { background: #0D0D0D; padding: 24px 28px; border-right: 0.5px solid rgba(255,255,255,0.08); border-bottom: 0.5px solid rgba(255,255,255,0.08); }
  .indice-sub-item:last-child { border-right: none; }
  .indice-sub-nombre { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; text-transform: uppercase; margin-bottom: 8px; }
  .indice-sub-desc { font-size: 13px; color: #888; line-height: 1.6; }
  .indice-sub-tag { display: inline-block; margin-top: 12px; font-size: 10px; letter-spacing: 0.1em; font-weight: 700; color: #D92B14; border: 0.5px solid #D92B14; padding: 3px 8px; text-transform: uppercase; }
  .huella-autonomous-section .indice .section-title { color: #ffffff !important; }
  .huella-autonomous-section .indice .section-lead { color: #888 !important; }
  .huella-autonomous-section .indice .section-eyebrow { color: #D92B14 !important; }
  @media (max-width: 768px) {
    .indice-nivel-body { grid-template-columns: 1fr; }
    .indice-nivel-info { padding: 20px 16px; }
    .indice-nivel-nombre { font-size: 16px; }
    .indice-toggle { padding: 0 16px; }
  }
`;

import React, { useState, useEffect } from 'react';

const HuellaSection = () => {
    const [activeFase, setActiveFase] = useState(0);
    const [activeNivel, setActiveNivel] = useState<number | null>(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const fases = [
        {
            num: "01", name: "REVELAR", sub: "DIAGNÓSTICO",
            tag: "NO PUEDES CAMBIAR LO QUE NO VES",
            desc: "Construir un mapa completo y honesto del líder: su estilo real, sus puntos ciegos, cómo lo percibe su equipo y qué está produciendo sistémicamente en la organización.",
            items: ["Diagnóstico 360° aumentado con IA, cuatro dimensiones simultáneas", "Mapa de puntos ciegos del líder de equipo", "Perfil HUELLA: clasificación en uno de los 4 arquetipos", "Cálculo del Gap de Huella: distancia entre quien cree ser y quien es", "Informe de 1 página: huella actual + brecha + punto de entrada"],
            ia: "Análisis semántico de encuestas del equipo para detectar patrones que el líder de equipo no verá en un informe estándar. Generación automática del Perfil HUELLA personalizado.",
            micros: [
                { num: "1.1", title: "ENTREVISTA DE CAMPO INICIAL", desc: "Presencial, facilitada por ZOLLA Coaching & Development. No es diagnóstico estándar. Es un proceso construido con 30 años de experiencia en industria pesada." },
                { num: "1.2", title: "DIAGNÓSTICO IA", desc: "Mapa de puntos ciegos. Cruce de autopercepción con percepción del equipo. El sistema calcula el Gap de Huella." },
                { num: "1.3", title: "INFORME REVELAR", desc: "Una página. Tres verdades: Tu huella actual. La brecha. El punto de entrada al trabajo real." }
            ]
        },
        {
            num: "02", name: "FRACTURAR", sub: "CONFRONTAR",
            tag: "LA INCOMODIDAD ES EL PRIMER SÍNTOMA DEL CAMBIO REAL",
            desc: "Confrontar al líder de equipo con su verdad de campo de forma que no pueda defensivamente ignorarla. El momento más delicado, y donde la experiencia de 30 años es absolutamente insustituible.",
            items: ["Sesión de Espejo presencial, 3 a 4 horas", "El dato sin juicio: Gap de Huella presentado en la mesa", "Historias reales de industria como espejo", "La elección: dos futuros posibles en términos concretos y medibles", "Contrato de Cambio: el líder de equipo articula su compromiso"],
            ia: "Fracturar la defensa del líder de equipo para permitir la entrada de nuevas conductas. Sin fractura, no hay cambio, solo entrenamiento.",
            micros: [
                { num: "2.1", title: "LA SESIÓN DE ESPEJO", desc: "La capacidad de sostener la tensión sin romperla. Uso de experiencia de campo como referencia." },
                { num: "2.2", title: "EL QUIEBRE", desc: "Aceptación del GAP. El momento donde el líder reconoce que su estilo actual tiene un costo que ya no quiere pagar." }
            ]
        },
        {
            num: "03", name: "FORJAR", sub: "CONSTRUIR",
            tag: "EL LIDERAZGO SE FORJA EN LA PRÁCTICA, NO EN EL AULA",
            desc: "Sprint de 4 a 6 semanas de alta intensidad. No hay teoría nueva; hay práctica nueva en situaciones reales de negocio.",
            items: ["Acompañamiento en el terreno, 4 a 6 sesiones críticas", "Práctica deliberada de conductas de alto impacto", "Conversaciones de Verdad con el equipo real", "Bitácora de líder: registro y feedback inmediato", "Intervención en reuniones de equipo del líder"],
            ia: "Procesamiento de bitácoras diarias para detectar patrones de regresión y sugerir ajustes antes de la siguiente sesión.",
            micros: [
                { num: "3.1", title: "PRÁCTICA EN CAMPO", desc: "Trabajamos sobre los problemas actuales del líder de equipo, no sobre casos hipotéticos." },
                { num: "3.2", title: "CONVERSACIONES DE VERDAD", desc: "Sinceramiento del equipo. El líder aprende a escuchar lo que su equipo realmente piensa y necesita." }
            ]
        },
        {
            num: "04", name: "HUELLA", sub: "CONSOLIDAR",
            tag: "LO QUE PERDURA ES LO QUE SE VUELVE IDENTIDAD",
            desc: "Consolidar la nueva identidad del líder y asegurar que la huella sea permanente sin necesidad de acompañamiento externo constante.",
            items: ["Diseño del Manifiesto de Huella Personal", "Sistema de autogestión y rendición de cuentas", "Medición final del Gap: ¿Cuánto se cerró la brecha?", "Plan de Sostenibilidad a 12 meses", "Certificación de Impacto HUELLA (basado en resultados, no asistencia)"],
            ia: "Monitoreo ligero de IA durante 6 meses para alertar sobre patrones de regresión y celebrar hitos de consolidación.",
            micros: [
                { num: "4.1", title: "MANIFIESTO DE HUELLA", desc: "Un ancla de identidad, no un ejercicio motivacional. El líder articula qué tipo de líder quiere ser." },
                { num: "4.2", title: "MEDICIÓN DE IMPACTO", desc: "Seguimiento a 3, 6 y 12 meses. 6 Métricas de Éxito: Clima, Rotación, Percepción, Autopercepción, Resultados y Huella Real." }
            ]
        }
    ];

    const arquetipos = [
        { num: "01", name: "EL EJECUTOR", pat: "ENTREGA RESULTADOS, DESTRUYE PERSONAS", blind: "\"MI EQUIPO NO NECESITA AFECTO, NECESITA DIRECCIÓN\"" },
        { num: "02", name: "EL EXPERTO", pat: "SABE MÁS QUE TODOS, NO DELEGA", blind: "\"SI QUIERES QUE ALGO SALGA BIEN, HAZLO TÚ MISMO\"" },
        { num: "03", name: "EL ADMINISTRADOR", pat: "GESTIONA PROCESOS, NO LIDERA PERSONAS", blind: "\"MI TRABAJO ES REPORTAR, NO MOTIVAR\"" },
        { num: "04", name: "EL AUSENTE", pat: "CAPAZ PERO DESCONECTADO DEL EQUIPO REAL", blind: "\"YO CONFÍO EN MI GENTE\" (PERO NO LOS CONOCE)" }
    ];

    const niveles = [
        {
            num: "NIVEL 01",
            tag: "Lenguaje de negocio — lo que habla el directorio",
            nombre: "Indicadores de impacto operativo",
            sub: "Los que justifican la inversión. Se hablan en números, no en RRHH.",
            items: [
                { nombre: "Rotación voluntaria", desc: "Especialmente la de los primeros 12 meses y la que ocurre en áreas bajo líderes específicos. HUELLA muestra el antes y después por líder intervenido.", tag: "MEDIBLE" },
                { nombre: "Ausentismo no programado", desc: "El termómetro silencioso del liderazgo. Cuando la gente empieza a faltar sin razón médica clara, el problema casi siempre tiene nombre y apellido: su jefe directo.", tag: "AUDITABLE" },
                { nombre: "Incidentes de seguridad", desc: "LTIR, TRIR. En minería, pesca y agroindustria esto es crítico. La calidad del liderazgo de primera línea correlaciona directamente con la tasa de accidentes.", tag: "CRÍTICO" },
                { nombre: "Días perdidos por conflictos", desc: "Huelgas o paralizaciones. En industrias pesadas peruanas, este es un KPI de supervivencia. Los conflictos sindicales casi nunca empiezan por el pliego.", tag: "OPERATIVO" }
            ]
        },
        {
            num: "NIVEL 02",
            tag: "Evidencia real de transformación cultural",
            nombre: "Indicadores de comportamiento organizacional",
            sub: "Más difíciles de medir, pero son la prueba de que la cultura está cambiando de verdad.",
            items: [
                { nombre: "Accountability medible", desc: "Porcentaje de compromisos asumidos que se cumplen en plazo. Si antes se hacían 10 acuerdos y se cumplían 3, y después de HUELLA se cumplen 7, eso es cambio visible.", tag: "MEDIBLE" },
                { nombre: "Tasa de promoción interna vs. contratación externa", desc: "Una cultura sana desarrolla talento. Si la empresa sigue buscando afuera para cada posición clave, la cultura no cambió — solo se capacitó.", tag: "INDICADOR" },
                { nombre: "Quejas formales por maltrato, acoso o abuso de autoridad", desc: "No se busca que bajen a cero. Se busca que la tendencia se estabilice mientras sube la confianza para reportar. Es un indicador que se lee con matiz.", tag: "AUDITABLE" },
                { nombre: "Calidad de las decisiones: velocidad de escalamiento", desc: "En culturas disfuncionales todo sube al jefe porque nadie se atreve a decidir. Si después de HUELLA los mandos medios empiezan a resolver en su nivel, la cultura se movió.", tag: "OPERATIVO" }
            ]
        },
        {
            num: "NIVEL 03",
            tag: "Confirma que el cambio es sostenible",
            nombre: "Indicadores de confianza y cohesión",
            sub: "Los que revelan si el cambio duró o fue solo el efecto del programa.",
            items: [
                { nombre: "Confianza en el liderazgo directo", desc: "¿Confías en que tu jefe va a hacer lo correcto cuando sea difícil? Esa pregunta sola vale más que un clima de 80 ítems.", tag: "PROFUNDO" },
                { nombre: "Disposición a dar feedback hacia arriba", desc: "¿La gente le dice la verdad a su jefe o le dice lo que quiere escuchar? El indicador más profundo de cambio cultural real.", tag: "CULTURAL" },
                { nombre: "Voluntad de permanencia real", desc: "No ¿estás satisfecho? sino ¿te irías si te ofrecen lo mismo en otro lado? Mide lealtad al líder y a la cultura, no al sueldo.", tag: "SOSTENIBLE" }
            ]
        }
    ];

    return (
        <div className="huella-autonomous-section" id="huella">
            <style dangerouslySetInnerHTML={{ __html: indiceStyles }} />

            {/* HERO */}
            <section className="hero">
                <div className="hero-left reveal">
                    <div className="hero-eyebrow">METODOLOGÍA DE TRANSFORMACIÓN PARA LÍDERES DE EQUIPO</div>
                    <h1 className="hero-title">
                        UN LÍDER<br />QUE DEJA<br /><span className="brand-text" style={{ fontSize: '180px', lineHeight: '0.8', display: 'block', marginTop: '1.5rem' }}>HUELLA</span>
                    </h1>
                    <p className="hero-sub" style={{ fontSize: '1.25rem', marginTop: '3rem' }}>
                        "No te enseño a liderar. Te ayudo a descubrir el líder que ya eres, y a construir el que tu equipo necesita."
                    </p>
                    <div className="hero-pills" style={{ marginTop: '3rem' }}>
                        <span className="pill">MINERÍA</span>
                        <span className="pill">PESCA</span>
                        <span className="pill">AGROINDUSTRIA</span>
                        <span className="pill">30 AÑOS EN CAMPO</span>
                    </div>
                    <div className="hero-ctas">
                        <button onClick={() => window.dispatchEvent(new CustomEvent('zolla:openChat'))} className="btn-primary">SOLICITAR DIAGNÓSTICO INICIAL</button>
                        <a href="#fases" className="btn-secondary">VER METODOLOGÍA</a>
                    </div>
                </div>
                <div className="hero-right reveal" />
            </section>

            {/* FILOSOFÍA */}
            <section className="filosofia">
                <div className="reveal">
                    <div className="section-eyebrow">FILOSOFÍA</div>
                    <h2 className="section-title">El problema<br />que nadie mide</h2>
                    <p className="section-lead">Los programas de liderazgo entrenan habilidades. <span className="brand-text">HUELLA</span> trabaja identidad. No son lo mismo.</p>
                </div>
                <div className="filo-grid reveal">
                    <div className="filo-card">
                        <div className="filo-label">EL PATRÓN QUE HEMOS VISTO DURANTE 30 AÑOS</div>
                        <p className="filo-text">El líder técnicamente competente que no sabe construir no tiene un problema de habilidades, tiene un problema de quién cree que es cuando lidera. Ve números, no personas. La consecuencia es siempre la misma: resultados a corto plazo, rotación permanente, clima destruido y un líder que no entiende por qué su equipo no lo sigue de verdad.</p>
                    </div>
                    <div className="filo-card dark">
                        <div className="filo-label">LA DIFERENCIA QUE MARCA <span className="brand-text">HUELLA</span></div>
                        <p className="filo-quote">"<span className="brand-text">HUELLA</span> no enseña liderazgo. Revela al líder que ya existe, y construye el que la organización necesita."</p>
                        <div className="filo-number">30</div>
                    </div>
                    <div className="filo-card red-card">
                        <div className="filo-label" style={{ color: 'rgba(255,255,255,0.8)' }}>PARA LA EMPRESA QUE CONTRATA</div>
                        <p className="filo-quote">"No medimos asistencia. Medimos rotación, clima y resultados. Esa es la <span className="text-black font-bold">HUELLA</span> que garantizamos."</p>
                    </div>
                    <div className="filo-card">
                        <div className="filo-label">¿A QUIÉN TRANSFORMA <span className="brand-text">HUELLA</span>?</div>
                        <p className="filo-text">Jefes de equipo en cualquier posición y líderes en campo con responsabilidad sobre grupos humanos, que entregan resultados pero sacrifican el clima de su equipo, no saben delegar o no entienden por qué su rotación es alta.</p>
                        <div className="hero-pills" style={{ marginTop: '2rem', justifyContent: 'flex-start', gap: '8px', opacity: 1 }}>
                            <span className="pill-small">ALTA ROTACIÓN</span>
                            <span className="pill-small">CLIMA DETERIORADO</span>
                            <span className="pill-small">MICROGESTIÓN</span>
                            <span className="pill-small">DESCONEXIÓN DEL EQUIPO</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARQUETIPOS */}
            <section className="arquetipos">
                <div className="reveal">
                    <div className="section-eyebrow">LOS 4 ARQUETIPOS <span className="brand-text">HUELLA</span></div>
                    <h2 className="section-title light">¿Cuál de estos<br />reconoces?</h2>
                    <p className="section-lead light">Basados en 30 años de observación directa en minería, pesca y agroindustria. No para etiquetar. Para dar un espejo preciso.</p>
                </div>
                <div className="arq-grid reveal">
                    {arquetipos.map((arq, idx) => (
                        <div key={idx} className="arq-card">
                            <div className="arq-num">{arq.num}</div>
                            <h3 className="arq-name">{arq.name}</h3>
                            <p className="arq-pattern">{arq.pat}</p>
                            <p className="arq-blind">{arq.blind}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FASES */}
            <section className="fases" id="fases">
                <div className="reveal">
                    <div className="section-eyebrow">ARQUITECTURA DEL PROGRAMA</div>
                    <h2 className="section-title">Las 4 fases de <span className="brand-text">HUELLA</span></h2>
                    <p className="section-lead">Diagnóstico intensivo (Fases 1 y 2) + acompañamiento ligero de alto valor (Fases 3 y 4). Individual o grupal.</p>
                </div>
                <div className="fases-flow reveal">
                    {fases.map((f, i) => (
                        <div key={i} className={`fase-step ${activeFase === i ? 'active' : ''}`} onClick={() => setActiveFase(i)}>
                            <div className="fs-num">Fase 0{i + 1}</div>
                            <div className="fs-name">{f.name}</div>
                            <div className="fs-sub">{f.sub}</div>
                        </div>
                    ))}
                </div>
                <div className="fase-content active reveal">
                    <div className="fase-left">
                        <div className="fase-tag">"{fases[activeFase].tag}"</div>
                        <p className="fase-desc">{fases[activeFase].desc}</p>
                        <ul className="fase-items">
                            {fases[activeFase].items.map((item, j) => <li key={j}>{item}</li>)}
                        </ul>
                        <div className="fase-ia">
                            <div className="fase-ia-label">IA EN ESTA FASE</div>
                            <p className="fase-ia-text">{fases[activeFase].ia}</p>
                        </div>
                    </div>
                    <div className="fase-right">
                        {fases[activeFase].micros.map((m, k) => (
                            <div key={k} className="fase-micro">
                                <div className="fase-micro-num">{m.num}. {m.title}</div>
                                <div className="fase-micro-text">{m.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ARQUITECTURA IA */}
            <section className="ia-section">
                <div className="reveal">
                    <div className="section-eyebrow">ARQUITECTURA IA</div>
                    <h2 className="section-ia-title">PRECISIÓN QUIRÚRGICA PARA EL LIDERAZGO</h2>
                    <p className="section-lead">No usamos IA para generar textos. La usamos para revelar lo que el ojo humano ignora por sesgo o saturación.</p>
                </div>
                <div className="ia-grid reveal">
                    <div className="ia-card">
                        <h3 className="ia-card-label">DIAGNÓSTICO SEMÁNTICO</h3>
                        <div className="ia-item"><div className="ia-dot" /><p className="ia-item-text">Análisis de micro-patrones en el lenguaje del equipo para detectar silos de poder o quiebres de confianza invisibles.</p></div>
                    </div>
                    <div className="ia-card">
                        <h3 className="ia-card-label">CÁLCULO DEL GAP</h3>
                        <div className="ia-item"><div className="ia-dot" /><p className="ia-item-text">Algoritmo propio que mide la distancia matemática entre la autopercepción de un líder y su huella real en el clima.</p></div>
                    </div>
                    <div className="ia-card">
                        <h3 className="ia-card-label">MONITOR DE REGRESIÓN</h3>
                        <div className="ia-item"><div className="ia-dot" /><p className="ia-item-text">Sistema de alerta temprana que detecta cuando el líder vuelve a conductas del arquetipo disfuncional.</p></div>
                    </div>
                    <div className="ia-card">
                        <h3 className="ia-card-label">SÍNTESIS DE RESULTADOS</h3>
                        <div className="ia-item"><div className="ia-dot" /><p className="ia-item-text">La IA consolida datos de bitácora, encuestas y conducta para que el coach intervenga con precisión.</p></div>
                    </div>
                </div>
                <div className="ia-human-box reveal">
                    <div className="ia-human-left">
                        <span className="big-field">30 AÑOS<br />DE<br />CAMPO</span>
                    </div>
                    <div className="ia-human-right">
                        <p className="ia-human-main">La IA hace el trabajo de síntesis, medición y seguimiento. <span className="brand-text">ZOLLA Coaching & Development</span> hace el trabajo que ninguna IA puede hacer: confrontar, sostener y transformar.</p>
                        <p className="ia-human-sub">El resultado: un líder que cambia de verdad y un equipo que lo mide.</p>
                    </div>
                </div>
            </section>

            {/* DIFERENCIAL */}
            <section className="diferencial">
                <div className="reveal">
                    <div className="section-eyebrow">DIFERENCIAL</div>
                    <h2 className="section-title">¿Por qué <span className="brand-text">HUELLA</span>?</h2>
                </div>
                <div className="reveal">
                    <table className="compare-table">
                        <thead>
                            <tr><th>CRITERIO</th><th>PROGRAMAS ESTÁNDAR</th><th>METODOLOGÍA <span className="brand-text">HUELLA</span></th></tr>
                        </thead>
                        <tbody>
                            <tr><td>ENFOQUE</td><td>HABILIDADES BLANDAS (SOFT SKILLS)</td><td>IDENTIDAD Y LIDERAZGO DE IMPACTO</td></tr>
                            <tr><td>DIAGNÓSTICO</td><td>GENÉRICO, BASADO EN ENCUESTAS</td><td>CONTEXTUALIZADO A CAMPO + IA</td></tr>
                            <tr><td>ENTORNO</td><td>AULA O ENTORNO VIRTUAL</td><td>OPERACIÓN REAL DE NEGOCIO</td></tr>
                            <tr><td>FACILITACIÓN</td><td>LECTOR DE TEORÍA O COACH GENÉRICO</td><td>30 AÑOS EN MINERÍA, PESCA, AGRO</td></tr>
                            <tr><td>RESULTADO</td><td>CERTIFICADO DE ASISTENCIA</td><td>GARANTÍA DE <span className="brand-text">HUELLA</span> (KPIS)</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ÍNDICE */}
            <section className="indice">
                <div className="reveal">
                    <div className="section-eyebrow">MÉTRICAS</div>
                    <h2 className="section-title light">Índice <span className="brand-text">HUELLA</span></h2>
                    <p className="section-lead light">Medición rigurosa del impacto real en la organización, no percepciones, datos. A los 3, 6 y 12 meses.</p>
                </div>
                <div className="indice-niveles reveal">
                    {niveles.map((nivel, i) => (
                        <div key={i} className="indice-nivel-card">
                            <div className="indice-nivel-header" onClick={() => setActiveNivel(activeNivel === i ? null : i)}>
                                <div className="indice-nivel-num">{nivel.num}</div>
                                <div className="indice-nivel-info">
                                    <span className="indice-nivel-tag">{nivel.tag}</span>
                                    <span className="indice-nivel-nombre">{nivel.nombre}</span>
                                    <span className="indice-nivel-sub">{nivel.sub}</span>
                                </div>
                                <div className={`indice-toggle ${activeNivel === i ? 'open' : ''}`}>+</div>
                            </div>
                            <div className={`indice-nivel-body ${activeNivel === i ? 'open' : ''}`}>
                                {nivel.items.map((item, j) => (
                                    <div key={j} className="indice-sub-item">
                                        <div className="indice-sub-nombre">{item.nombre}</div>
                                        <div className="indice-sub-desc">{item.desc}</div>
                                        <span className="indice-sub-tag">{item.tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="cta-final">
                <div className="cta-container reveal">
                    <div className="cta-content">
                        <h2 className="cta-title">UN LÍDER QUE DEJA <br /><span className="brand-text">HUELLA</span></h2>
                        <p className="cta-text">El diagnóstico inicial tiene cupos limitados por mes. Asegura el tuyo y descubre qué tipo de <span className="brand-text">huella</span> estás dejando hoy.</p>
                    </div>
                    <div className="cta-action">
                        <a href="https://wa.me/51950011400" target="_blank" className="btn-cta">SOLICITAR DIAGNÓSTICO ESPECIALIZADO</a>
                        <p className="cta-note">Acompañamiento directo de ZOLLA Coaching & Development.<br />Respuesta en menos de 24 horas laborables.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HuellaSection;
