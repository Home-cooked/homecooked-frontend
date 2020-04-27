import{ useState, useEffect } from 'react';
import useGoogle from './google-api';

export default () => {
  const google = useGoogle();
  const [geocoder, setGeocoder] = useState(undefined);
  const [autocompleteService, setAutoComplete] = useState(undefined);
  useEffect(() => {
    if(google){
      setGeocoder(new google.maps.Geocoder());
      setAutoComplete(new google.maps.places.AutocompleteService());
    }
  }, [google]);

  return {geocoder, autocompleteService};
}
