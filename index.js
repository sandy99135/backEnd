const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const User =require("./modele/modele")
const mongoose = require("mongoose");
app.use(express.json());


const config={
    DB: 'mongodb://localhost:27017/nodemailer',
//    DB:"mongodb+srv://sandy:andomalala@cluster0-nkfjf.mongodb.net/test?retryWrites=true&w=majority"
}


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/", function(req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello World");
});
app.get("/user", function(req, res) {
    console.log(User)
    User.find().then(data=>res.send(data))
  })
//when we route to /courses
app.post("/envoi", function(req, res) {
    User.find()
        .then(prof => {
            var id2;
            if (prof.length == 0) {
                id2 = 0
            }
            else {

                id2 = parseInt(prof[prof.length - 1].id) + 1
            }
            
           
            const prf = new User({
                _id: id2,
                nom: req.body.nom || "Untitled Note",
                email: req.body.email,
                password: req.body.password
            }); 
          /*   bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(prf.password, salt, (err, hash) => {
                  if (err) throw err;
                  prf.password = hash; */
                  prf
                    .save()
                    .then(data => {
                       
                        console.log(prf)
                       res.send(data)
                    }
                      ).catch(err => console.log(err));
                });
            //   });
            //        })

});
//To get a specific course, we need to define a parameter id
// app.get("/courses/:id", function(req, res) {
//   const course = courses.find(c => c.id === parseInt(req.params.id));
//   //if the course does not exist return status 404 (not found)
//   if (!course)
//       return res
//           .status(404)
//           .send("The course with the given id was not found");
//   //return the object
//   res.send(course);
// });
// //using the http post request we can create a new course

// app.put("/courses/:id", function(req, res) {
//   //get the course
//   const course = courses.find(c => c.id === parseInt(req.params.id));
//   if (!course)
//       return res
//           .status(404)
//           .send("The course with the given id was not found");
//   //update the course
//   course.name = req.body.name;
//   //return the updated object
//   res.send(course);
// });
// app.put("/courses/:id", function(req, res) {
//   //get the course
//   const course = courses.find(c => c.id === parseInt(req.params.id));
//   if (!course)
//       return res
//           .status(404)
//           .send("The course with the given id was not found");
//   //update the course
//   course.name = req.body.name;
//   //returns the updated object
//   res.send(course);
// });
app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);