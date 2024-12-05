import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  onPlaceSelected: (address: string) => void;
}

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

export function GoogleMap({ onPlaceSelected }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (mapRef.current && searchBoxRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 40.749933, lng: -73.98633 },
          zoom: 13,
          mapTypeControl: false,
        });

        setMapInstance(map);

        const card = document.createElement('div');
        card.className = 'pac-card';

        const input = document.createElement('input');
        input.className = 'w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200';
        input.placeholder = 'Search for a place';
        card.appendChild(input);

        searchBoxRef.current.appendChild(card);

        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

        map.addListener('bounds_changed', () => {
          searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });

        let markers: google.maps.Marker[] = [];

        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();

          if (!places || places.length === 0) {
            return;
          }

          // Clear existing markers
          markers.forEach(marker => marker.setMap(null));
          markers = [];

          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (!place.geometry || !place.geometry.location) {
              console.log('Returned place contains no geometry');
              return;
            }

            // Create a marker for the place
            const marker = new google.maps.Marker({
              map,
              position: place.geometry.location,
              title: place.name
            });

            markers.push(marker);

            if (place.formatted_address) {
              onPlaceSelected(place.formatted_address);
            }

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });

          map.fitBounds(bounds);
        });
      }
    });
  }, [onPlaceSelected]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <div ref={searchBoxRef} className="absolute top-4 left-4 z-10 w-96 max-w-[calc(100%-2rem)]" />
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}