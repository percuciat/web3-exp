import React, {useEffect} from "react";
import {
  Link,
  useParams
} from "react-router-dom";

const LocationPage = (props) => {
  const params = useParams();
  useEffect(() => {
    console.log("params", params)
  }, [params.linkName]);
  return (
    <h1>Page: {params.namePage}</h1>
  )
};

export default LocationPage;
