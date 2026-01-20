import React from 'react';

const UserManual: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manual de Usuario Operativo</h1>
          <p className="text-text-secondary">Guía detallada de funciones por módulo de ORASI Lab.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section 
            title="1. Panel Principal (Dashboard)"
            icon="dashboard"
            color="text-blue-400"
            content="Es tu centro de mando. Aquí visualizas métricas rápidas (ideas generadas, posts programados), accedes a borradores recientes y tienes un 'Generador Rápido' para ideas espontáneas. Úsalo al iniciar el día para tener un panorama general."
          />

          <Section 
            title="2. Crear Contenido"
            icon="auto_awesome"
            color="text-primary"
            content="El núcleo de la IA. Selecciona una Categoría (ej. Negociación), elige un Título de la lista predefinida, el Formato (Post, Reel, etc.) y la Plataforma. La IA generará el contenido completo. Al finalizar, el botón 'Publicar' enviará el contenido a la red seleccionada. Los temas usados se marcan para evitar repeticiones."
          />
          
          <Section 
            title="3. Laboratorio de Ideas"
            icon="lightbulb"
            color="text-yellow-400"
            content="Espacio para estructurar pensamientos antes de escribir. Utiliza marcos de trabajo (Frameworks) como AIDA o PAS para organizar tus ideas. Ideal para cuando tienes un concepto vago y necesitas darle estructura lógica."
          />

          <Section 
            title="4. Editor de Texto"
            icon="edit_document"
            color="text-green-400"
            content="Procesador de texto avanzado para artículos largos o guiones detallados. En la barra lateral derecha encontrarás herramientas de IA para 'Resumir', 'Expandir' o 'Cambiar el Tono' de fragmentos seleccionados. Todo se guarda automáticamente en borradores."
          />

          <Section 
            title="5. Estudio de Imagen"
            icon="image_edit"
            color="text-purple-400"
            content="Sube una imagen existente y utiliza la caja de texto para pedir modificaciones a la IA (ej. 'Cambiar el fondo a una oficina moderna'). El sistema generará una nueva versión manteniendo la esencia de la original."
          />

          <Section 
            title="6. Aprobaciones"
            icon="fact_check"
            color="text-orange-400"
            content="Flujo de trabajo para equipos. Aquí llegan los contenidos generados que requieren revisión antes de publicarse. Los supervisores pueden 'Aprobar', 'Rechazar' o 'Solicitar Cambios' en los borradores pendientes."
          />

          <Section 
            title="7. Calendario"
            icon="calendar_month"
            color="text-red-400"
            content="Vista mensual y semanal de tus publicaciones. Puedes arrastrar y soltar contenidos para reprogramarlos. Los días con puntos de color indican publicaciones programadas; haz clic para ver los detalles."
          />

          <Section 
            title="8. Analíticas"
            icon="analytics"
            color="text-cyan-400"
            content="Mide el impacto. Revisa gráficos sobre el crecimiento de seguidores, tasa de interacción (engagement) y rendimiento por tipo de contenido. Úsalo para decidir qué temas de negociación están funcionando mejor."
          />

          <Section 
            title="9. Voz de Marca"
            icon="settings"
            color="text-gray-400"
            content="Configuración global de la IA. Define si el tono debe ser 'Corporativo', 'Cercano' o 'Agresivo'. Estos ajustes afectan a cómo la IA redacta en el módulo 'Crear Contenido' y en el Chatbot."
          />
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{title: string, icon: string, content: string, color: string}> = ({title, icon, content, color}) => (
  <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
    <div className="p-4 bg-[#161b22] border-b border-border-dark flex items-center gap-3">
      <span className={`material-symbols-outlined ${color}`}>{icon}</span>
      <h3 className="font-bold text-white">{title}</h3>
    </div>
    <div className="p-6">
      <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
    </div>
  </div>
);

export default UserManual;