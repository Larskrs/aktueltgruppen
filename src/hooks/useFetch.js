import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData(endpoint)
  }, [endpoint])

  const options = (endpoint) => { return {
    method: "GET",
    url: `${endpoint}`,
    headers: {
      "Access-Control-Allow-Origin": "true"
    },
    params: {},
  }
  };

  const fetchData = async (endpoint) => {
    setIsLoading(true);
    try {
      const response = await axios.request(options(endpoint));
      setData(response.data);
      
    } catch (error) {
      setError(error);
      console.error(options.url)
      console.error(error)  
      setIsLoading(false)    
    } finally {
      setIsLoading(false);
      // console.dir(data)
    }
  };

  const refetch = () => {
    fetchData();
  };
  const fetch = (endpoint) => {
    fetchData(endpoint)
  }

  return { data, isLoading, error, refetch, fetch };
};

export default useFetch;