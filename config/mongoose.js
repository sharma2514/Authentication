const mongoose=require('mongoose');

//connect to mongo db 
mongoose.connect('mongodb://localhost/nodejs_authentication_db');
mongoose.set('useFindAndModify', false);
const db=mongoose.connection;

//if there is error connecting to database, display error in console
db.on('error', console.log.bind(console, "Error connecting to Database"));

//if connection is open display success message
db.once('open', function(){
    console.log("Connected to DataBase");
});

module.exports=db;