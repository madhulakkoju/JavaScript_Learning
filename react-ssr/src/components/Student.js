import React, { Component } from 'react';

export default class Student extends React.PureComponent{
    
    constructor(props){
        super(props);

        this.state = {
            name: props.name,
            email: props.email,
            mobile: props.mobile
        }
    }

    render(){
        console.log(this.state.email,this.state.name, this.state.mobile);
        return (
        <div id = {this.state.email}>
            this.state.name
            this.state.mobile
            this.state.email
        </div>);
    }

}