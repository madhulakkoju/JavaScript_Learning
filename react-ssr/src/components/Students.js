import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Student from './Student';
import ReactDOM from 'react-dom';




const Students = () => {
    const [studentsData,setStudents] = useState({
        students:[]
    })
    useEffect(()=>{
        axios.get("http://localhost:8080/RestEasyLearning-Project/app/students/")
        .then(response  => {
            console.log('Response from main API: ',response);    
            let allStudents = response.data;
            setStudents({students:allStudents}) 
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    
    return ( 
        <div>
            <h3>ALL STUDENTS</h3>
            <table>
                <thead>
                <tr>
                    <td>Student Id</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Student Email</td>
                    <td>Student Mobile</td>
                    <td>Department</td>
                    <td>Date of Birth</td>
                    <td>Admission Date</td>
                    <td>Score</td>
                    <td>Fee</td>
                </tr>
                </thead>
                <tbody>
                {
                    studentsData.students.map((student)=>{
                        return (
                            <tr onClick={()=>{
                                console.log("click");   
                                //document.getElementById('studentDisplay').updateStudent(student);
                                ReactDOM.unmountComponentAtNode(document.getElementById("studentsDetails"));
                                var stt = (<Student studentData={{student}}/>);
                                ReactDOM.render(stt, document.getElementById("studentsDetails"));
                            }} >
                                <td>{student.id}</td>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.User_Email}</td>
                                <td>{student.mobile}</td>
                                <td>{student.department}</td>
                                <td>{(new Date(student.date_birth)).toDateString() }</td>

                                <td>{(new Date(student.date_admission)).toDateString() }</td>
                                <td>{student.score_gpa}</td>
                                <td>{student.fee_Amount}</td>
                                
                                <td> </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
     );  
}

export default Students;