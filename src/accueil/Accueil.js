import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Context from "../template/Context";
import './style.css';
import recette from '../images/bg-2.png';
import { Link } from 'react-router-dom';

const Accueil = () =>{
    return(
        <>
        <Context/>
            <div id='fond'>
                <div id='texte'>
                    <div id='titre'>
                        <h3>Gestion des profs</h3>
                    </div>
                    <div id='para'>
                        <p>
                            Une application web pour gérer les profs à l'Ecole Nationale d'Informatique. 
                            Cette application permet aussi de générer un emploi de temps
                        </p>
                    </div>
                    <Link id="link" to="/enseignant">
                        <div id='bouton'>
                            Commencer
                        </div>
                    </Link>
                    
                </div>
                <div id='image'>
                    <img src={recette} alt="Face"/>
                </div>
            
            </div>
        </>
    )
}

export default Accueil; 