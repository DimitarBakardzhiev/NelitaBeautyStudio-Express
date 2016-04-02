var mongoose = require('mongoose');
var connectionString = {
    development: 'mongodb://localhost:27017/nelitaBeautyStudio',
    production: 'mongodb://inzaghi:nekvaparola@ds033135.mlab.com:33135/nelita_beauty_studio'
};

module.exports = function (env) {
    mongoose.connect(connectionString[env]);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to database');
    });
};