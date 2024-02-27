import React from 'react';
// import './SchoolCard.css'; // Import CSS file for styling

function SchoolCard({ school }) {
  return (
    <div className="school-card">
      {/* Assuming the school_image property contains the filename of the image */}
      <img src={`http://localhost:8000/api/v1/public/schoolImages/${school.school_image}`} alt={school.school_name} className="school-image" />
      <div className="school-info">
        <h2 className="school-name">{school.school_name}</h2>
        <p className="school-address">{school.school_address}, {school.school_city}</p>
      </div>
    </div>
  );
  
}

export default SchoolCard;
