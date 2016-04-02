var Contact = require('../models/contact');

function all(callback) {
    Contact.find({}, callback);
}

function create(contact, callback) {
    var newContact = new Contact({
        type: contact.type,
        content: contact.content
    });

    newContact.save(callback);
}

function byId(id, callback) {
    Contact.findById(id, callback);
}

function update(id, contact, callback) {
    Contact.findByIdAndUpdate(id, contact, callback);
}

function remove(id, callback) {
    Contact.findByIdAndRemove(id, callback);
}

module.exports = {
    all: all,
    create: create,
    byId: byId,
    update: update,
    remove: remove
};