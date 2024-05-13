import React, { useState, useEffect } from 'react';

export default function GetChat  (_id)  {
  const url = 'http://localhost:5000/api';
  const [dataChat, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!_id) throw new Error('Bad Request');
        
        const response = await fetch(`${url}/getchat/${_id}`);
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
  }, [_id]);

  return { dataChat, loading, error };
};