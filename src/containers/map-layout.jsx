import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import ContentPage from "../components/content-page";
import MapIcon from "../components/map-icon";
import { aFetch } from "../hooks/auth-user";

export default () => {
  const [centerCoords, setCenterCoords] = useState(undefined);
  const [hostPosts, setHostPosts] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCenterCoords([latitude, longitude]),
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch(
          `/api/host-post/map/${centerCoords[0]}/${centerCoords[1]}`
        );
        setHostPosts(data);
      };
      if (centerCoords) {
        req();
      }
    },
    [centerCoords]
  );

  return (
    <ContentPage>
      <div style={{ height: "50vh", width: "50vw", display: "inline-block" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
          defaultCenter={[31.8204314, -95.7952901]}
          center={centerCoords}
          defaultZoom={12}
        >
          {hostPosts.map(post => <MapIcon key={post.id} {...post} />)}
        </GoogleMapReact>
      </div>
    </ContentPage>
  );
};
