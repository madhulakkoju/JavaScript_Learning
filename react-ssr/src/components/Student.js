import React, {Component} from 'react';

export default class Student extends Component {

    constructor(props){
        super(props);
        this.state={
            student : props.studentData.student,
        };
    }

    

    render(){
        console.log("created");
        return (
            <div >
                {//props.studentData.student.User_Email
                    this.state.student.User_Email
                }
                {
                    this.state.student.mobile
                }
            </div>
        );
    }

}