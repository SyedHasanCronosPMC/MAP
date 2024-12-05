import React from 'react';
import { Map } from 'lucide-react';

export function MapLoadingState() {
  return (
    <div className="w-full h-[600px] bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Map className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
        <p className="text-gray-500">Loading map...</p>
      </div>
    </div>
  );
}