var express = require('express');
var app = express();
const mongoose = require('mongoose');
var User= require('./models/index.js');
var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/Node_crud",{useUnifiedTopology: true, useNewUrlParser: true});

var connection = mongoose.connection;

connection.once('open', function(){
console.log('connection success');
});
app.set('view engine','ejs');

app.get('/', function(req,res){
 res.render('insert');
});

app.post('/insert', function(req,res){
 var user= new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });

    user.save(()=>{
        res.send('<h1>data send</h1>');
    })

   });

   app.get('/show', function(req,res){
       User.find({}, function(err,result){
        res.render('show',{users:result});
       });
    
   });

   app.get('/delete/:id', async function(req,res){
   await User.findByIdAndDelete(req.params.id)
   res.redirect('/show');
 
});

app.get('/edit/:id', function(req,res){
     User.findById(req.params.id,function(err,result){
        res.render('edit',{user:result});
       });
 });

 app.post('/update/:id',  async function(req,res){
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/show');
  
 });



var server=app.listen(8000, () => {
    console.log('Server started')
})

