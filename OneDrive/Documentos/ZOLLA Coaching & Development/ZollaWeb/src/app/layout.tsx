import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const ebGaramond = EB_Garamond({
    subsets: ["latin"],
    variable: "--font-serif",
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: "ZOLLA | Coaching & Development",
    description: "Transformamos organizaciones desde dentro. Liderazgo fuerte, cambio real y acuerdos que duran.",
    keywords: ["Coaching", "Desarrollo Organizacional", "Liderazgo", "Negociación", "Vocería", "ZOLLA"],
    authors: [{ name: "Fernando Pérez Román" }],
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${inter.variable} ${ebGaramond.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
