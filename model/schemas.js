const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  entryDate: {
    type: Date,
    default: Date.now
  }
})

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  entryDate: {
    type: Date,
    default: Date.now
  }
})


const MenuSchema = new Schema({
  cocktails: {
    type: Array,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cups: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  }
})


const Users = mongoose.model("users", UserSchema)
const Menus = mongoose.model("menus", MenuSchema)
const ContactUs = mongoose.model("contactUs", ContactSchema)

const MySchemas = {"Users": Users, "Menus": Menus, "ContactUs" : ContactUs}
module.exports = MySchemas