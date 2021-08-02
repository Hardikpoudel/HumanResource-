import React, { useState } from "react";
import { Form, Button, Col} from "react-bootstrap";
import axios from "axios";
//using useHistory hook for going back to URL
import {useHistory} from 'react-router-dom';
import validator from "validator";

const AddEmployee = () => {

  const [field, setField] = useState({
    name: "",
    address: "",
    email:"",
    dateOfBirth:"",
    phoneNumber:"",
    gender:"",
    validateEmail:""
  });

  const validateEmail = ({target}) => {
    var email = target.value
  
    if (validator.isEmail(email)) {
    setField({validateEmail:''})
    } else {
    setField({validateEmail:'Enter valid Email!'})
    }
  }
  const history=useHistory();

  const postField=()=>{
    if(field.name===""||field.address===""||field.email===""||field.phoneNumber===""){
      alert("fields are left empty, the datais not submitted")
      return;
    }
    let employee={
      name:field.name,
      address:field.address,
      phoneNumber:field.phoneNumber,
      email:field.email,
      gender:field.gender,
      dateOfBirth:field.dateOfBirth,
    }
  
    //making a post request to the  provided api
    axios.post(`http://173.249.45.237:8081/hrs/employee/save`,employee)
    .then((res)=>{
      if(res.status===200){
        alert("Employee added successfully")
        history.push("/");
      }
    })
    .catch((error)=>{
      alert(error)
    })
  }
  const handleEvent = ({ target }) => {
    // console.log(target.value);

    //get the input field name and value
    const names = target.name;
    const value = target.value;

    // console.log(names)
    //setting name based on the user input field
    setField({...field,[`${target.name}`]:value})
  
    // setName((prev) => {
    //   if (names === "fullName") {
    //     return {
    //       name: value,
    //       address: prev.address,
    //     };
    //   } else if (names === "Address") {
    //     return {
    //       name: prev.name,
    //       address: value,
    //     };
    //   }
    // });
    // console.log(name);

  };

  return (
    <Form style={{ padding: 30, paddingTop: 10 }}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Name"
            name="name"
            onChange={handleEvent}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" placeholder="1234 Main St" onChange={handleEvent} required/>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Date Of Birth</Form.Label>
          <input
            type="date"
            min="1899-01-01"
            max="2021-01-01"
            onChange={handleEvent}
            name="dateOfBirth"
          ></input>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Gender</Form.Label>
          <span style={{ paddingLeft: 15 }}>
            <input type="radio" id="male" onChange={handleEvent} name="gender" value="Male" />
            <label for="male">Male</label>
            <input type="radio" id="female" onChange={handleEvent} name="gender" value="Female" />
            <label for="female">Female</label>
            <input type="radio" id="other" onChange={handleEvent} name="gender" value="Other" />
          </span>
          <label for="other">Other</label>
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="example@gmail.com" name="email" onChange={({target})=>{handleEvent({target});validateEmail({target})}}/>
        <div style={{color:"red",fontWeight:"bold"}}>{field.validateEmail}</div>
      </Form.Group>

      <Form.Group controlId="formGridPhone">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control type="number" placeholder="Number" name="phoneNumber" onChange={handleEvent}/>
      </Form.Group>
        <Button variant="primary" onClick={postField}>
          Submit
        </Button>
    </Form>
  );
};

export default AddEmployee;
