const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// exports.create = (req, res) => {
//     res.send({ message: "create handler"})
// }

// exports.findAll = (req,res) => {
//     res.send({ message: "findAll handler"});
// }; 

exports.findOne = (req,res) => {
    res.send({ message: "findOne handler"});
}; 

exports.update = (req,res) => {
    res.send({ message: "update handler"});
}; 

exports.delete = (req,res) => {
    res.send({ message: "delete handler"});
}; 

exports.deleteAll = (req,res) => {
    res.send({ message: "deleteAll handler"});
}; 

exports.findAllFavorite = (req,res) => {
    res.send({ message: "findAllFavorite handler"});
}; 

//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
};

//Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    console.log(documents);
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
        //console.log("Documents retrieved:", documents); // Debug xem dữ liệu có hay không
        //return res.send(documents);
    } catch (error) {
        //console.error("Error retrieving contacts:", error); // In lỗi ra console
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return res.send(documents);
};