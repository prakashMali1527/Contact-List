// require library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection (to check if it is connected)
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running then print message
db.once('open',function(){
    console.log('Successfully connected to db');
})

