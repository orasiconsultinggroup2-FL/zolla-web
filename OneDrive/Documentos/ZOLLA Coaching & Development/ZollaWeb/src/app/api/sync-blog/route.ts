import { NextResponse } from 'next/server';

const KV_URL = process.env.KV_REST_API_URL || "https://genuine-marmot-78615.upstash.io";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || "gQAAAAAATMXAAInDI2NzQ3ZmYzYTkxOTU0OWQ5OTZjYWY3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3Y2I3ZA";

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request: Request) {
    try {
        const newPost = await request.json();
        const slug = newPost.slug || newPost.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]/g, '');
        
        // Inyectar el slug en el objeto si no existe para que se guarde en la DB
        const postToSave = { ...newPost, slug };

        // 1. Guardar con slug unico
        await fetch(`${KV_URL}/set/post:${slug}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${KV_TOKEN}` },
            body: JSON.stringify(postToSave)
        });

        // 2. Agregar a la lista global de slugs para el indice (LPUSH)
        await fetch(`${KV_URL}/lpush/zolla_post_slugs/post:${slug}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });
        
        return NextResponse.json({ success: true, message: 'Fuego! Post sincronizado en Upstash KV' }, { headers: CORS_HEADERS });
    } catch (error: any) {
        console.error("Sync Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: CORS_HEADERS });
    }
}

export async function DELETE(request: Request) {
    try {
        const { slug } = await request.json();
        if (!slug) return NextResponse.json({ success: false, error: 'Slug requerido' }, { status: 400, headers: CORS_HEADERS });

        // 1. Eliminar de la lista de slugs (LREM)
        // LREM key count value (0 para eliminar todas las ocurrencias)
        await fetch(`${KV_URL}/lrem/zolla_post_slugs/0/post:${slug}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });

        // 2. Eliminar el post (DEL)
        await fetch(`${KV_URL}/del/post:${slug}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });

        return NextResponse.json({ success: true, message: 'Post eliminado correctamente' }, { headers: CORS_HEADERS });
    } catch (error: any) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: CORS_HEADERS });
    }
}

export async function GET() {
    try {
        // 1. Obtener slugs (LRANGE)
        const slugsRes = await fetch(`${KV_URL}/lrange/zolla_post_slugs/0/-1`, {
            headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });
        const slugsData = await slugsRes.json();
        const keys = slugsData.result || [];

        if (keys.length === 0) return NextResponse.json({ posts: [] }, { headers: CORS_HEADERS });

        // 2. Obtener cada post (Usando MGET o paralelos)
        const uniqueKeys = Array.from(new Set(keys || [])) as string[];

        const posts = await Promise.all(

            uniqueKeys.map(async (key: string) => {
                const res = await fetch(`${KV_URL}/get/${key}`, {
                    headers: { Authorization: `Bearer ${KV_TOKEN}` }
                });
                const data = await res.json();
                const result = data.result;
                return typeof result === 'string' ? JSON.parse(result) : result;
            })
        );

        // Filtrar nulos y ordenar por fecha (opcional)
        const filteredPosts = posts.filter(p => p !== null);

        return NextResponse.json({ posts: filteredPosts }, { headers: CORS_HEADERS });
    } catch (err: any) {
        console.error("GET Error:", err);
        return NextResponse.json({ error: err.message, posts: [] }, { status: 500, headers: CORS_HEADERS });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: CORS_HEADERS });
}
