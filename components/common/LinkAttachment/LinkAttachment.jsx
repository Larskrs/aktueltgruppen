import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkAttachment = ({ url }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTitle = async () => {
        const apiUrl = 'http://localhost/api/url'; // Change to https if using HTTPS
        const targetUrl = url; // URL whose title you want to fetch
      
        try {
          const response = await axios.get(apiUrl, { params: { url: targetUrl } });
          console.log('Title:', response.data.title);
          setTitle(response.data.title)
          console.log('Description:', response.data.description);
          console.log('Icon:', response.data.icon);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };

    if (url) {
      fetchTitle();
    }

    return () => {
      // Clean up
    };
  }, [url]);

  return <span>{title}</span>;
};

export default LinkAttachment;
