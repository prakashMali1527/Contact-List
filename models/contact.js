const mongoose = require('mongoose');
const {Schema,model} = mongoose;

// create Schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// create collection Contact
const Contact = model('Contact',contactSchema);

module.exports = Contact;
