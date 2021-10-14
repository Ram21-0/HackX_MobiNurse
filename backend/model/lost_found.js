const mongoose = require('mongoose');
var image_data = new mongoose.Schema({
    name: String,
    desc: String,
    imgname: String
});


const model = mongoose.model('image_data',image_data);

module.exports = model;