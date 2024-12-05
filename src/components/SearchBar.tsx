import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchPlace } from '../services/placesApi';

interface SearchBarProps {
  onSearch: (address: string, position: { lat: number; lng: number }) => void;
  onError: (error: string) => void;
}

export function SearchBar({ onSearch, onError }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await searchPlace(query.trim());
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        onSearch(
          result.formatted_address,
          result.geometry.location
        );
        setQuery('');
      } else {
        onError('No results found for this address');
      }
    } catch (error) {
      onError('Error searching for address');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an address..."
          disabled={isLoading}
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
        />
        <Search className={`absolute left-3 top-2.5 h-5 w-5 ${isLoading ? 'text-gray-300' : 'text-gray-400'}`} />
      </div>
    </form>
  );
}