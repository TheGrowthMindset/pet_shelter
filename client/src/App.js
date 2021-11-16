// import logo from './logo.svg';
import './App.css';

import React,{useState} from "react"

import AllPets from './components/AllPets';
import PetForm from './components/PetForm';
import PetDetails from './components/PetDetails';
import EditForm from './components/EditForm';

import {
  BrowserRouter,
  Switch, 
  Route, 
  Link, 
} from "react-router-dom"

function App() {

  const [formSubmitted, setFormSubmitted] =useState(false)

  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        
      <Link to="/" className=" btn btn-primary"> Home </Link>
      <Link to="/new" className=" btn btn-success"> Add a Pet to the Shelter </Link>
         <Switch>
           <Route exact path = "/"> 

          <hr />
         <AllPets formSubmitted = {formSubmitted}/>
           </Route>
          <Route exact path = "/new">
          <PetForm formSubmitted = {formSubmitted} setFormSubmitted = {setFormSubmitted} />
          </Route>

           <Route path = "/pet/:id">
              <PetDetails></PetDetails>
           </Route>

           <Route exact path = "/edit/:id">
              <EditForm></EditForm>
           </Route>

         </Switch>

      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
