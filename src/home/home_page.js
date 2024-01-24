import React, { useState, useEffect } from 'react';
import './table.css';
import Cookies from 'js-cookie';
import axios from 'axios';
// import { httpErrorHandler } from './errorhandler.js';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
 

function HomePage() {
  const [students, setStudents] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [deleting, setLoadingDeleting] = useState(false);
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [openDialog, handleDisplay] = React.useState(false);
   const [selectedFile, setSelectedFile] = useState(null);
   const [deletingId, setDeletingId] = useState(null);
  var data = new FormData();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dateOfBirth: '',
    gender: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form Data:', formData);
    // Additional logic can be added, e.g., sending data to a server
    // Reset form data and close the dialog
    setFormData({
      name: '',
      age: '',
      dateOfBirth: '',
      gender: ''
    });
    addStudent();
  };
  const handleClose = () => {
    handleDisplay(false);
  };

  const openDialogBox = () => {
     
    navigate("/addStudent");
    // handleDisplay(true);
  };
  const dialogStyle = {
    padding: "20px",
  };
  const buttonStyle = {
    width: "10rem",
    fontsize: "1.5rem",
    height: "2rem",
    padding: "5px",
    borderRadius: "10px",
    backgroundColor: "green",
    color: "White",
    border: "2px solid yellow",
  };
  async function addStudent() {
    console.log("Selected file is " + selectedFile);
  
    let data = new FormData();
    data.append('student_name', 'Kamal');
    data.append('student_age', '36');
    data.append('date_of_birth', '30/10/2000');  
    data.append('gender', 'male');
    data.append('country', 'india');
    data.append('image', selectedFile);
  
    try {
      const response = await axios({
        url:  'https://fastapi-student-crud.onrender.com/addstudent',
        method: 'post',
        headers: {
          "Content-Type": "multipart/form-data",
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: data,  
      });
  
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (token) {
      getAllStudents();
    }
  }, [token]);

  async function getAllStudents() {
    setLoading(true);
    await axios.get( 'https://fastapi-student-crud.onrender.com/getAllstudents', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (response) {

        setLoading(false);
        setStudents(response.data);
        console.log(response);
      })
      .catch();
  }
  async function deleteStudent({ id }) {
    setDeletingId(id);
    console.log('id is ' + id);
    setLoadingDeleting(true);

    await axios.delete( 'https://fastapi-student-crud.onrender.com/delete?student_id=' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (response) {
        setLoadingDeleting(false);
        getAllStudents();
        console.log(response);
      })


      .catch()


  }
  const handleEdit = (id) => {
    console.log("getallstudent", students);
    console.log(`Editing row with ID ${id}`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  return (
    // isLoading ? (
    //   <div className='loading2'>
    //     <h1>Loading....</h1>
    //   </div>
    // ) : 
    
    (
      <div className='bodyarea'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>CRUD Operations</h1>
          <div>
            <>

              <button style={buttonStyle} onClick={openDialogBox}>
                Add new
              </button>
              <Dialog onClose={handleClose} open={openDialog} PaperProps={{
                style: {
                  minHeight: '60%',
                  maxHeight: '90%', minWidth: '50%'
                }
              }}>
                <DialogTitle>  Student Information </DialogTitle>
                <DialogContent>


                  <div className="dialog-overlay">
                    <div className="dialog-content">
                      <label className="form-label">
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                      </label>
                      <label className="form-label">
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                      </label>
                      <label className="form-label">
                        Date of Birth:
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                      </label>
                      <label className="form-label">
                        Gender:
                        <select name="gender" value={formData.gender} onChange={handleInputChange}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </label>
                      <div>
                        <input type="file" onChange={handleFileChange} />
                        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                      </div>

                    </div>
                  </div>




                </DialogContent>
                <DialogActions>
                  <button onClick={handleSubmit}>Submit</button>
                  <button onClick={handleClose}>Cancel</button>
                </DialogActions>
              </Dialog>
            </>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Age</th>
              <th>Country</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              {/* <th>Image</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(function (row, index) {
              console.log("getallstudent", row);
              return (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.student_name}</td>
                  <td>{row.student_age}</td>
                  <td>{row.country}</td>
                  <td>{row.gender}</td>
                  <td>{row.date_of_birth}</td>
                  <td>
                    <button onClick={() => handleEdit(row.original.id)}>
                      Edit
                    </button>


                    <button
                      className='delete2'
                      onClick={() => deleteStudent({ id: row.id })}

                    >
                      {
                       deleting && deletingId === row.id ? 'Deleting' : 'Delete'
                      
                      
                      }
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    )
  );
}

export default HomePage;
