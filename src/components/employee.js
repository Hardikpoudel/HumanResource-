import axios from 'axios';
import React from 'react'
import {Table} from "react-bootstrap";
const Employee = (props) => {
    const{id,name,address,dateOfBirth,gender,email,phoneNumber,educationDetails}=props;
    return (
        <tr>
        <td>{name}</td>
        <td>{address}</td>
        <td>{dateOfBirth}</td>
        <td>{email}</td>
        <td>{phoneNumber}</td>
        </tr>
    )
}

export default Employee
