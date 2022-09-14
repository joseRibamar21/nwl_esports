import express from 'express';
const app = express();
app.get('/ads', (req, res) => {
    console.log('Acessou ADs');
    return res.json([
        { id: 1, name: 'Anuncio1' }
    ]);
});
app.listen(3000);
