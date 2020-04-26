import { useState, useEffect } from 'react';

export default () => {
  const [google, setGoogle] = useState(undefined);
  
  useEffect(()  => {
    const script = document.createElement('script');
    script.onload = () => setGoogle(window.google);
    document.querySelector('head').appendChild(script);
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;
  },[]);
  
  return google;
}
