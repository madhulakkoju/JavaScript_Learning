import React, { Component } from 'react';
import Students  from './Students';



export default class StudentTab extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    render(){
        console.log(this.state.student);
        return (
            <div  >
                <Students/>
            </div>
        );
    }

}