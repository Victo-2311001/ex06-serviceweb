//Modules:
import express from 'express';
import  recupererIdPokemon  from './pokemon.route.js';

// Créer une application express
const app = express();

// Importer les middlewares
app.use(express.json());


app.get('/', (req, res) => {
    res.send("<h1>Mon premier serveur web sur express !</h1>");
});

app.use('/api', recupererIdPokemon);




// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré: http://127.0.0.1:${PORT}`);
});
