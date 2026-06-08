import { Injectable } from '@nestjs/common';

@Injectable()
export class GeoService {
  /**
   * Calculate distance between two coordinates using the Haversine formula
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Geocode an address to latitude/longitude coordinates (mock implementation for offline stability)
   */
  async geocodeAddress(address: string, city: string): Promise<{ latitude: number; longitude: number }> {
    // Return mock coordinate based on city name, or Stockholm default
    const lowerCity = city.toLowerCase();
    
    const coordinates: Record<string, { latitude: number; longitude: number }> = {
      'stockholm': { latitude: 59.3293, longitude: 18.0686 },
      'bromma': { latitude: 59.3386, longitude: 17.9413 },
      'solna': { latitude: 59.3601, longitude: 17.9967 },
      'södermalm': { latitude: 59.3142, longitude: 18.0718 },
      'nacka': { latitude: 59.3080, longitude: 18.1633 },
      'täby': { latitude: 59.4439, longitude: 18.0687 },
      'kungsholmen': { latitude: 59.3312, longitude: 18.0264 },
      'vasastan': { latitude: 59.3430, longitude: 18.0473 },
      'göteborg': { latitude: 57.7089, longitude: 11.9746 },
      'malmö': { latitude: 55.6050, longitude: 13.0038 }
    };

    return coordinates[lowerCity] || { latitude: 59.3293, longitude: 18.0686 }; // Default to Stockholm Center
  }
}
