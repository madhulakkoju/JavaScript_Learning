import React, { Component } from 'react';


export default class StudentTab extends Component{
    constructor(props){
        super(props);

        this.state={
            student : props.studentData.student,
        }
    }

    static updateStudent(st){
        this.setState({student:st});
    }

    render(){
        console.log(this.state.student);
        return (
            <div>
                {this.state.student.User_Email}
            </div>
        );
    }

}