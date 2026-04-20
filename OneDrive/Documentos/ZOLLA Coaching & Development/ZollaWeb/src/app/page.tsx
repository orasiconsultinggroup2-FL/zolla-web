"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Linkedin,
    Menu,
    X,
    ArrowUpRight,
    MessageSquare,
    Users,
    Zap,
    Trophy,
    Share2,
    Clock
} from "lucide-react";

import { BLOG_POSTS } from "@/data/blogPosts";
import HuellaSection from "@/components/HuellaSection";

// --- TYPES ---
interface Service {
    title: string;
    desc: string;
    longDesc: string;
    icon: React.ReactNode;
    duration: string;
}

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
}

interface FieldworkImage {
    image: string;
    caption: string;
}

interface ClientCase {
    name: string;
    case: string;
}

// Las interfaces ahora vienen desde el archivo de datos o se mantienen simples aquí
// para la estructura visual.

// --- DATA ---
const SERVICES: Service[] = [
    {
        title: "Vocería Corporativa bajo presión",
        desc: "Prepara a tus directivos , gerentes y jefes de linea para responder en entornos sensibles, regulatorios y de alta exposición pública.",
        longDesc: "Diagnóstico, simulación, entrenamiento y retroalimentación aplicadas para manejo de crisis a gerencias, dirección y asuntos corporativos.",
        icon: <MessageSquare className="w-6 h-6" />,
        duration: "2 a 6 semanas"
    },
    {
        title: "Liderazgo en entornos de alta exigencia",
        desc: "Fortalece a tus líderes para tomar decisiones difíciles, mantener equipos cohesionados y conducir el cambio cuando más se necesita.",
        longDesc: "Diagnóstico, talleres, coaching y acompañamiento para equipos directivos, gerentes, jefaturas y organizaciones en transición.",
        icon: <Zap className="w-6 h-6" />,
        duration: "4 a 10 semanas"
    },
    {
        title: "Negociación estratégica de alto valor",
        desc: "Protege lo que has construido. Negocia con inteligencia cuando los márgenes se estrechan y los acuerdos se renegocian.",
        longDesc: "Mapeo de intereses, diseño e implementacion del proceso de negociacion.",
        icon: <Users className="w-6 h-6" />,
        duration: "Según complejidad"
    },
    {
        title: "Innovación & Tecnología",
        desc: "Construimos soluciones de ingeniería digital hechas a tu medida para mejorar la predictibilidad y guiar decisiones con claridad.",
        longDesc: "Levantamiento funcional, diseño y prototipado ágil para transformar datos en decisiones reales.",
        icon: <Trophy className="w-6 h-6" />,
        duration: "Variable"
    }
];

const TEAM: TeamMember[] = [
    {
        name: "Juan Ramón Zolla",
        role: "Business Partner",
        bio: "Media trainer, coach ejecutivo. Especialista en comunicación y cambio organizacional",
        image: "/images/equipo_v2/juan_zolla.png"
    },
    {
        name: "Luis Oré",
        role: "Business Partner",
        bio: "Mediador internacional, especialista en negociaciones, procesos de diálogo y construcción de consenso.",
        image: "/images/equipo_v2/luis_ore.png"
    },
    {
        name: "Andrea Pastor",
        role: "Business Partner",
        bio: "Comunicadora especialista en dar soluciones que fortalecen identidad e imagen de empresas.",
        image: "/images/equipo_v2/andrea_pastor.png"
    },
    {
        name: "Daniela Ríos",
        role: "Business Partner",
        bio: "Comunicadora visual, especialista en identidad corporativa y marketing digital.",
        image: "/images/equipo_v2/daniela_rios.png"
    },
    {
        name: "Fernando Pérez Román",
        role: "Business Partner",
        bio: "Especialista en estrategia comercial y Ventas B2B, Marketing Empresarial, negociación compleja y liderazgo de equipos de alto desempeño",
        image: "/images/equipo_v2/fernando_real.png"
    },
    {
        name: "Martin González",
        role: "Business Partner",
        bio: "Comunicador. Especialista en asuntos públicos y construcción de narrativas.",
        image: "/images/equipo_v2/martin_gonzalez.png"
    }
];

