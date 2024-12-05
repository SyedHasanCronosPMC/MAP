import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { AddressList } from './components/AddressList';
import { GoogleMap } from './components/GoogleMap';
import { MapPin } from 'lucide-react';

interface Location {
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddLocation = (address: string, position: { lat: number; lng: number }) => {
    const newLocation = { address, position };
    if (!locations.some(loc => loc.address === address)) {
      setLocations(prev => [...prev, newLocation]);
      setError(null);
    }
  };

  const handleRemoveLocation = (index: number) => {
    setLocations(prev => prev.filter((_, i) => i !== index));
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900">Address Mapper</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Search Address</h2>
              <SearchBar 
                onSearch={handleAddLocation}
                onError={handleError}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Saved Addresses</h2>
              <AddressList 
                addresses={locations.map(loc => loc.address)} 
                onRemove={handleRemoveLocation} 
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Map View</h2>
            <GoogleMap locations={locations} onPlaceSelected={handleAddLocation} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;