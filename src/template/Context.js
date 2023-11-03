import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import './Context.css';

export default function Context() {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleDropdownItemClick = () => {
    setButtonClicked(true);
  };

  // Déterminez la classe du bouton en fonction de buttonClicked
  const buttonClassName = buttonClicked ? 'acc red-button' : 'acc';

  return (
  <>
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
              <Dropdown.Toggle variant="" className={buttonClassName} style={{ color: "white", fontSize: "13px" }} id="dropdown-basic">
                CLASSE
              </Dropdown.Toggle>

              <Dropdown.Menu className="custom-dropdown-menu" style={{ textAlign: "left" }}>
                <Dropdown.Item onClick={handleDropdownItemClick}><Link className="link acc" to="/classe">Niveau & parcours</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleDropdownItemClick}><Link className="link acc" to="/salle">Salle à étudier</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="navbar-brand">
            <Dropdown>
              <Dropdown.Toggle variant="" className={buttonClassName} style={{ color: "white", fontSize: "13px" }} id="dropdown-basic">
                ENSEIGNEMENTS
              </Dropdown.Toggle>

              <Dropdown.Menu className="custom-dropdown-menu" style={{ textAlign: "left" }}>
                <Dropdown.Item onClick={handleDropdownItemClick}><Link className="link acc" to="/semaine">Semaine</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleDropdownItemClick}><Link className="link acc" to="/disponible">Disponibilité</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleDropdownItemClick}><Link className="link acc" to="/enseignement">Assigner un cours</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
