import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, useLocalApi) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint, useLocalApi]);

  const options = (endpoint) => {
    const baseUrl = useLocalApi ? window.location.origin : "";
    const options = {
      method: "GET",
      url: `${baseUrl}${endpoint}`,
      headers: {
        "Access-Control-Allow-Origin": "true"
      },
      params: {},
    };
    console.log(options);
    return options
  };

  const fetchData = async (endpoint) => {
    setIsLoading(true);
    try {
      const response = await axios.request(options(endpoint));
      setData(response.data);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  const fetch = (endpoint) => {
    fetchData(endpoint);
  };

  return { data, isLoading, error, refetch, fetch };
};

export default useFetch;
