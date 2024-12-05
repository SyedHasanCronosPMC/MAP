import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';

interface AddressListProps {
  addresses: string[];
  onRemove: (index: number) => void;
}

export function AddressList({ addresses, onRemove }: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No addresses added yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {addresses.map((address, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span className="text-gray-700">{address}</span>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove address"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}