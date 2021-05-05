import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Student from './Student';

const Students = () => {
    const [studentsData,setStudents] = useState({
        students:[]
    })
    useEffect(()=>{
        axios.get("http://localhost:8080/RestEasyLearning-Project/app/students/")
        .then(response  => {
            console.log(response);
            console.log('Response from main API: ',response);
            console.log(response.data);     
            let allStudents = response.data;
            setStudents({students:allStudents}) 
            console.log(allStudents[0]);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    console.log(studentsData.students);
    
    return ( 
        <div>
            <h1>Students Data</h1>
            <ol>
            <li> {"Data"} </li>
            <li> <Student student = {{name:"sdf",mobile:"54545",email:"sdfsdf@gmail.com"}}/> </li>
            </ol>
        </div>
     );  
}

export default Students;