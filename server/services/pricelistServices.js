var Pricelist = require('../models/pricelist');
var PricelistItem = require('../models/pricelistItem').model;

function all(callback) {
    Pricelist.find({}, callback);
}

function byId(id, callback) {
    Pricelist.findById(id, callback);
}

function editTitle(id, newTitle, callback) {
    Pricelist.findByIdAndUpdate(id, { title: newTitle }, callback);
}

function remove(id, callback) {
    Pricelist.findByIdAndRemove(id, callback);
}

function create(pricelist, callback) {
    var newPricelist = new Pricelist({
        title: pricelist.title
    });

    newPricelist.save(callback);
}

function addService(id, service, callback) {
    byId(id, function (err, pricelist) {
        if (err) return callback(new Error('Pricelist not found!'));

        var newService = new PricelistItem({
            service: service.service,
            price: service.price
        });

        pricelist.services.push(newService);
        pricelist.save(callback);
    });
}

function editService(id, pricelistId, service, callback) {
    byId(pricelistId, function (err, pricelist) {
        if (err) return callback(new Error('Pricelist not found!'));

        pricelist.services.forEach(function (element) {
            if (element.id == id) {
                element.service = service.service;
                element.price = service.price;
            }
        });

        pricelist.save(callback);
    });
}

function findService(id, pricelistId, callback) {
    byId(pricelistId, function (err, pricelist) {
        if (err) return callback(new Error('Pricelist not found!'));

        pricelist.services.forEach(function (service) {
            if (service.id == id) {
                return callback(undefined, service);
            }
        });
    });
}

function removeService(id, pricelistId, callback) {
    byId(pricelistId, function (err, pricelist) {
        if (err) return callback(new Error('Pricelist not found!'));

        pricelist.services.forEach(function (service, index, allServices) {
            if (service.id == id) {
                allServices.splice(index, 1);
            }
        });

        pricelist.save(function (err, pricelistUpdated) {
            if (err) return callback(err);

            callback(undefined, pricelistUpdated);
        });
    });
}

module.exports = {
    all: all,
    byId: byId,
    editTitle: editTitle,
    create: create,
    remove: remove,
    addService: addService,
    editService: editService,
    findService: findService,
    removeService: removeService
};