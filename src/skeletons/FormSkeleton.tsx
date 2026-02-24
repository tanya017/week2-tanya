// FILE: src/skeletons/FormSkeleton.tsx
// PURPOSE: Show a fake trade form while TradeFeature is loading.
// No props needed — the TradeForm is always the same shape.
 
import React from 'react';
 
const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '400px 100%',
  animation: 'shimmer 1.4s ease-in-out infinite',
  borderRadius: 4,
};
 
const FormSkeleton: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 400 }}>
 
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>
 
      {/* Title bar — where 'Place a Trade' heading would appear */}
      <div style={{ ...shimmerStyle, height: 22, width: '40%' }} />
 
      {/* Stock selector dropdown — taller because dropdowns have more padding */}
      <div style={{ ...shimmerStyle, height: 36, width: '100%', borderRadius: 6 }} />
 
      {/* BUY / SELL buttons — side by side, same layout as the real form */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ ...shimmerStyle, height: 34, width: 80, borderRadius: 6 }} />
        <div style={{ ...shimmerStyle, height: 34, width: 80, borderRadius: 6 }} />
      </div>
 
      {/* Quantity input */}
      <div style={{ ...shimmerStyle, height: 36, width: '100%', borderRadius: 6 }} />
 
      {/* Price summary line */}
      <div style={{ ...shimmerStyle, height: 16, width: '70%' }} />
 
      {/* Submit button */}
      <div style={{ ...shimmerStyle, height: 38, width: '100%', borderRadius: 6 }} />
 
    </div>
  );
};
 
export default FormSkeleton;
