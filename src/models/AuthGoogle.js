const mongoose = require("mongoose")

const AuthGoogle = mongoose.model("Google", {
    // Definindo que as propriedades tenham seu tipo definido juntamente com a necessidade dela no sistema
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    chats: {
        type: Array,
        required: false
    }
});

module.exports = AuthGoogle;