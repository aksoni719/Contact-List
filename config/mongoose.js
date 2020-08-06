const mongoose=require('mongoose');       //library
mongoose.connect('mongodb://localhost/contacts_list_db'); //connect to the database

const db=mongoose .connection;      //acquire the connection
db.on('error',console.error.bind(console,'error in connecting to database')); //if error

db.once('open',function(){    //if successfull
  console.log("successfully connected to the database");
})
