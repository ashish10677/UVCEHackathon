//db model to store user data
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema=new mongoose.Schema(mongoose.Schema.Types.Mixed, {strict: false});

const User = mongoose.model('User', userSchema);

module.exports = User;
