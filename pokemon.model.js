import db from './src/config/dp_pg.js';

//Requete qui vas chercher un pokemon selon son id
function recupererIdPokemon(id, callback){
    const requete = `SELECT * FROM public.pokemon where id = $1`;

    db.query(requete, [id], (erreur, resultats) => {
        if(erreur){
            return callback(erreur);
        }  
        return callback(null, resultats.rows)
    }); 
}

//Requete qui vas chercher une liste avec des pokemons triers par un type ou toutes les pokemons
function recupererPageListee(type, limit, offset, callback) {
    let requete;
    let params = [];

    if (type) {
        // Si un type est défini, filtrer les Pokémon par type
        requete = 'SELECT * FROM public.pokemon WHERE type_primaire = $1 LIMIT $2 OFFSET $3';
        params = [type, limit, offset];
    } else {
        // Si aucun type n'est défini, récupérer tous les Pokémon
        requete = 'SELECT * FROM public.pokemon LIMIT $1 OFFSET $2;';
        params = [limit, offset]; // Correction des paramètres
    }

    db.query(requete, params, (erreur, resultats) => {
        if (erreur) {
            return callback(erreur);
        }
        return callback(null, resultats);
    });
}


const creerPokemon = (nom, type1, type2, pv, attaque, defense) => {
    return new Promise ((resolve, reject) => {
        const requete = `UPDATE public.pokemon SET nom = $, type_primaire = $, type_secondaire = $, pv = $, attaque = $, defense = $ WHERE id = $`;
        const params = [nom, type1, type2, pv, attaque, defense, id]
        
        db.query(requete, params, (erreur, resultats) =>{
            if(erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultats);
        })
    })
}

//Exporter les requetes
export {
    recupererIdPokemon,
    recupererPageListee,
    creerPokemon
};