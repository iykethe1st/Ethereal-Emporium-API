const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this.id, email: this.email, name: this.name },
    process.env.ETHEREAL_PK
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validate;
