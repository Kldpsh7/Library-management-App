const path = require('path');
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const mainRouter = require('./routes/router');
const Sequelize = require('sequelize');
const sequelize = require('./models/mainModel')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/',mainRouter)
sequelize.sync()
.then(()=>app.listen(3000))
.catch(err=>console.log(err))