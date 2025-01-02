import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    roleType: {
      type: String,
      require: true,
    },
    user_view_type: {
      type: String,
      require: true,
    },
    site_admin: {
        type: String,
        default: false,
    },
    userName: {
      type: String,
      require: true,
      maxlength: 50,
      minlength: 3,
    },
    company: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    hireable: {
      type: Boolean
    },
    blog: {
      type: String,
    },
    location: {
      type: String,
      require: true,
    },
    bio: {
      type: String,
    },
    twitter_username: {
      type: String,
      maxlength: 50,
      minlength: 4,
    },
    public_repos: {
      type: Number,
      require: true,
    },
    private_repos: {
      type: Number,
      require: true,
    },
    userVerified: {
      email: {
        type: String,
        default: false,
      },
      phone: {
        type: String,
        default: false,
      },
    },
    userVerifyToken: {
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

let userModel = mongoose.model("users", userSchema, "users");

export default userModel;
