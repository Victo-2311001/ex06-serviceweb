import express from 'express'
//Importer les functions de .controller
import { getIdPokemon, getListPokemons, addPokemon } from './pokemon.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>Bienvenue à mon Pokemon World API</h1>");
})

router.get('/pokemon', getIdPokemon);
router.get('/pokemon/liste', getListPokemons)
router.post('/pokemon/ajouter', addPokemon)

//On exporte le router pour pouvoir l'utiliser dans index.js
export default router;