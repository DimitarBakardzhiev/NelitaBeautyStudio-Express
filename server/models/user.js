var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    local: {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;