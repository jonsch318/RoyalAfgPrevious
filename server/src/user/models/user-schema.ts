import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

/**
 * The name of the user schema
 */
export const UserSchemaName = "User";

/**
 * The schema of the user class. This is the object which will get stored in the database
 */
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
