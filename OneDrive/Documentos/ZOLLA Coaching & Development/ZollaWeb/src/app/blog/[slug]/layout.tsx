import { BLOG_POSTS } from "@/data/blogPosts";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug;
    
    // Check inside static posts first
    let post: any = BLOG_POSTS.find((p) => p.slug === slug);

    // If not found statically, check dynamic posts in Upstash KV
    if (!post) {
        try {
            const KV_URL = process.env.KV_REST_API_URL;
            const KV_TOKEN = process.env.KV_REST_API_TOKEN;
            
            if (KV_URL && KV_TOKEN) {
                // Fetch the specific post dynamically using Upstash KV REST API
                const url = `${KV_URL}/get/post:${slug}`;
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${KV_TOKEN}` },
                    cache: 'no-store'
                });
                
                if (res.ok) {
                    const data = await res.json();
                    if (data.result) {
                        post = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
                    }
                }
            }
        } catch (err) {
            console.error("Error fetching dynamic metadata for blog post:", err);
        }
    }

    if (post) {
        const title = post.title || 'ZOLLA Blog';
        const description = post.excerpt || '';
        const image = post.image || post.selectedImage || 'https://www.zolla.com.pe/zolla-share.jpg';
        const finalUrl = `https://www.zolla.com.pe/blog/${slug}`;

        return {
            title: `${title} | ZOLLA`,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: finalUrl,
                siteName: 'ZOLLA Coaching & Development',
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                    }
                ],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
                images: [image],
            }
        };
    }

    return {
        title: "Blog | ZOLLA"
    };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
