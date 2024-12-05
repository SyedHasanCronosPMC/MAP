import axios from 'axios';
import { API_CONFIG } from '../config/api';

interface GeocodeResponse {
  results: Array<{
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
  status: string;
}

export async function searchPlace(address: string): Promise<GeocodeResponse> {
  const encodedAddress = encodeURIComponent(address);
  
  try {
    const response = await axios.get('https://google-map-places.p.rapidapi.com/maps/api/geocode/json', {
      params: {
        address: encodedAddress,
        language: 'en',
        region: 'en'
      },
      headers: {
        'x-rapidapi-key': API_CONFIG.rapidApi.key,
        'x-rapidapi-host': API_CONFIG.rapidApi.host
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching place data:', error);
    throw error;
  }
}