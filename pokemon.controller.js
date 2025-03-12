//Importer les requetes dans .model
import { recupererIdPokemon, recupererPageListee, creerPokemon } from "./pokemon.model.js";

//Fonction pour récuperer le ID du pokemon et l'afficher apres  
const getIdPokemon = (req, res) => {
    //Récuperer le ID
    const idPokemon = req.query.idPokemon;

    //Si il n'a pas de code de idPokemon définit (sans le ?idPokemon = ) 
    if (!idPokemon){
        return res.status(400).json({error: erreur.message});
    }

    //Afficher le pokemon
    recupererIdPokemon(idPokemon, (erreur, resultats) =>{
        if(erreur){
            return res.status(500).json({error: erreur.message});
        }
        res.json(resultats);
    });
}

const getListPokemons = (req, res) => {
    //Récuperer le type (qui peut etre null aussi)
    const type =req.query.type || null;
    const page = parseInt(req.query.page) || 1;
    const limit = 25;
    const offset = (page - 1) * limit;
    
    recupererPageListee(type, limit, offset, (erreur, resultats) => {
        if(erreur){
            console.error("Erreur lors de la récupération des Pokémon :", erreur);
            return res.status(500).json({ error: erreur.message });
        }
        res.json({
            type: type, 
            quantite: resultats.length,
            pokemons: resultats,
            pageActuelle: page
        });
    });
}

const addPokemon = async (req, res) => {
    const champsRequis = ['nom', 'type_primaire', 'type_secondaire', 'pv', 'attaque', 'defense'];
    const champsManquant = champsRequis.filter(field => !req.body[field]);
    
    if (champsManquant.length > 0){
        res.status(400)
        res.send({
            erreur: "Format des données invalide",
            champs_manquant: champsManquant
        });
        return;
    }

    const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;

    await pokemonModel.creerPokemon(nom, type_primaire, type_secondaire, pv, attaque, defense)
    .then((pokemon) => {
        res.status(200);
        res.send({
            pokemons: {
                id : pokemon.insertId,
                nom : nom,
                type_primaire : type_primaire,
                type_secondaire : type_secondaire,
                pv: pv, 
                attaque: attaque,
                defense: defense
            },
            message: `Le pokemon ${nom} a été ajouté avec succès`,
        });
    })
    .catch((erreur) => {
        res.status(500)
        res.send({
            "erreur": `Echec lors de la création du pokemon ${nom}`
        });
    });
}

//Exporter les functions qui vont gerer l'api
export{
    getIdPokemon,
    getListPokemons,
    addPokemon
}