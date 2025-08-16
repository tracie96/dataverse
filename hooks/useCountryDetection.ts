import { useState, useEffect } from 'react';

interface CountryInfo {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  isNigeria: boolean;
}

export const useCountryDetection = () => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try to get country from IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          const isNigeria = data.country_code === 'NG';
          setCountryInfo({
            country: data.country_name || 'Unknown',
            countryCode: data.country_code,
            city: data.city,
            region: data.region,
            isNigeria
          });
        } else {
          // Fallback: assume international user
          setCountryInfo({
            country: 'Unknown',
            countryCode: 'XX',
            isNigeria: false
          });
        }
      } catch (err) {
        console.warn('Could not detect country from IP:', err);
        // Fallback: assume international user
        setCountryInfo({
          country: 'Unknown',
          countryCode: 'XX',
          isNigeria: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  // Manual country override (useful for testing)
  const setManualCountry = (countryCode: string) => {
    const isNigeria = countryCode === 'NG';
    setCountryInfo({
      country: isNigeria ? 'Nigeria' : 'International',
      countryCode,
      isNigeria
    });
  };

  return {
    countryInfo,
    isLoading,
    error,
    setManualCountry
  };
};

