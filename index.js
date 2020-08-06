const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const app=express();
const db=require('./config/mongoose');
//express session for session-cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const CryptoJs=require('crypto-js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('./assets'));

//layouts setup
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting view engine 
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'authentication',
    //secret which needs to be changes
    secret: 'development',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb-setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

//if the user is already authenticated, sets the user in locals
app.use(passport.setAuthenticatedUser);

//using flash messages
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes/index.js'));

//listener
app.listen(port, function(err){
    if(err){
        console.log("Error Running server on port:"+port);
        return;
    }
    console.log("console Running on port:"+port);
})