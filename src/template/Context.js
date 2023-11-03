import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import './Context.css';

export default function Context() {
  return (
    <>
      <header>
        {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark"> */}
        <nav className="navbar navbar-expand-md bg-light">
          
            <div id="logo">
              <Link className="link" to="/accueil">
              <h6>hehe</h6>
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
                  <Dropdown.Toggle variant="" className='acc' style={{color:"#008BBE",fontSize:"13px"}} id="dropdown-basic">
                    CLASSE
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{textAlign:"left"}}>
                    <Dropdown.Item><Link className="link acc" to="/classe">Niveau & parcours</Link></Dropdown.Item>
                    <Dropdown.Item><Link className="link acc" to="/salle">Salle à étudier</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>              
            </div>

            <div className="navbar-brand">
                <Dropdown>
                  <Dropdown.Toggle variant="" className='acc' style={{color:"#008BBE",fontSize:"13px"}} id="dropdown-basic">
                    ENSEIGNEMENTS
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{textAlign:"left"}}>
                    <Dropdown.Item><Link className="link acc" to="/semaine">Semaine</Link></Dropdown.Item>
                    <Dropdown.Item><Link className="link acc" to="/disponible">Disponibilité</Link></Dropdown.Item>
                    <Dropdown.Item><Link className="link acc" to="/enseignement">Assigner un cours</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>              
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
