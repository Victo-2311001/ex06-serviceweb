import sql from './src/config/dp_pg.js';

//Requete qui vas chercher un pokemon selon son id
function recupererIdPokemon(id, callback){
    const requete = `SELECT * FROM public.pokemon where id = $1`;

    db.query(requete, [id], (erreur, resultats) => {
        if(erreur){
            return callback(erreur);
        }  
        return callback(null, resultats)
    }); 
}

//Requete qui vas chercher une liste avec des pokemons triers par un type ou toutes les pokemons
function recupererPageListee(type, limit, offset, callback){
    let requete;
    let params = [];

    //Si type est definit, la requexte vas chercher une liste de pokemons avec ce meme type
    if(type){
        requete = 'SELECT * FROM public.pokemon WHERE type_primaire = $1 LIMIT $2 OFFSET $3';
        params = [type, limit, offset]; 

        db.query(requete, params, (erreur, resultats) => {
            if(erreur){
                return callback(erreur);
            }  
            return callback(null, resultats)
        }); 
    }else{  
        //Si non, la requete vas chercher une liste avec toute les pokemons
        requete = 'SELECT * FROM public.pokemon LIMIT $2 OFFSET $3;';
        params = [limit, offset];

        db.query(requete, params, (erreur, resultats) => {
            if(erreur){
                return callback(erreur);
            }  
            return callback(null, resultats)
        }); 
    }
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