const FIELDWORK: FieldworkImage[] = [
    { image: "/images/impacto_v3/623.jpg", caption: "Análisis estratégico y diagnóstico organizacional." },
    { image: "/images/impacto_v3/638.jpg", caption: "Sesiones de alineamiento con equipos directivos." },
    { image: "/images/impacto_v3/3733.jpg", caption: "Formación de capacidades en entornos industriales." },
    { image: "/images/impacto_v3/1413.jpg", caption: "Intervenciones integrales en campo." },
    { image: "/images/impacto_v3/4146.jpg", caption: "Dinámicas de cohesión y propósito compartido." },
    { image: "/images/impacto_v3/1445.jpg", caption: "Talleres de liderazgo y comunicación asertiva." },
    { image: "/images/impacto_v3/2600.jpg", caption: "Acompañamiento en procesos de cambio real." },
    { image: "/images/impacto_v3/jr_en_tasa.jpg", caption: "Facilitación de diálogos multiactor complejos." },
    { image: "/images/impacto_v3/patron.jpg", caption: "Visión estratégica y desarrollo de talento." },
    { image: "/images/impacto_v3/taller_2.jpg", caption: "Sesión de trabajo colaborativo y co-creación." },
    { image: "/images/impacto_v3/warintza_dialogo.jpg", caption: "Construcción de acuerdos sostenibles en territorio." },
    { image: "/images/impacto_v3/tasa_2.jpg", caption: "Entrenamiento avanzado para mandos corporativos." },
    { image: "/images/impacto_v3/taller_exitoso.jpg", caption: "Programas de formación en atención de excelencia." },
    { image: "/images/impacto_v3/capacitacion_equipo.jpg", caption: "Desarrollo de habilidades para equipos de alto desempeño." },
    { image: "/images/impacto_v3/taller_liderazgo_1.jpg", caption: "Estrategias de comunicación y liderazgo efectivo." },
    { image: "/images/impacto_v3/taller_liderazgo_2.jpg", caption: "Simulaciones y entrenamiento en situaciones reales." },
    { image: "/images/impacto_v3/taller_liderazgo_3.jpg", caption: "Talleres de formación continua para la alta gerencia." },
    { image: "/images/impacto_v3/taller_liderazgo_4.jpg", caption: "Dinámicas de equipo enfocadas en resultados sostenibles." },
    { image: "/images/impacto_v3/taller_liderazgo_5.jpg", caption: "Gestión de cambio organizacional y cultura participativa." },
    { image: "/images/impacto_v3/taller_liderazgo_6.jpg", caption: "Sesiones intensivas de retroalimentación corporativa." },
    { image: "/images/impacto_v3/taller_4.jpg", caption: "Entrenamiento dinámico para equipos integrales." },
    { image: "/images/impacto_v3/taller_9.jpg", caption: "Simulaciones de alta exigencia estratégica." },
    { image: "/images/impacto_v3/taller_16.jpg", caption: "Talleres de liderazgo y construcción de visión compartida." },
    { image: "/images/impacto_v3/taller_17.jpg", caption: "Alineamiento y cohesión en entornos corporativos." }
];

const CLIENTS: ClientCase[] = [
    { name: "INKA MIKHUNA", case: "Coaching ejecutivo para los líderes de la primera línea gerencial" },
    { name: "CELEPSA", case: "Programa de vocería corporativa para el senior management" },
    { name: "EXALMAR", case: "Entrenamiento en vocería internacional y presentaciones de alto impacto" },
    { name: "IMPACTO POSITIVO / ANTAMINA", case: "Acompañamiento para el desarrollo de capacidades de liderazgo de los grupos de interés en el Valle Fortaleza, Ancash." },
    { name: "UNACEM", case: "Programa de formación de voceros internos" },
    {
        name: "TASA",
        case: "Entrenamiento de voceros internos y externos. Acompañamiento estratégico para la gestión de stakeholders. Trabajo de campo en sedes y comunidades del litoral sur. Programas de formación en liderazgo para jefes y superintendentes de plantas (Callao, Chimbote, Pisco, Chicama y Pucusana)"
    },
    { name: "SGS PERÚ", case: "Programa de formación y entrenamiento de capacidades “Líderes en Acción” 2021-2024" },
    {
        name: "DIAMANTE",
        case: "Diagnóstico de clima y cultura organizacional. Estrategia para la gestión de cambio. Trabajo de campo en plantas productoras de harina de pescado y embarcaciones pesqueras."
    },
    { name: "MEPSA", case: "Programa de formación anual en liderazgo, manejo de equipos y gestión del cambio" },
    {
        name: "SANOFI",
        case: "Desarrollo de capacidades de servicio al cliente, atención de excelencia, comunicación estratégica y gestión de controversias de los aliados regionales de Sanofi en Lima, Arequipa, Trujillo, Piura y Chiclayo"
    },
    { name: "OSIPTEL", case: "Formación y desarrollo de equipos. Consultoría en comunicación interna" },
    {
        name: "CFG-COPEINCA",
        case: "Gestión del cambio (fusión empresarial). Estrategia de comunicación interna. Formación de voceros"
    },
    { name: "SERVIR", case: "Programa de formación y entrenamiento en liderazgo de equipos para jefes de áreas." },
    { name: "ATU", case: "Entrenamiento en vocería institucional" }
];

