const mongoose = require("mongoose")


const mensagens = mongoose.model("mensagens", {
    id: {
        type: String,
        required: true
    },
    linkedChat: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    participants: {
        type: Array,
        required: true
    }
});

const chatPrivado = mongoose.model("chatPrivado", {
    id: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
    }
});

module.exports = chatPrivado, mensagens;