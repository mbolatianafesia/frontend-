import React, { useState , useEffect  } from 'react';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import './Context.css';
import { useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export default function Context() {
  const [buttonClicked, setButtonClicked] = useState(() => {
    const storedButtonClicked = localStorage.getItem('buttonClicked');
    return storedButtonClicked ? JSON.parse(storedButtonClicked) : true;
  });

  // Étape 2 : Mettre à jour le localStorage lorsqu'il y a des changements d'état
  useEffect(() => {
    localStorage.setItem('buttonClicked', JSON.stringify(buttonClicked));
  }, [buttonClicked]);

  // Étape 3 : Définir la fonction de gestion du clic
  const handleDropdownItemClick = () => {
    setButtonClicked(!buttonClicked);
  };
  return (
  <>
      {
        buttonClicked ? 
        <div className="button-container">
           <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={handleDropdownItemClick}/>
          </Link>
      </div>
      
          :
      
    <header>
       <nav className={`navbar navbar-expand-md custom-navbar`}>
        <div id="logo">
          <Link className="link" to="/accueil">
            <h6>PROFS</h6>
          </Link>
        </div>
        
        <div className="navbar-nav ms-auto d-flex align-items-right justify-content-center">
          <div className="navbar-brand">
            <Link className="link" to="/matiere">
              <div className="align-items-center acc mt-2">
                COURS
              </div>
            </Link>
          </div>

          <div className="navbar-brand">
            <Link className="link" to="/enseignant">
              <div className="align-items-center acc mt-2">
                ENSEIGNANTS
              </div>
            </Link>
          </div>
          
          <div className="navbar-brand">
            <Dropdown>
              <Dropdown.Toggle variant=""  style={{ color: "white", fontSize: "13px" }} id="dropdown-basic">
                CLASSE
              </Dropdown.Toggle>

              <Dropdown.Menu className="custom-dropdown-menu" style={{ textAlign: "left" }}>
                <Dropdown.Item onClick={handleDropdownItemClick} className='hov' ><Link className="link acc" to="/classe">Niveau & parcours</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleDropdownItemClick} className='hov'><Link className="link acc" to="/salle">Salle à étudier</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="navbar-brand">
            <Dropdown>
              <Dropdown.Toggle variant="" style={{ color: "white", fontSize: "13px" }} id="dropdown-basic">
                ENSEIGNEMENTS
              </Dropdown.Toggle>

              <Dropdown.Menu className="custom-dropdown-menu" style={{ textAlign: "left" }} >
                <Dropdown.Item onClick={handleDropdownItemClick} className='hov'><Link className="link acc" to="/semaine">Semaine</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleDropdownItemClick} className='hov'><Link className="link acc" to="/disponible">Disponibilité</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleDropdownItemClick} className='hov'><Link className="link acc" to="/enseignement">Assigner un cours</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
              <Link to='#' className='menu-bars close-btn' onClick={handleDropdownItemClick} >
                <AiIcons.AiOutlineClose />
              </Link>
        </div>
      </nav>
    </header>
      }
    </>
  );
}
