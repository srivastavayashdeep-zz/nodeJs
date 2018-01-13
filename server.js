const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('year',() =>{
  return new Date().getFullYear();
})

app.use((req, res, next) =>{
  var date = new Date().toString();
  var log = `${date} : ${req.method} | ${req.url}`;
console.log(`${date} : ${req.method} | ${req.url}`);
fs.appendFile('server.log', log + '\n' , (err) => {
  if(err){
    console.log('unable to log ')
  }
})
  next();
})
app.get('/',(req,res)=>{
//  res.send('hello express');
res.render('home.hbs',{
  name : 'yashdeep',
  likes:[
    'biking',
    'cities'
  ],
  pagetitle : 'home page',
  welcomemsg : 'Hello all',
  year : new Date().getFullYear()
});
});

app.get('/about1',(req,res)=>{
  res.send('Abouit Page');
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pagetitle : 'About hbs page',
    year : new Date().getFullYear()
  })
});

app.get('/bad',(req, res) =>{
  res.send({
    errorMeassge: 'WError Page it is'
  });
})
app.listen(3000,() =>{
  console.log('server is up at port 3000');
});
