import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import { Link } from 'react-router-dom';

const PetDetails = () => {
    const { id } = useParams();
    const history = useHistory();

    const [petInfo, setPetInfo] = useState({})

    useEffect(() => {

        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(response => {
                console.log("response when getting one Pet", response)
                setPetInfo(response.data.pet)

            })
            .catch(err => console.log(err))
    }, [])

    const deletePet = () => {
        console.log("deleting Pet")

        axios.delete(`http://localhost:8000/api/pets/delete/${id}`)
            .then(response => {
                console.log("Just deleted the Pet!", response)
                history.push("/") // use history to redirect. in this case back to to home or the localhost 
            })
            .catch(err => console.log(err))
    }

    return (
        <>
        <h4>Details about: {petInfo.name}</h4>
        <button className="btn btn-danger" onClick={(e) => deletePet(id)}>Adopt  {petInfo.name}</button>
        <Link to="/" className="btn btn-danger"> Home </Link>

        <div>
            <p> Pet Type: {petInfo.type} </p>
            <p> Pet Description: {petInfo.description}</p>
            <p> Pet Skill 1: {petInfo.skill1}</p>
            <p> Pet Skill 2: {petInfo.skill2}</p>
            <p> Pet Skill 3: {petInfo.skill3}</p>
        </div>
        </>
    

    );
};


export default PetDetails;