// const express = require('express');
// const Contact = require ("../models/contactModels");
// const bodyParser = require ("body-parser");

// const contactRoutes = express.Router();
// contact_routes.use(bodyParser.urlencoded({ extended: false}));

// contact_routes.post("/api/contact", async (req, res) => {
//     const { fullName, email, message} = req.body;

//     const contact = new Contact({
//         fullName: fullName,
//         email: email,
//         message: message,
//     })

//     try {
//         await contact.save().then((contact) => {
//             return res.status(200).json({
//                 success: true,
//                 message: "Contact saved successfully !",
//             });
//         });
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });

// module.exports = contact_routes;

const express = require('express');
const Contact = require("../models/contactModels");

const contactRoutes = express.Router();

// Use express.json() middleware for parsing JSON bodies
contactRoutes.use(express.json());

contactRoutes.post("/api/contact", async (req, res) => {
    const { fullName, email, message } = req.body;

    const contact = new Contact({
        fullName: fullName,
        email: email,
        message: message,
    });

    try {
        await contact.save();
        return res.status(200).json({
            success: true,
            message: "Contact saved successfully!",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = contactRoutes;
