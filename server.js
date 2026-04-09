const express = require('express');
const app = express();

app.use(express.json());

let players = {};

app.post('/api/player', (req, res) => {
    players[req.body.username] = req.body;
    res.send({ ok: true });
});

app.get('/api/player/:username', (req, res) => {
    res.send(players[req.params.username] || {});
});

app.listen(3000, () => console.log("API online"));
