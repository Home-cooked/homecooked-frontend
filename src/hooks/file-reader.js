import { useEffect, useState } from "react";

export default ({ method = "readAsDataURL", onload = () => {} } = {}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      if (!file) return;
      const reader = new FileReader(file);
      reader.onError = e => setError(e);
      reader.onloadstart = () => setLoading(true);
      reader.onloadend = () => setLoading(false);
      reader.onload = ({ target: { result } }) => {
        setResult(result);
        onload(result);
      };
      try {
        reader[method](file);
      } catch (e) {
        setError(e);
      }
    },
    [file]
  );

  return [{ result, error, file, loading }, setFile];
};
