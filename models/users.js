var mongoose = require('mongoose');
var {Img} = require('../untils/config.js');
var url = require('url');
mongoose.set('useCreateIndex', true);

var UserSchema = new mongoose.Schema({
    userImg: {type: String, default: url.resolve(Img.baseUrl, 'maowo.jpg')},
    username : {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    date: {type: Date, default: Date.now()},
    isAdmin: {type: Boolean, default: false},
    isFreeze: {type: Boolean, default: false}
});

var UserModel = mongoose.model('user', UserSchema);
UserModel.createIndexes();

var save = (data) => {
    var user = new UserModel(data);
    return user.save().then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

var findLogin = (data) => {
    return UserModel.findOne(data);
};

var updatePassword = (email, password) => {
    return UserModel.update({email}, {$set: {password}}).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

var usersList = () => {
    return UserModel.find();
};

var updateFreeze = (email, isFreeze) => {
    return UserModel.update({email}, {$set: {isFreeze}}).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

var deleteUser = (email) => {
    return UserModel.deleteOne({email});
};

var updatedUser = (username, userImg) => {
    return UserModel.update({username}, {$set: {userImg}}).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

module.exports = {
    save,
    findLogin,
    updatePassword,
    usersList,
    updateFreeze,
    deleteUser,
    updatedUser
};