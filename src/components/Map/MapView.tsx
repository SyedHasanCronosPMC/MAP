import React from 'react';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  locations: Array<{
    address: string;
    position: {
      lat: number;
      lng: number;
    };
  }>;
}

export function MapView({ locations }: MapViewProps) {
  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 max-w-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Mapped Locations</h3>
          <div className="space-y-2">
            {locations.map((location, index) => (
              <div key={index} className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">{location.address}</span>
              </div>
            ))}
            {locations.length === 0 && (
              <p className="text-sm text-gray-500">No locations added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}