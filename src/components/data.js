import React, { useState, useEffect } from "react";
import axios from "axios";
import Employee from "./employee";
import { Table, Button } from "react-bootstrap";
import AlertDialogSlide from './popup';

const Data = () => {
  const [employee, setEmployee] = useState([]);
  const [searchTerm,setSearchTerm]=useState("")
  const [sortedField, setSortedField] = useState(null);

  const getEmployee = () => {
    console.log("the data is refreshed")
    axios
      .get("http://173.249.45.237:8081/hrs/employee")
      .then((res) => {
        //     console.log(res.data);
        // console.log(res.data.list[1]);
        setEmployee(res.data.list);
      }) //loggin the error
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    getEmployee()
  },[])
  return (
    <>
      <h2>Employees Count {employee.length}
      <Button variant="primary" onClick={getEmployee} style={{margin:20,marginTop:0}}>
        getData
      </Button>
      <input placeholder="search..." onChange={({target})=>{
        setSearchTerm(target.value)
      }}/>
      </h2>
     {" "}
      <Table striped bordered hover style={{ marginRight: 20, marginLeft: 10 }}>
        <thead>
          <tr>
            <th><button type="button" onClick={() => setSortedField('name')}>Name</button></th>
            <th><button type="button" onClick={() => setSortedField('address')}>Address</button></th>
            <th>Date Of Birth</th>
            <th><button type="button" onClick={() => setSortedField('email')}>Email</button></th>
            <th><button type="button" onClick={() => setSortedField('phone')}>Phone</button></th>
          </tr>
        </thead>
        <tbody>
        {(employee.filter((val)=>{
            if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
          }).map((emp, i) => {
            return (
              <>    
                <Employee key={i} {...emp} />
                <tr>
                  <td>                    
                    <AlertDialogSlide value={emp.id} refresh={getEmployee}/>
                  </td>
                </tr>
              </>
            );
          }))}
        </tbody>
      </Table>
    </>
  );
};

export default Data;