// --- COMPONENTS ---

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4 sm:px-6 lg:px-8`}>
            <div className={`mx-auto max-w-7xl flex items-center justify-between px-8 py-3 rounded-full border transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-2xl border-white/20" : "bg-transparent border-transparent"}`}>
                <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            src="/images/logo.png"
                            alt="Zolla Logo"
                            className={`h-12 w-auto transition-all duration-500 ${scrolled ? "" : "brightness-0 invert"}`}
                            style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
                        />
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-10 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {["Nosotros", "Servicios", "HUELLA", "Equipo", "Clientes", "Blog", "Contacto"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`relative group overflow-hidden transition-colors ${item === 'HUELLA' ? 'text-zolla-primary' : (scrolled ? "text-slate-600 hover:text-zolla-primary" : "text-white/80 hover:text-white")}`}
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </a>
                    ))}
                    <a
                        href="#contacto"
                        className="px-8 py-2.5 rounded-full bg-zolla-primary text-white text-[10px] font-black hover:bg-red-700 hover:shadow-[0_0_20px_rgba(217,43,20,0.4)] transition-all active:scale-95 flex items-center justify-center"
                    >
                        AGENDAR CITA
                    </a>
                </nav>

                <button
                    className={`md:hidden p-2 rounded-full transition-colors ${scrolled ? "bg-slate-100 text-slate-900" : "bg-white/10 text-white"}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 md:hidden border border-slate-100"
                    >
                        <nav className="flex flex-col space-y-4 text-center">
                            {["Nosotros", "Servicios", "HUELLA", "Equipo", "Clientes", "Blog", "Contacto"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-lg font-medium ${item === 'HUELLA' ? 'text-zolla-primary' : 'text-slate-900'}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function SectionLead({ title, text, claim, light = false }: { title: string, text?: string, claim?: string, light?: boolean }) {
    return (
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center mb-6"
            >
                <img src="/images/logo.png" alt="Zolla" className={`h-8 w-auto ${light ? "brightness-0 invert opacity-40" : "opacity-20"}`} />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`font-serif text-4xl md:text-6xl italic leading-tight mb-8 ${light ? "text-white" : "text-slate-900"}`}
            >
                {title}
            </motion.h2>
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={`text-lg md:text-xl leading-relaxed mb-6 ${light ? "text-white/60" : "text-slate-600"}`}
                >
                    {text}
                </motion.p>
            )}
            {claim && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className={`text-sm tracking-[0.2em] uppercase font-bold pt-4 border-t ${light ? "border-white/10 text-white/40" : "border-slate-100 text-zolla-primary"}`}
                >
                    {claim}
                </motion.p>
            )}
        </div>
    );
}

function FieldworkCarousel() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((index + 1) % FIELDWORK.length);
    const prev = () => setIndex((index - 1 + FIELDWORK.length) % FIELDWORK.length);

    return (
        <div className="relative group overflow-hidden rounded-3xl bg-slate-200 aspect-[4/3]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <img
                        src={FIELDWORK[index].image}
                        alt={FIELDWORK[index].caption}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12">
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white text-lg md:text-2xl font-serif italic max-w-3xl"
                        >
                            {FIELDWORK[index].caption}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prev} className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                    <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <button onClick={next} className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <div className="absolute top-6 right-8 text-white/40 text-xs font-bold tracking-widest uppercase">
                {String(index + 1).padStart(2, '0')} / {String(FIELDWORK.length).padStart(2, '0')}
            </div>

            <div className="absolute bottom-8 right-8 flex gap-2">
                {FIELDWORK.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? "bg-zolla-primary w-8" : "bg-white/30"}`}
                    />
                ))}
            </div>
        </div>
    );
}

