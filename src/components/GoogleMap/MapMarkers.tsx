import React, { useEffect, useRef } from 'react';

interface MapMarkersProps {
  map: google.maps.Map;
  places: google.maps.places.PlaceResult[];
}

export function MapMarkers({ map, places }: MapMarkersProps) {
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();

    places.forEach((place, index) => {
      if (!place.geometry?.location) return;

      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name,
        animation: google.maps.Animation.DROP,
        label: {
          text: (index + 1).toString(),
          color: '#ffffff',
          fontSize: '14px'
        }
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div class="p-2">
            <h3 class="font-semibold">${place.name || 'Location'}</h3>
            <p class="text-sm">${place.formatted_address || ''}</p>
          </div>
        `);
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    if (markersRef.current.length > 0) {
      map.fitBounds(bounds);
      if (markersRef.current.length === 1) {
        map.setZoom(15); // Closer zoom for single marker
      }
    }

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [map, places]);

  return null;
}