import React from "react";
import AddEmployee from "./addEmployee";
import { Button } from "react-bootstrap";
import Data from "./data";
import { Route, Switch, Link } from "react-router-dom";

//displaying the function if the route is not matched
function Error() {
  return <h1>Oops?! Page not found</h1>;
}
function Bar() {
  return (
    <div>
      <Link to="/">
        <Button style={{margin:20}}variant="primary">Home</Button>{" "}
      </Link>
      <Link to="/employee">
        <Button variant="primary">Add Employee</Button>{" "}
      </Link>
    </div>
  );
}

const Routes = () => {
  return (
    <main>
      <Bar />
      <Switch>
        <Route path="/" component={Data} exact />
        <Route path="/employee" component={AddEmployee} />
        <Route component={Error} />
      </Switch>
    </main>
  );
};

export default Routes;
