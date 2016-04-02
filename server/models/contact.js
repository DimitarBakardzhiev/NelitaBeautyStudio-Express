var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    type: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    }
});

var contact = mongoose.model('Contact', contactSchema);

module.exports = contact;