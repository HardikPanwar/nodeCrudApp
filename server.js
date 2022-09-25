const express = require('express');
const dotenv = require('dotenv')
const morgan = require ('morgan')
const app = express();
const bodyparser = require ('body-parser');
const path = require ('path');


const connectDB =require('./server/database/connection')


dotenv.config({ path:'config.env'})
const PORT = process.env.PORT || 8080

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'views', 'build', 'index.ejs'));
    })
}

//log request 
app.use(morgan('tiny'));

//MongoDB connection
connectDB();

//parse request to body parser 
app.use(bodyparser.urlencoded({extended:'true'}));
app.use(bodyparser.json());

//setting view engine 
app.set("view engine","ejs");

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
//css/style.css

// adddig router route from other files 
app.use('/',require('./server/routes/route'))

app.listen(3000, () => { console.log(`Server is running on http://localhost:${PORT}`) })