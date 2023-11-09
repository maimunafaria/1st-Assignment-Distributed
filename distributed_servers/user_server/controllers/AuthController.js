const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    User.findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] })
      .then(existingUser => {
        if (existingUser) {
          res.json({ message: 'Duplicate user' });
        } else {
          bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
            let user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedPass
            });
            user
              .save()
              .then(response => {
                res.json({
                  message: 'Registration complete'
                });
              })
              .catch(error => {
                res.json({
                  message: 'An error occurred!'
                });
              });
          });
        }
      })
      .catch(error => {
        res.json({
          message: 'An error occurred while checking for existing users'
        });
      });
  };

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({ email:email })
      .then(user => {
        if (user) {
          bcrypt.compare(password,user.password,function(err,result){
            
            if(result){
                let accessToken = jwt.sign(
                    {email: user.email},
                    'verySecretValue')
                res.json({token:accessToken,
                  email:user.email});
            }
            else{
                res.json({
                    message: 'Password does not match'
                })
            }
          })
        }
        else{
            res.json({
                message: 'No user'
            }) 
        }
  })
}

const getUsers= (req, res, next) => {
  User.find()
    .then(response => {
      res.json({
        response,
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!',
      });
    });
};

module.exports={
   register,login,getUsers
}
