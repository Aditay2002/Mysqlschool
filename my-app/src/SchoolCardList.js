import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SchoolCard from './SchoolCard'; // Assuming SchoolCard component is in the same directory
// import './SchoolCardList.css'; // Import CSS file for styling

function SchoolList() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/v1/schools');
        setSchools(response.data); // Update schools state with the fetched data
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="school-list">
  <div className="school-grid">
    {schools.map((school) => (
      <SchoolCard key={school.school_id} school={school} />
    ))}
  </div>
</div>
  );
}

export default SchoolList;


