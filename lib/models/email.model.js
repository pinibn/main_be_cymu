const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
   address: { // the email address
    type: String, // we assume the frontend already validated the type. we don't want to waste backend time with input validations.
    required: true
   },
   subject: {
      type: String,
      required: true
   },
   content: {
    type: String,
    required: true
   },
   status: {
    type: Boolean, // true = user pressed the phising link.
    required: false,
    default: false // when an email was inserted to the DB, the status is 'false' until the user pressed the link.
   }
});

module.exports = mongoose.model('Email', emailSchema);