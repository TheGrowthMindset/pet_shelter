// const { response } = require("express");
const Pet = require("../models/pet.model");

//Creating New Pet
module.exports.createNewPet = (req, res) => {
  Pet.create(req.body)
    .then(newPet => res.json({ pet: newPet }))
    .catch(err => res.json({ message: "Something went wrong Creating Pet", error: err }));
};

// Showing All Pets
module.exports.findAllPets = (req, res) => {
  Pet.find()
    .then(allPets => res.json({ pets: allPets }))
    .catch(err => res.json({ message: "Something went wrong Showing all Pets", error: err }));
};

// Showing One Pet
module.exports.findOnePet = (req, res) => {
	Pet.findOne({ _id: req.params.id })
		.then(onePet => res.json({ pet: onePet }))
		.catch(err => res.json({ message: "Something went wrong Showing One Pet", error: err }));
};


module.exports.updatePet = (req, res) => {
  Pet.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(updatedPet => res.json({ pet: updatedPet }))
    .catch(err => res.json({ message: "Something went wrong Updating Pet", error: err }));
};

module.exports.deletePet = (req, res) => {
  Pet.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong Deleting Pet", error: err }));
};