const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/rest-api-example')

//settings
app.set('port', process.env.PORT || 3000)

//middleware
app.use( express.urlencoded({extended:true}) )
app.use( express.json() )
app.use( morgan('dev') )
app.use( cors() )
app.use( express.static('public') )

//routes
app.use('/users', userRouter)

app.listen(app.get('port'), () => {
  console.log('Se esta escuchando en el puerto 3000')
})
