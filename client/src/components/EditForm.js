import React, {useState, useEffect} from 'react';
import axios from "axios"
import { useParams } from 'react-router';
import { useHistory } from 'react-router';


const EditForm = (props) => {

    const history = useHistory()
    const { id } = useParams();

    const [formInfo, setFormInfo] = useState({
        name:"",
        type:"",
        description:"",
        skills: [""]
            
    })
    

    // Display error messages
    const [formErrors, setFormErrors] = useState({
        title:"",
        price:"",
        description:""
    })
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
         .then( response => {
             console.log("response when getting one Pet to update", response)
            setFormInfo(response.data.pet)
            

         })
         .catch(err => console.log(err))
        
    }, []);


    // ChangeHandler to update the formInfo object with the information from the form as the form is being changed

    const changeHandler = (e)=>{
        console.log("changing form here!!")
        setFormInfo({
            ...formInfo, // hold on to entered info/ prevents rerendering with different info untill submited
            [e.target.name]: e.target.value
        })
    }


    //submitHandler for whent the form submit we send this info to the backend using the routes to create something new
     
    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/pets/update/${id}`, formInfo)
            .then( response => {
                console.log("Updated product succesfully!", response)
                if (response.data.error) { //if the form is not filled out properly
                    setFormErrors(response.data.error.errors)
                } else {
                    props.setFormSubmitted(!props.formSubmitted)

                    setFormInfo({
                        name: ""

                    })
                    //redirect to "/" after creating a ninja
                    history.push("/")
                }
            })
            .catch(err => console.log("Something went wrong while updating product", err))
       
    }

    return (
        <div>
            {
                formInfo != null ?  // 
                    // <h3>Edit PetEditPets</h3>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">

                            <label htmlFor="name">Pet Name:</label>
                            <input onChange={changeHandler} type="text" name="name" id="" value={formInfo.name} className="form-control" />
                            <p className="text-danger">{formErrors.name?.message}</p>

                        </div>
                        <div className="form-group">

                            <label htmlFor="">Pet Type:</label>
                            <input onChange={changeHandler} type="text" name="type" id="" value={formInfo.type} className="form-control" />
                            <p className="text-danger">{formErrors.type?.message}</p>

                        </div>
                        <div className="form-group">

                            <label htmlFor="description">Description:</label>
                            <input onChange={changeHandler} type="text" name="description" id="" value={formInfo.description} className="form-control" />
                            <p className="text-danger">{formErrors.description?.message}</p>

                        </div>
                        <div className="form-group">

                            <label htmlFor="skill1">Skill 1:</label>
                            <input onChange={changeHandler} type="text" name="skill1" id="" value={formInfo.skill1} className="form-control" />
                            

                        </div>
                        <div className="form-group">

                            <label htmlFor="skill2">Skill 2:</label>
                            <input onChange={changeHandler} type="text" name="skill2" id="" value={formInfo.skill2} className="form-control" />
                            

                        </div>
                        <div className="form-group">

                            <label htmlFor="skill3">Skill 3:</label>
                            <input onChange={changeHandler} type="text" name="skill3" id="" value={formInfo.skill3} className="form-control" />
                            

                        </div>

                        <button className="btn btn-success mt-3" type="submit">Update Pet</button>
                    </form>
                    :
                    <div>
                        <h1>no pets</h1>
                    </div>
            }
        </div>
    );
};



export default EditForm;