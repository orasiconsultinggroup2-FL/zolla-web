import React from "react";

// Updated SVG Data URI to reflect the new hierarchical branding
const Logo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgODAiPjx0ZXh0IHg9IjAiIHk9IjI1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIyOCIgZmlsbD0iIzhBzhE4RiI+T1JBU0kgTGFiPC90ZXh0Pjx0ZXh0IHg9IjAiIHk9IjUyIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzAwQTNFMCJ+UExBVEFGT1JNQSBPTkNNPC90ZXh0Pjx0ZXh0IHg9IjAiIHk9Ijc0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwQTNFMCIsb3BhY2l0eT0iMC44Ij5TSU1VTEFET1IgREUgTkVHT0NJQUNJT048L3RleHQ+PC9zdmc+";

const OrasiLabLogo = ({ width = 180 }: { width?: number | string }) => {
  return (
    <img 
      src={Logo} 
      alt="ORASI Lab - PLATAFORMA ONCM - SIMULADOR DE NEGOCIACION" 
      style={{ width: width, height: "auto" }} 
    />
  );
};

export default OrasiLabLogo;