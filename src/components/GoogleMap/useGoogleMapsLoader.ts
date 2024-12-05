import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MAPS_CONFIG } from '../../config/maps';

export function useGoogleMapsLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!MAPS_CONFIG.apiKey) {
      setError(new Error('Google Maps API key is not configured'));
      return;
    }

    const loader = new Loader({
      apiKey: MAPS_CONFIG.apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load()
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err));
  }, []);

  return { isLoaded, error };
}