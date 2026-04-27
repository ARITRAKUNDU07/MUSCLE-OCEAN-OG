"use client";

import { useSession } from "next-auth/react";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

export default function QRCard() {
  const { data: session } = useSession();
  const qrRef = useRef<HTMLDivElement>(null);

  // Encode email or ID. Fallback to a placeholder.
  const qrValue = session?.user?.email || "UNKNOWN_MEMBER";

  const handleDownload = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Set canvas dimensions with some padding
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `muscleheads-qr-${session?.user?.name || 'member'}.png`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div style={{
      background: '#2a2a2a',
      borderRadius: '12px',
      padding: '30px',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 className="bebas" style={{ margin: 0, marginBottom: '25px', fontSize: '1.8rem', letterSpacing: '1px', color: '#CCFF00', alignSelf: 'flex-start' }}>
        ACCESS PASS
      </h2>
      
      <div 
        ref={qrRef} 
        style={{ 
          background: '#fff', 
          padding: '15px', 
          borderRadius: '12px', 
          display: 'inline-block',
          marginBottom: '15px'
        }}
      >
        <QRCodeSVG 
          value={qrValue} 
          size={200}
          level="H"
          includeMargin={false}
          fgColor="#000000"
          bgColor="#ffffff"
        />
      </div>

      <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '25px', fontWeight: 'bold' }}>
        Show at entrance
      </p>

      <button 
        onClick={handleDownload}
        className="btn btn-primary"
        style={{ 
          width: '100%', 
          padding: '12px', 
          background: '#CCFF00', 
          color: '#000', 
          border: 'none', 
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        Download QR Code
      </button>
    </div>
  );
}
