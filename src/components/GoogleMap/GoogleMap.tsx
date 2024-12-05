import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapLoadingState } from './MapLoadingState';
import { MAPS_CONFIG } from '../../config/maps';
import { SearchBox } from './SearchBox';
import { MapMarkers } from './MapMarkers';

interface Location {
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface GoogleMapProps {
  locations: Location[];
  onPlaceSelected: (address: string, position: { lat: number; lng: number }) => void;
}

export function GoogleMap({ locations, onPlaceSelected }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new Loader({
      apiKey: MAPS_CONFIG.apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: MAPS_CONFIG.defaultCenter,
          zoom: MAPS_CONFIG.defaultZoom,
          mapTypeControl: false,
          styles: MAPS_CONFIG.mapStyles,
        });
        setMap(mapInstance);
        setLoading(false);
      }
    }).catch(error => {
      console.error('Error loading Google Maps:', error);
      setLoading(false);
    });
  }, []);

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location && place.formatted_address) {
      onPlaceSelected(
        place.formatted_address,
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      );
    }
  };

  if (loading) {
    return <MapLoadingState />;
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {map && (
        <>
          <div className="absolute top-4 left-4 z-10 w-96 max-w-[calc(100%-2rem)]">
            <SearchBox map={map} onPlaceSelected={handlePlaceSelected} />
          </div>
          <MapMarkers 
            map={map} 
            places={locations.map(loc => ({
              geometry: { 
                location: new google.maps.LatLng(loc.position.lat, loc.position.lng) 
              },
              formatted_address: loc.address,
              name: loc.address
            } as google.maps.places.PlaceResult))} 
          />
        </>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}