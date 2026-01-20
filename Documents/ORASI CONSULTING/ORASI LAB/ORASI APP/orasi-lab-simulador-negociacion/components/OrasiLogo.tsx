import React from "react";

const OrasiLogo: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <svg
        width={36}
        height={36}
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="orasiGradient" cx="30%" cy="20%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
            <stop offset="45%" stopColor="#8a8d8f" />
            <stop offset="100%" stopColor="#00a3e0" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#orasiGradient)" />
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1,
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 16, color: "#8a8d8f" }}>ORASI Lab</span>
        <span style={{ fontSize: 9, fontWeight: 800, color: "#00a3e0", textTransform: "uppercase", marginTop: 1 }}>
          PLATAFORMA ONCM
        </span>
        <span style={{ fontSize: 8, fontWeight: 700, color: "#00a3e0", textTransform: "uppercase", opacity: 0.8 }}>
          SIMULADOR DE NEGOCIACION
        </span>
      </div>
    </div>
  );
};

export default OrasiLogo;