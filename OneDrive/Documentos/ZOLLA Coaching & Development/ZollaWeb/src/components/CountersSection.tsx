'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Clock3, Users2 } from 'lucide-react';

interface Counter {
    value: number;
    label: string;
    description: string;
    icon: React.ReactNode;
}

function AnimatedCounter({ target }: { target: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, 30);
                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return <div ref={ref}>{count.toLocaleString()}</div>;
}

export default function CountersSection() {
    const counters: Counter[] = [
        {
            value: 50,
            label: 'Organizaciones atendidas',
            description: 'Empresas de minería, pesca, agroindustria y construcción en Perú',
            icon: <Building2 className="w-8 h-8" />
        },
        {
            value: 30,
            label: 'Años en campo',
            description: 'De experiencia directa transformando líderes en operaciones reales',
            icon: <Clock3 className="w-8 h-8" />
        },
        {
            value: 6000,
            label: 'Líderes de equipo impactados',
            description: 'Jefes y supervisores que cambiaron su forma de liderar',
            icon: <Users2 className="w-8 h-8" />
        }
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-zolla-primary rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zolla-primary rounded-full filter blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-block px-4 py-1 rounded-full border border-zolla-primary/30 text-zolla-primary text-xs tracking-widest uppercase mb-6">
                        IMPACTO REAL
                    </div>
                    <h2 className="font-serif text-5xl md:text-6xl italic text-white mb-6">
                        Números que hablan por sí solos
                    </h2>
                    <div className="h-1 w-12 bg-zolla-primary mx-auto" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {counters.map((counter, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-zolla-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative p-12 rounded-3xl border border-zolla-primary/20 bg-white/[0.02] backdrop-blur-md hover:border-zolla-primary/50 transition-all duration-500">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-zolla-primary/10 flex items-center justify-center text-zolla-primary mb-8 group-hover:scale-110 group-hover:bg-zolla-primary/20 transition-all duration-500">
                                        {counter.icon}
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-6xl md:text-7xl font-bold text-zolla-primary font-sans tracking-tighter">
                                            +<AnimatedCounter target={counter.value} />
                                        </div>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 uppercase tracking-wide">
                                        {counter.label}
                                    </h3>

                                    <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                        {counter.description}
                                    </p>

                                    <div className="mt-8 h-0.5 w-8 bg-zolla-primary/40 group-hover:bg-zolla-primary/80 transition-all duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}