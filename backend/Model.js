const mongoose = require('mongoose');


const userCustomizationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  headerColor: { type: String, required: true },
  headerBackColor:{ type: String },
  bubbleColor:{type: String},
  heading:{type: String},
  startmessage:{type: String},
  botfontcolor:{type: String},
});


const UserCustomization = mongoose.model('UserCustomization', userCustomizationSchema);

module.exports = UserCustomization;



        