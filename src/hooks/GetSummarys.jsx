import React, { useState, useEffect } from 'react';

export default function GetSummarys  ()  {
  const url = 'http://localhost:5000/api';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/listsummary`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, [url]);

  return { data, loading, error };
};