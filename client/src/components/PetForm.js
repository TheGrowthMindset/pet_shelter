import React, {useState} from 'react';
import axios from "axios"

import { useHistory } from 'react-router';


const PetForm = (props) => {
    const history = useHistory()
    const [formInfo, setFormInfo] = useState({
        name:"",
        type:"",
        description:"",
        skills: [""]
    })

    // Display error messages
    const [formErrors, setFormErrors] = useState({
        name:"",
        type:"",
        description:"",
        skill1: [""],
        skill2: [""],
        skill3: [""]
    })

    // ChangeHandler to update the formInfo object with the information from the form as the form is being changed

    const ChangeHandler = (e)=>{
        console.log("changing form here!!")
        setFormInfo({
            ...formInfo, // hold on to entered info/ prevents rerendering with different info untill submited
            [e.target.name]: e.target.value

            
        })
    }


    //submitHandler for whent the form submit we send this info to the backend using the routes to create something new
     
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/pets/new", formInfo)
        .then(response => {
            console.log(response)

            if(response.data.error){
                setFormErrors(response.data.error.errors)
            }else{
                props.setFormSubmitted(!props.formSubmitted)

                //set the form back to empty after it is submitted
                setFormInfo({
                    name:"",
                    type:"",
                    description:"",
                    skill1: [""],
                    skill2: [""],
                    skill3: [""]
                        
                    })

                setFormErrors({
                    name:"",
                    type:"",
                    description:"",
                    skills: [""]
                 })
                
                 // to redirect back to home after creating new pet
                    history.push("/")
                    
                }
        })
        .catch(error =>console.log("couldn't post/create Pet",error))
    }

    return (
        <div>
            <h1> Pet Shelter </h1>
            <h4>Know a pet needing a home?</h4>
            <form onSubmit={submitHandler} className="d-flex justify-content-start">
                <div id= "left">
                    <div className="form-group">
                        <label htmlFor="name"> Pet Name:</label>
                        <input onChange = {ChangeHandler} type="text" name="name" value ={formInfo.name} id="name" className="form-control" />
                        <p className="text-danger">{formErrors.name?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Pet Type:</label>
                        <input onChange = {ChangeHandler} type="text" name="type" value ={formInfo.type} id="type" className="form-control" />
                        <p className="text-danger">{formErrors.type?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Pet Description:</label>
                        <input onChange = {ChangeHandler} type="text" name="description" value ={formInfo.description} id="description" className="form-control" />
                        <p className="text-danger">{formErrors.description?.message}</p>
                    </div>
                </div>
                <div id="right">
                    <div className="form-group">
                        <label htmlFor="skill1">Pet Skill 1:</label>
                        <input onChange = {ChangeHandler} type="text" name="skill1" value ={formInfo.skill1} id="skill1" className="form-control" />
                        <p className="text-danger">{formErrors.skill1?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="skill2">Pet Skill 2:</label>
                        <input onChange = {ChangeHandler} type="text" name="skill2" value ={formInfo.skill2} id="skill2" className="form-control" />
                        <p className="text-danger">{formErrors.skill2?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="skill3">Pet Skill 3:</label>
                        <input onChange = {ChangeHandler} type="text" name="skill3" value ={formInfo.skill3} id="skill3" className="form-control" />
                        <p className="text-danger">{formErrors.skill3?.message}</p>
                    </div>
                </div>
                <button className="btn btn-success mt-3" type="submit">Create A New Pet</button>
            </form>
        </div>
    );
};



export default PetForm;