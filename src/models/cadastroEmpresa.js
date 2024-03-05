const mongoose = require("mongoose")

const cadastroEmpresa = mongoose.model("cadastroEmpresa", {
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
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    servicos: {
        type: String,
        required: true
    },
});

module.exports = cadastroEmpresa;