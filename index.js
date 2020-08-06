const express=require("express");
const path=require('path');
const post=3000;

const db=require('./config/mongoose'); //for requiring the database
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var constactList=[{
   name: "Aman",
   phone:"8051141610"
 },
    {
      name:"Soni",
      phone:"1223456798"
    },
    {
      name:"Ram",
      phone:"805145454"
    }
  ]

app.get('/',function(req,res){

  Contact.find({},function(err,contacts){
    if(err)
    {
      console.log('error in fetching data fron db');
      return;
    }

  return res.render('home',{
    title:"Contact List",
  contact_list:contacts
    });
  });
});

app.get('/practise',function(req,res){

  return res.render('practise',{title:"Practise List"});
});

app.post('/createcontact',function(req,res){
//console.log(req.body);
    // constactList.push({
    //   name:req.body.name,
    //   phone:req.body.phone
    // });

    Contact.create({
      name: req.body.name,
      phone:req.body.phone
    },function(err,newContact){
      if(err){console.log('error in creaing a contact');
    return;}
    console.log('*******',newContact);
    return res.redirect('back');
    })

    // return res.redirect('/');
})
app.get('/delete-contact',function(req,res){
// app.get('/delete-contact/:phone',function(req,res){
  // console.log(req.params);
  // let phone = req.params.phone;
  // let contactIndex=constactList.findIndex(contact => contact.phone==phone);
  // if(contactIndex!=0)
  // {
  //   constactList.splice(contactIndex,1);
  // }
  //  return res.redirect('back');

    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
      if(err){
        console.log('error in deleted from database');
        return;
      }
      return res.redirect('back');
    });
});
app.listen(3000,function(){
  console.log("Server is running in port 3000");
})
