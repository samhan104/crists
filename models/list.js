const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const list = new Schema ( 
    {
        name: {type: String, require: true},
        items: [String]
    }
)

const listItem = mongoose.model('list', list)

module.exports = listItem