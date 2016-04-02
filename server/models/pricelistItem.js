var mongoose = require('mongoose');

var pricelistItemSchema = mongoose.Schema({
    service: String,
    price: Number
});

var PricelistItem = mongoose.model('PricelistItem', pricelistItemSchema);
module.exports = {
    model: PricelistItem,
    schema: pricelistItemSchema
};