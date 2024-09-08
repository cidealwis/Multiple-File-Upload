import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get('http://localhost:5000/api/user/getUser', {
                params: {
                    email: email,
                    nic: nic
                }
            });
            setUserData(response.data.user);
            setError('');
        } catch (err) {
            setUserData(null);
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="user-search">
            <h2>Search User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nic">NIC:</label>
                    <input
                        type="text"
                        id="nic"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Search</button>
            </form>

            {error && <p className="error">{error}</p>}

            {userData && (
                <div className="user-data">
                    <h3>User Details:</h3>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>District:</strong> {userData.district}</p>
                    <p><strong>NIC:</strong> {userData.nic}</p>
                    <p><strong>Age:</strong> {userData.age}</p>
                    <p><strong>Date:</strong> {userData.date}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    console.log(`http://localhost:5000/${userData.image}`)
                    {userData.image && (
                        <img
                            src={`http://localhost:5000/${userData.image}`}
                            
                            alt="User"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                    {userData.cv && (
                        
                        <a
                            href={`http://localhost:5000/${userData.cv}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download CV
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserSearch;
