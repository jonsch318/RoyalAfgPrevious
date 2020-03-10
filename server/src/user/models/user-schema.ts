import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

export const UserSchemaName = "User";

export const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  birthdate: Date,
  email: {
    type: String,
    required: true,
  }
});

UserSchema.methods.setPassword = function(password: string): Promise<any> {
  return bcrypt.genSalt(10).then((salt) => {
    return bcrypt.hash(password, salt);
  }).then((hash) => {
    this.hash = hash;
  })
};

UserSchema.methods.validatePassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.hash)
};
