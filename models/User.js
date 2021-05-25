const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

//user schema
const userSchema = Schema({
    fname:{
        type: String,
        maxLength: 140,
        required: true
    },
    lname:{
          type: String,
          maxLength: 140,
          required: true
    },
    username:{
        type: String,
        unique: true,
        maxLength: 140 ,
        required: true
    },
    email:{
        type: String,
        unique: true,
        maxLength: 140,
        required: true
    },
    password:{
        type: String,
        minLength : 8,
        maxLength: 140,
        required: true,
    },
    dob: Date,
},
{
  toJSON: {
    transform: (doc, ret, options) => {
      delete ret.password;
      return ret;
    },
  },
});

//hash password 
userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
  });
  
 userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
      return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
  });
 //to check password is found or no  
userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };
const usermodel = mongoose.model('User',userSchema);

module.exports= usermodel
