import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DALLE = () => {
  const [ufoReports, setUfoReports] = useState([]);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dalleKey = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;
console.log(dalleKey)

  useEffect(() => {
    // Fetch UFO reports here from your UFO API.
    const fetchUfoReports = async () => {
      setIsLoading(true);
      try {
        const apiKey = '90d9cad4aemsh0c2ae781060c8c2p1a0ee0jsna36176967a11'; // Replace with your UFO API key
        const apiUrl = 'https://ufo-aficionado-api.p.rapidapi.com/ufos';
        const response = await axios.get(apiUrl, {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'ufo-aficionado-api.p.rapidapi.com',
          },
        });
        setUfoReports(response.data); // Assuming the response is an array of UFO reports
      } catch (error) {
        console.error('Error fetching UFO reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUfoReports();
  }, []);

  const generateTextAndImages = async () => {
    setIsLoading(true);
    try {
      const apiKey = dalleKey;
      const apiUrl = 'https://api.openai.com/v1/dalle/generate';
      const images = [];
  
      for (const report of ufoReports) {
        console.log('Generating image for report:', report.summary);
        const response = await axios.post(
          apiUrl,
          {
            prompt: report.summary,
            n: 1,
            response_format: 'url',
            size: '1024x1024',
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );
  
        const imageData = response.data.data[0];
        images.push(imageData.url);
      }
  
      setGeneratedImages(images);
    } catch (error) {
      console.error('Error generating text and images:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <h1>DALL·E UFO Report Image Generator</h1>
      <button onClick={generateTextAndImages} disabled={isLoading}>
  Generate Text and Images from UFO Reports
</button>
      {isLoading && <p>Generating images...</p>}
      {generatedImages.length > 0 && (
        <div>
          <h2>Generated Images:</h2>
          {generatedImages.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Generated ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DALLE;
