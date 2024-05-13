import React, { useState, useEffect } from 'react';

export default function SendUrl  (urlSummary)  {
  const url = 'http://localhost:5000/api';
  const [dataSummary, setData] = useState(null);
  const [error, setError] = useState(null);
  const [previus , setPrevius] = useState(null);
  useEffect(() => {
    setData([])
    const fetchData = async () => {
      try {
        if(!urlSummary || urlSummary === 'getchat'|| urlSummary === previus ) throw new Error('Dont value in sendurl');
        setPrevius(urlSummary)
        const response = await fetch(`${url}/sendurl`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: urlSummary,
          })
        });

        if (!response.ok) {
          throw new Error('Error in send url');
        } else {
          const responseData = await response.json();
          setData(responseData);
        }

      } catch (error) {
        setError(error);
      } 
    };

    fetchData();
  }, [previus]);

  return { dataSummary, error };
};