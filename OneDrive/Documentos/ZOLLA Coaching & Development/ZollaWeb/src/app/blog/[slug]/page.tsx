"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { notFound } from "next/navigation";

// Logos oficiales de redes sociales (SVG inline)
// Logos oficiales de redes sociales (SVG inline para máxima compatibilidad)
const LinkedInLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="white"/>
    </svg>
);

const WhatsAppLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.481 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997 0-3.953-.5-5.691-1.448l-6.303 1.655zm6.305-4.515c1.737.989 3.398 1.487 5.275 1.488 5.639 0 10.229-4.59 10.231-10.23.001-2.728-1.061-5.293-2.989-7.225-1.928-1.932-4.494-2.992-7.222-2.993-5.638 0-10.229 4.59-10.231 10.23-.001 2.136.549 4.146 1.588 5.945l-1.037 3.791 3.885-1.006zm13.734-7.415c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
    </svg>
);

const XLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
    </svg>
);

const FacebookLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" fill="white"/>
    </svg>
);


export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const [dynamicPost, setDynamicPost] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    const staticPost = BLOG_POSTS.find((p) => p.slug === params.slug);

    React.useEffect(() => {
        if (staticPost) {
            setLoading(false);
            return;
        }

        const fetchDynamic = async () => {
            try {
                const res = await fetch('/api/sync-blog');
                const data = await res.json();
                const found = data.posts?.find((p: any) => {
                    const currentSlug = p.slug || p.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]/g, '');
                    return currentSlug === params.slug;
                });
                if (found) {
                    setDynamicPost(found);
                }
            } catch (err) {
                console.error("Error cargando blog:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDynamic();
    }, [params.slug, staticPost]);

    const post = staticPost || dynamicPost;

    const renderSidebar = () => {
        if (!post) return null;

        const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
        const shareTitle = post.title;

        const shareOnLinkedIn = () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        };

        const shareOnWhatsApp = () => {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
        };

        const shareOnFacebook = () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        };

        const shareOnX = () => {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
        };

        const copyToClipboard = () => {
            navigator.clipboard.writeText(shareUrl);
            alert("¡Enlace copiado al portapapeles!");
        };

        return (
            <aside className="space-y-8">
                <div className="p-6 bg-zolla-soft rounded-2xl border border-zolla-border">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 italic text-center">COMPARTIR ARTÍCULO</h4>
                    <div className="grid grid-cols-5 gap-3">
                        <button 
                            onClick={shareOnLinkedIn}
                            className="p-4 bg-[#0A66C2] rounded-xl text-white hover:bg-[#004182] transition-all shadow-md flex items-center justify-center transform hover:scale-110 active:scale-95"
                            title="LinkedIn"
                        >
                            <LinkedInLogo />
                        </button>
                        <button 
                            onClick={shareOnWhatsApp}
                            className="p-4 bg-[#25D366] rounded-xl text-white hover:bg-[#1aad52] transition-all shadow-md flex items-center justify-center transform hover:scale-110 active:scale-95"
                            title="WhatsApp"
                        >
                            <WhatsAppLogo />
                        </button>
                        <button 
                            onClick={shareOnX}
                            className="p-4 bg-black rounded-xl text-white hover:bg-slate-800 transition-all shadow-md flex items-center justify-center transform hover:scale-110 active:scale-95"
                            title="X (Twitter)"
                        >
                            <XLogo />
                        </button>
                        <button 
                            onClick={shareOnFacebook}
                            className="p-4 bg-[#1877F2] rounded-xl text-white hover:bg-[#0d5fd1] transition-all shadow-md flex items-center justify-center transform hover:scale-110 active:scale-95"
                            title="Facebook"
                        >
                            <FacebookLogo />
                        </button>
                        <button 
                            onClick={copyToClipboard}
                            className="p-4 bg-zolla-primary rounded-xl text-white hover:bg-red-700 transition-all shadow-md flex items-center justify-center transform hover:scale-110 active:scale-95"
                            title="Copiar Enlace"
                        >
                            <Share2 size={28} color="white" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
                <div className="p-6 bg-zolla-dark rounded-2xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                        <Tag className="w-24 h-24" />
                    </div>
                    <h4 className="text-sm font-bold mb-4">¿Necesitas ayuda con este tema?</h4>
                    <p className="text-xs text-white/60 mb-6 font-medium">Agenda una cita con nuestros expertos para un diagnóstico personalizado.</p>
                    <Link href="/#contacto" className="block text-center py-4 bg-zolla-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors shadow-lg relative z-10">
                        CONTACTAR AHORA
                    </Link>
                </div>
            </aside>
        );
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-zolla-primary border-t-transparent rounded-full animate-spin"></div></div>;
    }

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header / Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo.png" alt="ZOLLA Logo" className="h-10 w-auto" />
                    </Link>
                    <Link href="/#blog" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-zolla-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        VOLVER AL BLOG
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 bg-zolla-soft">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-1.5 bg-zolla-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                {post.category || post.theme}
                            </span>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                <Clock className="w-3 h-3" />
                                {post.date}
                            </div>
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl text-slate-900 leading-tight italic">
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl">
                        <img
                            src={post.image || post.selectedImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="grid md:grid-cols-[1fr_250px] gap-12">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <p 
                                className="text-xl text-slate-700 leading-relaxed font-serif italic mb-12 border-l-4 border-zolla-primary pl-8 py-4 bg-zolla-soft/50 rounded-r-2xl"
                                dangerouslySetInnerHTML={{
                                    __html: (post.excerpt || post.content?.substring(0, 200) + "...")
                                        .replace(/\*\*\s*(.*?)\s*\*\*/g, '<strong>$1</strong>')
                                        .replace(/__\s*(.*?)\s*__/g, '<strong>$1</strong>')
                                        .replace(/\*\s*(.*?)\s*\*/g, '<em>$1</em>')
                                        .replace(/_\s*(.*?)\s*_/g, '<em>$1</em>')
                                        .replace(/\n/g, '<br />')
                                }}
                            />

                            {post.content ? (
                                <div
                                    className="space-y-6 text-slate-800 leading-relaxed whitespace-pre-wrap selection:bg-zolla-primary/10 prose-zolla"
                                    dangerouslySetInnerHTML={{
                                        __html: post.content
                                            // Paso 1: Headers
                                            .replace(/### (.*?)\n/g, '<h3 class="text-2xl font-black text-slate-900 pt-8 mb-4 uppercase tracking-tight">$1</h3>')
                                            .replace(/## (.*?)\n/g, '<h2 class="text-3xl font-black text-slate-900 pt-10 mb-6 uppercase tracking-tighter">$1</h2>')
                                            
                                            // Paso 2: Bolding y Negritas (Aseguramos que coincida incluso con espacios o símbolos extra)
                                            .replace(/\*\*\s*(.*?)\s*\*\*/g, '<strong>$1</strong>')
                                            .replace(/__\s*(.*?)\s*__/g, '<strong>$1</strong>')
                                            
                                            // Paso 3: Itálicas
                                            .replace(/\*\s*(.*?)\s*\*/g, '<em>$1</em>')
                                            .replace(/_\s*(.*?)\s*_/g, '<em>$1</em>')
                                            
                                            // Paso 4: Listas
                                            .replace(/^\s*[-*•]\s+(.*?)$/gm, '<li class="ml-6 mb-2 list-disc font-medium">$1</li>')
                                            .replace(/^\s*\d\.\s+(.*?)$/gm, '<li class="ml-6 mb-2 list-decimal font-medium">$1</li>')
                                            
                                            // Paso 5: Separadores y Líneas base
                                            .replace(/---/g, '<hr class="my-12 border-slate-100" />')
                                            .replace(/\n\n/g, '<br /><br />')
                                            .replace(/\n/g, '<br />')
                                    }}
                                />
                            ) : (
                                <div className="space-y-6 text-slate-800 leading-relaxed">
                                    <p>
                                        En este artículo exploramos profundamente los desafíos y oportunidades que presenta {post.title.toLowerCase()}.
                                        Como especialistas en coaching y desarrollo organizacional, entendemos que la teoría solo cobra sentido cuando se aplica en el terreno.
                                    </p>
                                    <p>
                                        Este artículo forma parte de nuestra línea editorial de alto impacto para la gestión de cambio y liderazgo estratégico.
                                    </p>
                                    <h3 className="text-2xl font-bold text-slate-900 pt-8">Puntos Clave:</h3>
                                    <ul className="list-disc pl-6 space-y-3">
                                        <li>Análisis del contexto y tendencias.</li>
                                        <li>Herramientas prácticas para líderes.</li>
                                        <li>Lecciones aprendidas en el terreno.</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {renderSidebar()}
                    </div>
                </div>
            </section>

            {/* Footer Placeholder (since we are on a separate page) */}
            <footer className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
                    <img src="/images/logo.png" alt="ZOLLA Logo" className="h-10 w-auto" />
                    <p className="text-slate-400 text-sm">© 2026 Zolla Coaching & Development.</p>
                </div>
            </footer>
        </main>
    );
}
