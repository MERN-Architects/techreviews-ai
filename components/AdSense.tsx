import React from 'react';

interface AdSenseProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  client,
  slot,
  format,
  responsive,
  style = {}, 
  className = "" 
}) => {
  return (
    <div 
      className={`bg-gray-100 p-4 rounded-lg text-center ${className}`}
      style={style}
    >
      <p className="text-gray-500 text-sm">Advertisement Space</p>
      <p className="text-gray-400 text-xs">Slot ID: {slot}</p>
    </div>
  );
};

export default AdSense; 