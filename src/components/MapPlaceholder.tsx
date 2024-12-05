import React from 'react';
import { Map } from 'lucide-react';

export function MapPlaceholder() {
  return (
    <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300">
      <Map className="h-16 w-16 text-gray-400 mb-4" />
      <p className="text-gray-500 text-center">
        Map placeholder
        <br />
        <span className="text-sm">
          (Integration with actual map service would go here)
        </span>
      </p>
    </div>
  );
}