import React, {useState, useEffect} from 'react'
import axios from 'axios';

import {Link} from "react-router-dom"
    
const AllPets = (props) => {
  

    const [allPets, setAllPets] = useState([])

    const [deleteToggle, setDeleteToggle] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
        .then(response => {
            console.log("response when getting all Pets--->", response)
            setAllPets(response.data.pets.sort((a,b) => a.type.localeCompare(b.type)))
        })
        .catch(err => console.log("error while retrieving all products--->", err))
    },[props.formSubmitted, deleteToggle])
   
        const deletePet = (id) => {
            axios.delete(`http://localhost:8000/api/products/delete/${id}`)
            .then(response => {
                console.log("Just deleted the Pet!", response)
                setDeleteToggle(!deleteToggle)
            })
            .catch(err => console.log(err))
        }

    return (
        <table>
        <thead>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {
                allPets.map((pet, i) =>{
                    return(
                        <tr key = {i}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                                <Link to={`/pet/${pet._id}`} className="btn btn-info" > DETAILS</Link> |
                                 <Link to={`/edit/${pet._id}`}className="btn btn-warning">EDIT</Link> 
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>









        // <div>
        //     <h1> Here are all the Pets! </h1>
        //     {allPets &&
        //         allPets.map((pet, i) => {
        //             return(
                        
        //                 <div key = {i} className="card">
        //                 <div className="card-body">
        //                     <h5 className="card-title"> <Link to = {`/pet/${pet._id}`}>{pet.name}</Link></h5>
        //                     <p className="card-text"> {pet.type} </p>
        //                     <p className="card-text"> {pet.description} </p>
        //                     <p className="card-text"> {pet.skills} </p>
        //                     <Link to= {`/pet/${pet._id}`} className="btn btn-primary">View {pet.name} Details</Link>
        //                     <button onClick={ (e) => deletePet(pet._id)} className="btn btn-danger"> Delete {pet.name} </button>|<Link to = {`/edit/${pet._id}`} className="btn btn-secondary"> Edit</Link>
        //                 </div>
        //                 </div>
        //             )
        //         })
        //     }
        // </div>
    )
}
    
export default AllPets;

