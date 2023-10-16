import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffleArray } from '../utils/ShuffleArray';
import ufo from './assets/ufo.jpg'


function UFOReport({ report }) {
    return (
      <div className="mt-1 justify-items-center ">

        <div className='border border-gray-800'/>
        <div className='flex items-center justify-center'> 
    <img className='mt-2 h-3 w-4' src={ufo} alt="ufo"/>
  </div>
   
        <h3 className='bg-slate-200 p-2 font-mono mb-1 rounded-md'>{report.summary}</h3>
        <p className='bg-stone-100 p-1 mt-2 mb-4 rounded-md '>{report.city}, {report.state}</p>
        <p className='bg-stone-200 p-1 mt-2 mb-4 rounded-md '>
  {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
</p>
        <p className='bg-stone-300 p-1 mt-2 mb-4 rounded-md '>{report.shape}</p>
        <a className='bg-blue-300 font-mono p-1  rounded-md' href={report.link} target="_blank" rel="noopener noreferrer">
          Read Full Report
        </a>
       
      </div>
    );
  }

function UFOReportsSearch() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const fetchData = () => {
    setIsLoading(true);
    axios
      .get('https://ufo-aficionado-api.p.rapidapi.com/ufos', {
        headers: {
          'X-RapidAPI-Key': '90d9cad4aemsh0c2ae781060c8c2p1a0ee0jsna36176967a11',
          'X-RapidAPI-Host': 'ufo-aficionado-api.p.rapidapi.com',
        },
      })
      .then((response) => {
        const shuffledData = shuffleArray(response.data);
        const first10RandomData = shuffledData.slice(0, 10);
        setData(response.data);
        setRandomData(first10RandomData);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          // Handle rate limit exceeded error here.
          console.error('Rate limit exceeded. Please try again later.');
        } else {
          console.error('Error fetching data:', error);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts.
  }, []);

  useEffect(() => {
    const filtered = data.filter((report) =>
      report.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  return (
    <div className='flex-col space-y-2 items-center'>
   
      <button className='rounded bg-red-200 hover:bg-red-600 text-mono p-2 m-1 ' onClick={fetchData} disabled={isLoading}>
       <span className='text-xs'>tap here for </span> 
       <h1 className='font-bold tracking-widest'>sightings</h1>
      </button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && filteredData.map((report) => (
        <UFOReport key={report._id} report={report} />
      ))}

      {!isLoading && randomData.map((report) => (
        <UFOReport key={report._id} report={report} />
      ))}
    </div>
  );
}

export default UFOReportsSearch;