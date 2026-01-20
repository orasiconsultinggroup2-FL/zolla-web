import React from 'react';

const Repurpose: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto">
      <div className="w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-[#92a4c9] hover:text-primary font-medium transition-colors">Projects</span>
          <span className="text-[#586e96]">/</span>
          <span className="text-white font-medium">Blog Post Analysis</span>
        </nav>
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Reutilización de Contenido</h1>
            <p className="text-[#92a4c9] text-base max-w-2xl">Transforme su artículo principal en múltiples activos digitales con IA.</p>
          </div>
        </div>
        <div className="@container">
          <div className="relative bg-card-dark rounded-xl border border-slate-700 shadow-sm overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex flex-col lg:flex-row items-stretch">
              <div className="w-full lg:w-1/3 min-h-[240px] bg-center bg-cover bg-no-repeat relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeoGNDwT9cb8xUoUMlIsJZQ0QR0lXd60NGa8ijyUW5LPhVIzDG0sgbt428cz_cuz68amI-ow1CryaIp3mQviLuLhfzxNjyrhd6FvKOaZSRZxnvvDnPG2waSB_6YjNhA_sYeEcDFeQa2IDzd9zcCpaHG29y4Qwqn22NFXywmmrlPFzaIBwJnaW4xc8cpRmHztX_GWWDVI35xP73eNY5atugp2KCosKftqeUeZ_aDc2_6zyNlg811jyfXJE4zXROJ6L4kc8DVOJrwUzg")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 rounded bg-black/50 text-white text-xs font-bold backdrop-blur-md border border-white/10">SOURCE MATERIAL</span>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight">The Future of AI in Design</h2>
                  <p className="text-[#92a4c9] leading-relaxed line-clamp-3">AI is rapidly changing the landscape of creative work...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repurpose;