function ClientsCarousel() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((index + 1) % CLIENTS.length);
    const prev = () => setIndex((index - 1 + CLIENTS.length) % CLIENTS.length);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [index]);

    return (
        <div className="mt-12 relative py-20 px-4 group">
            <div className="max-w-5xl mx-auto relative min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -10 }}
                        className="text-center"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="inline-block text-[10px] font-black tracking-[0.3em] text-zolla-primary uppercase mb-6"
                        >
                            Caso de Éxito
                        </motion.span>
                        <h3 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter uppercase whitespace-normal break-words leading-none">
                            {CLIENTS[index].name}
                        </h3>
                        <div className="h-0.5 w-12 bg-zolla-primary mx-auto mb-10" />
                        <p className="text-2xl md:text-3xl text-slate-600 font-serif italic max-w-3xl mx-auto leading-relaxed">
                            "{CLIENTS[index].case}"
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-12 -right-12 hidden lg:flex justify-between pointer-events-none">
                    <button onClick={prev} className="p-4 rounded-full border border-slate-200 text-slate-300 hover:text-zolla-primary hover:border-zolla-primary hover:bg-zolla-soft transition-all pointer-events-auto shadow-sm active:scale-90">
                        <ChevronRight className="w-8 h-8 rotate-180" />
                    </button>
                    <button onClick={next} className="p-4 rounded-full border border-slate-200 text-slate-300 hover:text-zolla-primary hover:border-zolla-primary hover:bg-zolla-soft transition-all pointer-events-auto shadow-sm active:scale-90">
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            </div>

            <div className="flex justify-center mt-12 gap-3 overflow-x-auto py-6 px-4 scrollbar-hide no-scrollbar">
                {CLIENTS.map((client, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`shrink-0 px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-sm ${i === index ? "bg-zolla-primary text-white scale-110 shadow-xl" : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"}`}
                    >
                        {client.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

function BlogSection() {
    const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/sync-blog');
            const data = await res.json();
            if (data.posts) {
                // Marcamos los posts dinámicos y aseguramos que tengan un slug funcional
                const identifiedPosts = data.posts.map((p: any) => {
                    const slug = p.slug || p.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]/g, '');
                    return { ...p, slug, isDynamic: true };
                });
                setDynamicPosts(identifiedPosts);
            }
        } catch (err) {
            console.error("Fallo al cargar blogs dinámicos:", err);
        }
    };

    const handleDelete = async (slug: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("¿Seguro que quieres eliminar este artículo permanentemente de la web?")) return;

        try {
            const res = await fetch('/api/sync-blog', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug })
            });
            const data = await res.json();
            if (data.success) {
                // Actualizar localmente inmediatamente
                setDynamicPosts(dynamicPosts.filter(p => (p.slug || p.title.toLowerCase().replace(/ /g, '-')) !== slug));
                alert("Artículo eliminado con éxito.");
            } else {
                alert("Error al eliminar: " + data.error);
            }
        } catch (err) {
            console.error("Error al eliminar post:", err);
            alert("Error de conexión al intentar eliminar.");
        }
    };

    const allPosts = [...dynamicPosts, ...BLOG_POSTS];

    return (
        <section id="blog" className="py-32 bg-zolla-soft">
            <div className="max-w-7xl mx-auto px-6">
                <SectionLead
                    title="Pensamiento Estratégico"
                    text="Reflexiones y herramientas sobre liderazgo, negociación y cambio."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {allPosts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-zolla-border"
                        >
                            <div className="aspect-[16/9] overflow-hidden relative">
                                <img
                                    src={post.image || post.selectedImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 z-10">
                                    {post.isDynamic && post.slug && (
                                        <button
                                            onClick={(e) => handleDelete(post.slug, e)}
                                            className="p-2 bg-red-500/80 backdrop-blur-md text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 active:scale-95"
                                            title="Eliminar de la Web"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-zolla-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                        {post.category || post.theme}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
                                    {post.date}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-zolla-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {post.excerpt || post.content?.substring(0, 120) + "..."}
                                </p>
                                <Link href={`/blog/${post.slug}`} className="pt-6 border-t border-slate-50 flex items-center justify-between group/link cursor-pointer">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zolla-primary">Leer más</span>
                                    <div className="w-8 h-8 rounded-full bg-zolla-soft flex items-center justify-center text-zolla-primary group-hover/link:bg-zolla-primary group-hover/link:text-white transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link href="#blog" className="inline-block px-10 py-4 border-2 border-zolla-primary text-zolla-primary font-bold hover:bg-zolla-primary hover:text-white transition-all">
                        VER TODOS LOS ARTÍCULOS
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatStep, setChatStep] = useState<"menu" | "form" | "success">("menu");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulamos envío
        setTimeout(() => {
            setIsSubmitting(false);
            setChatStep("success");
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <main className="relative overflow-x-hidden bg-white selection:bg-zolla-primary/10 selection:text-zolla-primary">
            <div className="noise fixed inset-0 z-[100] opacity-[0.03] pointer-events-none" />
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-zolla-primary z-[60] origin-left"
                style={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            />
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center bg-zolla-dark bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 rounded-full border border-white/20 text-white/60 text-xs tracking-widest uppercase mb-8">
                            Empatía + Estrategia
                        </span>
                        <h1 className="font-serif text-6xl md:text-8xl text-white leading-[1.1] mb-8 italic">
                            Transformamos organizaciones <br />
                            <span className="not-italic font-sans font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">desde dentro</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                            Liderazgo fuerte . Cambio real . Acuerdos que duran
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('zolla:openChat'))}
                                className="w-full sm:w-auto px-10 py-4 bg-zolla-primary text-white font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 group"
                            >
                                Solicitar diagnóstico gratuito
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a href="#servicios" className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/20 text-white font-bold backdrop-blur-md hover:bg-white/10 transition-colors flex items-center justify-center">
                                Nuestros Servicios
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
                </div>
            </section>

            {/* --- NOSOTROS --- */}
            <section id="nosotros" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionLead
                        title="¿Y si el próximo gran salto no estuviera en una nueva estrategia… sino en las personas que ya tienes?"
                        text="Fortalecemos liderazgo auténtico, navegamos cambios sin perder el rumbo y creamos acuerdos sólidos que realmente se cumplen."
                        claim="Porque el verdadero poder organizacional nace cuando las personas se sienten vistas, valoradas y alineadas"
                    />

                    <div className="grid md:grid-cols-3 gap-8 mt-20">
                        {[
                            { label: "Liderazgo", value: "Auténtico" },
                            { label: "Cambio", value: "Real" },
                            { label: "Acuerdos", value: "Sostenibles" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 bg-zolla-soft rounded-3xl border border-zolla-border text-center group hover:bg-white hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="text-zolla-primary font-bold uppercase tracking-widest text-xs mb-4">{stat.label}</div>
                                <div className="text-4xl font-serif italic text-slate-900 group-hover:scale-105 transition-transform">{stat.value}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SERVICIOS --- */}
            <section id="servicios" className="py-32 bg-zolla-dark text-white relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <SectionLead
                        title="Nuestra Experticia"
                        text="Soluciones estratégicas para desafíos complejos."
                        light
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SERVICES.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedService(service)}
                                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer h-full flex flex-col"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-zolla-primary/20 flex items-center justify-center text-zolla-primary mb-6 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                                <p className="text-white/60 mb-8 flex-grow leading-relaxed">{service.desc}</p>
                                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{service.duration}</span>
                                    <ArrowUpRight className="w-4 h-4 text-zolla-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- HUELLA --- */}
            <HuellaSection />

            {/* --- EQUIPO --- */}
            <section id="equipo" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionLead
                        title="Sapiencia y Liderazgo"
                        text="Un equipo multidisciplinario enfocado en resultados extraordinarios."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {TEAM.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-6 group"
                            >
                                <div className="aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden relative border border-slate-100 shadow-2xl transition-all duration-700">
                                    {member.image ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-serif italic bg-zolla-soft">Foto Pendiente</div>
                                    )}
                                </div>
                                <div className="relative pt-2">
                                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-zolla-primary transition-colors">{member.name}</h4>
                                    <p className="text-zolla-primary font-black text-[9px] uppercase tracking-[0.2em] mb-3">{member.role}</p>
                                    <p className="text-slate-500 text-sm leading-relaxed border-l border-slate-100 pl-4">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TRABAJO DE CAMPO --- */}
            <section id="campo" className="py-32 bg-zolla-soft overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionLead title="Impacto en el Terreno" text="La teoría se hace realidad en la acción." />

                    <FieldworkCarousel />
                </div>
            </section>

            {/* --- CLIENTES --- */}
            <section id="clientes" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionLead
                        title="Confianza Institucional"
                        text="Organizaciones que han confiado en nuestro enfoque para liderar el cambio."
                    />

                    <ClientsCarousel />
                </div>
            </section>

            {/* --- BLOG --- */}
            <BlogSection />

            {/* --- CONTACTO --- */}
            <section id="contacto" className="py-32 bg-zolla-dark text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="font-serif text-5xl italic mb-8">¿Listo para transformar tu organización?</h2>
                    <p className="text-xl text-white/60 mb-12">Conversemos sobre cómo podemos ayudarte.</p>
                    <div className="flex justify-center gap-6">
                        <a href="mailto:fernando@zolla.com.pe" className="px-10 py-5 bg-zolla-primary text-white font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2">
                            Contáctanos <ArrowUpRight className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/company/zolla-coaching-development/" target="_blank" rel="noopener noreferrer" className="p-5 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-16 bg-white border-t border-zolla-border">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <img src="/images/logo.png" alt="ZOLLA Logo" className="h-10 w-auto" />
                        <p className="text-slate-400 text-xs font-medium tracking-wide">© 2026 Zolla Coaching & Development. Todos los derechos reservados.</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="https://www.linkedin.com/company/zolla-coaching-development/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-zolla-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="p-4 bg-zolla-soft text-zolla-primary rounded-full hover:bg-zolla-primary hover:text-white transition-all shadow-sm"
                        >
                            <ChevronRight className="w-5 h-5 -rotate-90" />
                        </button>
                    </div>
                </div>
            </footer>

            {/* --- SERVICE MODAL --- */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 overflow-y-auto py-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="fixed inset-0 bg-zolla-dark/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[32px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl"
                        >
                            <div className="p-8 md:p-12">
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="absolute top-8 right-8 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-zolla-primary hover:text-white transition-all shadow-sm"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-zolla-soft flex items-center justify-center text-zolla-primary">
                                        {selectedService.icon}
                                    </div>
                                    <img src="/images/logo.png" alt="Zolla" className="h-8 w-auto opacity-40" />
                                </div>

                                <span className="inline-block text-[10px] font-black tracking-[0.3em] text-zolla-primary uppercase mb-4">
                                    Detalle del Servicio
                                </span>

                                <h3 className="font-serif text-4xl md:text-5xl italic text-slate-900 mb-8 leading-tight">
                                    {selectedService.title}
                                </h3>

                                <div className="space-y-6">
                                    <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-zolla-primary pl-6">
                                        {selectedService.desc}
                                    </p>

                                    <div className="pt-6">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Lo que hacemos:</h4>
                                        <p className="text-slate-500 leading-relaxed text-lg">
                                            {selectedService.longDesc}
                                        </p>
                                    </div>

                                    <div className="pt-10 flex flex-col sm:flex-row items-center gap-6">
                                        <a
                                            href={`mailto:fernando@zolla.com.pe?subject=Información sobre el servicio: ${selectedService.title}`}
                                            onClick={() => setSelectedService(null)}
                                            className="w-full sm:w-auto px-10 py-5 bg-zolla-primary text-white font-bold rounded-full hover:scale-105 transition-all text-center"
                                        >
                                            SOLICITAR INFORMACIÓN
                                        </a>
                                        <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                            <Clock className="w-4 h-4" />
                                            Duración: {selectedService.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
