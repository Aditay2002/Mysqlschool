import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './addSchool.css';

function AddSchool() {
  const [formData, setFormData] = useState({
    school_name: '',
    school_address: '',
    school_city: '',
    school_state: '',
    school_contact_no: '',
    school_email_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/connect', formData);
      console.log(response.data);
      alert('Form submitted successfully');
      setFormData({
        school_name: '',
        school_address: '',
        school_city: '',
        school_state: '',
        school_contact_no: '',
        school_email_id: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const handleImageChange =  (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photos', file);

    axios.post('/api/v1/upload', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(response => {
      console.log(response.data);
      // alert('Image uploaded successfully');
      setFormData(prevFormData => ({
        ...prevFormData,
        school_image: response.data.filename
      }));
    }).catch(error => {
      console.error('Error uploading image:', error);
      throw error;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h2><Link to='/schools'>All Schools</Link></h2>
      <h2>School Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="school_name" value={formData.school_name} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="school_address" value={formData.school_address} onChange={handleChange} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="school_city" value={formData.school_city} onChange={handleChange} />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="school_state" value={formData.school_state} onChange={handleChange} />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" name="school_contact_no" value={formData.school_contact_no} onChange={handleChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Email ID:</label>
          <input type="text" name="school_email_id" value={formData.school_email_id} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div> 
  );
}

export default AddSchool;


