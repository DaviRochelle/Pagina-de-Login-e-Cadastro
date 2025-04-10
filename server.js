const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('sua_string_de_conexao_mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado!'))
    .catch(err => console.log(err));

const Accessory = mongoose.model('Accessory', new mongoose.Schema({
    name: String,
    type: String,
    status: String,
    date: { type: Date, default: Date.now }
}));

app.post('/accessories', async (req, res) => {
    const accessory = new Accessory(req.body);
    await accessory.save();
    res.send(accessory);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});