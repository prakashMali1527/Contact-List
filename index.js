const express = require('express');
const path = require('path');

const port = 8000;  // port number

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs'); // setting view engine
app.set('views', path.join(__dirname, 'views'));  // setting the views path

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', function (req, res) {
    console.log(req.url);

    Contact.find({})
    .then(function(contacts){
            const info = {
                title: 'Contact List',
                contact_list: contacts
            };
            return res.render('home', info);
    }).catch(()=>{
            console.log('error in fetching data from db');
            return res.send('<h1>Server side Error --> (Error in fetching data) </h1>');
    })
});

app.get('/profile', function (req, res) {
    console.log('inside profile');
    return res.render('profile', { name: 'rahul' });
})

app.post('/create-contact', function (req, res) {
    console.log(req.url);
    Contact.create(req.body).then((newContact) => {
        console.log('***', newContact);
    }).catch((err) => {
        console.log('error connecting to database');
        return;
    })
    res.redirect('back');
});

// delete using {QUERY PARAM} 
app.get('/delete-contact', function (req, res) {
    console.log(req.url);
    console.log(req.query);
    Contact.findByIdAndDelete(req.query.id).then(()=>{
        console.log('deleted successfully');
        return;
    })
    .catch(()=>{
        if(err){
            console.log('error deleting contact from db');
            return;
        }
    })
    res.redirect('back');
});

app.listen(port, function (err) {
    if (err)
        console.log('Error while running the express server', err);
    else
        console.log('Express server is up and running');
})