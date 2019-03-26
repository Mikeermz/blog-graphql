const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
  birth_date:{
    type: Date
  }
  gender:{
    type: String,
    enum: ["male", "female"]
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {"collection": "users", "timestamps": true} );

UserSchema.pre("save", (next) => {
  let user = this;
  if(!user.isModifed("password")) { return next(); }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) =>{
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

mongoose.Types.ObjectId.prototype.valueOf =  () =>{
  return this.toString();
}

module.exports = mongoose.model("users", UserSchema);
