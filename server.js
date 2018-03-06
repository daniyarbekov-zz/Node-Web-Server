const express = require('express');
const fs = require('fs');

//loading handlebar
const hbs = require('hbs');

const port = process.env.PORT || 3000;


var app = express();
//using middle ware




hbs.registerPartials(__dirname + '/views/partials');

//set expres realted configs, set key-value pair
app.set('view engine', 'hbs');


app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = (`${now}: ${req.method}, ${req.url}`);
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) =>{
    if (err){
      console.log('unable to append server.log');
    }
  });
  next();
});

app.use((req,res,next) =>{

  res.render('maitenance.hbs');
});

app.use(express.static(__dirname + '/public'));




//setup a handler for http get request
app.get('/', (req,res) => {

  res.render('home.hbs', {
    pageTitle: 'Zhaksy stranica',
    welcomeMessage: 'Salam kotakbastar',
    currentyear: new Date().getFullYear()
  });
});


// can create more pages
app.get('/about', (req,res) =>{
//pass in some object
res.render('about.hbs',{
  pageTitle: 'About page',
  currentYear: new Date().getFullYear()
});

});

//bind application to the port on our machine
app.listen(port, () =>{
  console.log(`server is up at server ${port}`);
});
