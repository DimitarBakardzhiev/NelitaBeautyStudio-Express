var mongoose = require('mongoose');
var PricelistItem = require('./pricelistItem').model;
var pricelistItemSchema = require('./pricelistItem').schema;

var pricelistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    services: [pricelistItemSchema]
});

var Pricelist = mongoose.model('Pricelist', pricelistSchema);

// seed
Pricelist.find({}, function (err, pricelists) {
    if (err) throw err;

    if (pricelists.length === 0) {
        var pricelist1 = new Pricelist({
            title: 'pricelist1',
            services: [
                new PricelistItem({
                    service: 'service1',
                    price: 7.50
                }),
                new PricelistItem({
                    service: 'service2',
                    price: 15
                })
            ]
        });

        var pricelist2 = new Pricelist({
            title: 'pricelist2',
            services: [
                new PricelistItem({
                    service: 'service1',
                    price: 11
                }),
                new PricelistItem({
                    service: 'service2',
                    price: 6.50
                })
            ]
        });

        pricelist1.save(function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        pricelist2.save(function (err) {
            if (err) throw err;
        });
    }
});

module.exports = Pricelist;