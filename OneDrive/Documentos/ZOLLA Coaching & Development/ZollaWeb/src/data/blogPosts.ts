export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    slug: string;
    content?: string; // Aquí pueden poner el texto completo del artículo en el futuro
}

export const BLOG_POSTS: BlogPost[] = [
    {
        title: "Dominando el “Sí”: 6 Claves Prácticas del Método Harvard de Negociación",
        excerpt: "En el mundo de los negocios, negociar no es una batalla. Descubre cómo el enfoque de Harvard genera acuerdos sostenibles y de beneficio mutuo.",
        date: "11 de Marzo, 2026",
        category: "Negociación",
        image: "/images/harvard-post.jpg",
        slug: "dominando-el-si-metodo-harvard",
        content: `
En el mundo de los negocios y la gestión de ventas, negociar no es una batalla donde una parte gana y la otra pierde. En entornos empresariales modernos, las negociaciones más exitosas son aquellas que generan acuerdos sostenibles y de beneficio mutuo.

El enfoque desarrollado en el libro **Getting to Yes** de Roger Fisher, William Ury y Bruce Patton, conocido como **Método Harvard de Negociación**, propone precisamente eso: un modelo de negociación basado en intereses, criterios objetivos y construcción de valor entre las partes.

A continuación, seis recomendaciones tácticas que permiten aplicar este enfoque en negociaciones comerciales y empresariales.

### 1. Separa a las personas del problema

Uno de los errores más comunes en negociación es personalizar el conflicto. Cuando entran en juego emociones, egos o tensiones, la discusión se aleja del problema real.

**Principio clave:** La contraparte no es el enemigo. El verdadero desafío es el problema que ambas partes buscan resolver.

**En la práctica:** Utiliza escucha activa y preguntas abiertas.
*Ejemplo:* “Ayúdame a entender qué parte de esta propuesta te genera dudas”. 
Este enfoque permite despersonalizar la conversación y enfocarse en soluciones.

### 2. Enfócate en intereses, no en posiciones

Las posiciones suelen ser rígidas. *(Ejemplo: “Necesito un 10% de descuento”)*. Pero detrás de cada posición existe un interés real. *(Ejemplo: “Necesito mejorar mi flujo de caja este trimestre”)*. Cuando se identifican los intereses subyacentes, aparecen nuevas alternativas de acuerdo.

**En la práctica:** En lugar de preguntar “¿Qué quieres?”, pregunta “¿Para qué lo necesitas?”. Este cambio suele abrir opciones que antes no eran visibles.

### 3. Gestiona las emociones

Muchas negociaciones fracasan no por falta de información, sino por mala gestión emocional. Cuando aumenta la tensión, disminuye la capacidad de análisis y aumentan las posiciones rígidas.

**En la práctica:** Si la otra parte se altera, mantén la calma y escucha. Nombrar la emoción suele reducir la tensión. 
*Ejemplo:* “Veo que este punto es especialmente importante para ustedes”. 
Esto valida la preocupación sin ceder en la negociación.

### 4. Expresa aprecio genuino

El respeto es uno de los recursos más poderosos en negociación. Cuando las personas se sienten valoradas, disminuye la resistencia y aumenta la cooperación.

**En la práctica:** Reconocer el esfuerzo de la otra parte no implica aceptar su posición. 
*Ejemplo:* “Aprecio el tiempo que se han tomado para revisar estas cifras”. 
Este tipo de mensajes facilita un diálogo más constructivo.

### 5. Cuida el “frame” del mensaje

En negociación no solo importa lo que se dice, sino cómo se plantea. Un enfoque confrontacional genera resistencia; un enfoque colaborativo genera soluciones.

**Evita:** “Tu propuesta es inaceptable”.
**Prueba:** “Para que esta propuesta funcione dentro de nuestro presupuesto necesitamos ajustar algunas variables. ¿Cómo podríamos resolverlo?”.
El objetivo es invitar a la construcción conjunta de soluciones.

### 6. Rompe el ciclo acción–reacción

Cuando una parte presiona, la reacción natural suele ser responder con la misma intensidad. Esto genera escalamiento. El Método Harvard propone lo que se conoce como **Jujitsu negociador**.

**En la práctica:** Si recibes un ultimátum, evita responder con otro ultimátum. Formula preguntas y utiliza criterios objetivos (precios de mercado, precedentes contractuales, benchmarks del sector, datos técnicos). Esto traslada la discusión del terreno personal al terreno objetivo.

---

### Por qué este método sigue siendo clave hoy

En entornos de negocios cada vez más complejos, negociar no se trata de “vencer” a la otra parte, sino de alcanzar acuerdos que realmente quieran cumplirse.

¿Quieres llevar tus habilidades al siguiente nivel?
**Podemos ayudarlos, desarrollamos entrenamientos y capacitaciones a la medida.**

En **Zolla Coaching & Development** desarrollamos entrenamientos y capacitaciones a la medida orientados a fortalecer habilidades de negociación, toma de decisiones y gestión de relaciones en entornos empresariales.

Porque negociar bien no es improvisar. Es una competencia que puede entrenarse y perfeccionarse.
`
    }
];
