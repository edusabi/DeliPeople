const mongoose = require("mongoose")

const cadastroProletario = mongoose.model("cadastroProletario", {
    // Definindo que as propriedades tenham seu tipo definido juntamente com a necessidade dela no sistema
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    profissao: {
        type: String,
        required: true
    },
    servicos: {
        type: String,
        required: true
    },
});

module.exports = cadastroProletario;