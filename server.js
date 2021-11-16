const express = require( "express" );
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// app.get( "/", (request, response)=> {
//     response.json({message: "We are Live!"})
// });

// this connect the server.js file to the  mongoose config
require("./server/config/mongoose.config")
require("./server/routes/pet.routes")(app)// dont forget to pass the app




app.listen(port, ()=>{console.log( `listening on port ${port}` )})