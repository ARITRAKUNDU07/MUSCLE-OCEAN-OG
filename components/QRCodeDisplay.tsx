"use client";

import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDisplay({ value }: { value: string }) {
  return (
    <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', display: 'inline-block' }}>
      <QRCodeSVG value={value} size={200} />
    </div>
  );
}
