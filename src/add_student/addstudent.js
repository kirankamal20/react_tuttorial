import React, { useMemo, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './add_students.css';
 
import {
    Link,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';
function AddStudents() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const validateForm = () => {
        if (!formData.name || !formData.age || !formData.dateOfBirth || !formData.gender || !selectedFile) {
            alert('Please fill in all fields and select an image.');
            return false;
        }

        setValidationError(null);
        return true;
    };

    const token = Cookies.get('token');

    async function addStudent() {
        if (!validateForm()) {
            return;
        }

        let data = new FormData();
        data.append('student_name', formData.name);
        data.append('student_age', formData.age);
        data.append('date_of_birth', formData.dateOfBirth);
        data.append('gender', formData.gender);
        data.append('country', 'india');
        data.append('image', selectedFile);

        try {
            setLoading(true);
            const response = await axios({
                url:'https://fastapi-student-crud.onrender.com/addstudent',
                method: 'post',
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                data: data,
            });
            setLoading(false);
            navigate(-1)
            console.log(response);
        } catch (error) {
            setLoading(false);
            alert('Error: ' + error.message);
            console.log(error);
        }
    }

    return (
        <div className='card-section'

            style={{
                backgroundImage: 'url(images/background.jpg)',
                backgroundPosition: 'center',
               backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
                // width: '100vw',
                // height: '100vh',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center', 
            }}


        >
            <div className='card'>
                <div className='heading'>Add Student</div>

                <input
                    className="user-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <input
                    className='age-field'
                    type="number"
                    placeholder="Enter your Age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                />

                <input
                    className='date-of-birth-field'
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                />

                <select
                    className='gender-field'
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <div>
                    <input
                        className='image-section'
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                {validationError && (
                    <div className="validation-error">{validationError}</div>
                )}

                <button className='submit-button' onClick={addStudent}>
                    {loading ? 'Loading ...' : 'Add Student'}
                </button>
            </div>
        </div>
    );
}

export default AddStudents;
