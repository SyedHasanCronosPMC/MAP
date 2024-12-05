import React, { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  map: google.maps.Map;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

export function SearchBox({ map, onPlaceSelected }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const searchBox = new google.maps.places.SearchBox(inputRef.current);
    
    const boundsListener = map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    const placesListener = searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        onPlaceSelected(places[0]);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    });

    return () => {
      google.maps.event.removeListener(boundsListener);
      google.maps.event.removeListener(placesListener);
    };
  }, [map, onPlaceSelected]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a place"
        className="w-full px-4 py-2 pl-10 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}