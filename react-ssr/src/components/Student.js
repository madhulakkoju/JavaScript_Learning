import React, {Component} from 'react';

export default class Student extends Component {

    constructor(props){
        super(props);
        this.state={
            student : props.studentData.student,
        };
    }

    

    render(){
        
        return (
            <div >
                <h2> {this.state.student.User_Email }</h2>
                <h3> {this.state.student.mobile }</h3>
                <h3> {this.state.student.first_name} </h3>
                <h3> {this.state.student.last_name} </h3>
                <h3> {this.state.student.id}</h3>
                <h3> {this.state.student.department}</h3>
                <h3> {this.state.student.score_gpa}</h3>
                <h3> {this.state.student.fee_amount}</h3>
            </div>
        );
    }

}