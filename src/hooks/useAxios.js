import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://simone-bookee-assignment.netlify.app/";

export default function (request) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(request);
        setResponse(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
    fetchData();
  }, [request]);

  return { response, error, loading };
}