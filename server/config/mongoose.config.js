const mongoose = require("mongoose");
mongoose.set('runValidators', true);
const dbNAME =  "PetShelter_db"

mongoose.connect(`mongodb://localhost/${dbNAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the database"))
	.catch(err => console.log("Something went wrong while connecting to the database", err));

// 	const mongoose = require("mongoose");

// //This line requires a unique database name.
// mongoose.connect("mongodb://localhost/product_manag_db", {
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// })
//     .then(()=> console.log("Mongoose connection successful!"))
//     .catch(err => console.log("Mongoose did not connect...check connection", err))