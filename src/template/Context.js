import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import './Context.css';

export default function Context() {
  const [buttonClicked, setButtonClicked] = useState(true);

  const handleDropdownItemClick = () => {
    setButtonClicked(!buttonClicked);
  };

  return (
  <>
    <header>
      {
        buttonClicked ? 
        <div className="button-container">
        <button onClick={handleDropdownItemClick}>
        <img src="images/io.png" alt="Description de l'image" />
        Click me
      </button>
      </div>
      
          :
      
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
              <button onClick={handleDropdownItemClick} >
              <div className="butt-container">
                    <img src={Image} alt="images/menu2.jpg"/>
                </div>
              </button>
            </Dropdown>
          </div>
        </div>
      </nav>
      }
    </header>
    </>
  );
}
