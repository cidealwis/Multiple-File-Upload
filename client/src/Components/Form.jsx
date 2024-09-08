import React, { useState } from 'react';
import axios from 'axios';

function Form() {
    const [formData, setFormData] = useState({
      name: '',
      district: 'colombo',  
      nic: '',
      age: '',
      email: '',
      image: null,
      cv: null,
      isVerified: false
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      
      if (type === 'checkbox') {
        setFormData({ ...formData, [name]: checked });
      } else if (type === 'file') {
        setFormData({ ...formData, [name]: files[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('district', formData.district);
      formDataToSend.append('nic', formData.nic);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('cv', formData.cv);
      formDataToSend.append('isVerified', formData.isVerified);
  
      try {
        const response = await axios.post('http://localhost:5000/api/user/create', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        // handle success (e.g., show a success message, reset the form, etc.)
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        // handle error (e.g., show an error message)
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input type="text" name="name" placeholder="Enter the Name" value={formData.name} onChange={handleChange} />
        <br/>
        <label>District:</label>
        <select name="district" value={formData.district} onChange={handleChange}>
          <option value="colombo">Colombo</option>
          <option value="kaluthara">Kaluthara</option>
          <option value="gampaha">Gampaha</option>
        </select>
        <br/>
        <label>NIC:</label>
        <input type="text" name="nic" placeholder="Enter the NIC" value={formData.nic} onChange={handleChange}/>
        <br/>
        <label>Age:</label>
        <input type="date" name="age" placeholder="Select date" value={formData.age} onChange={handleChange}/>
        <br/>
        <label>Email:</label>
        <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>
        <br/>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleChange}/>
        <br/>
        <label>CV:</label>
        <input type="file" name="cv" onChange={handleChange}/>
        <br/>
        <label>Is Verified:</label>
        <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleChange}/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
  
  export default Form;
  