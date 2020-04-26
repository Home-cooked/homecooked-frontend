import { useState, useEffect } from 'react';
import useGoogle from './google-api';

export default () => {
  const google = useGoogle();
  const [places, setPlaces] = useState(undefined);
  useEffect(() => {
    if(google){
      setPlaces(new google.maps.places.AutocompleteService());
    }
  }, [google]);
  
  return places;
}
