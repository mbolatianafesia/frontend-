import './style.css';
import "font-awesome/css/font-awesome.css";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Context from "../template/Context";
import { Tab, Tabs, Panel, Accordion } from 'react-bootstrap';


export default function About(props) {
    const { id } = useParams();
    const [lundis, setLundis] = useState([]);
    const [mardis, setMardis] = useState([]);
    const [mercredis, setMercredis] = useState([]);
    const [jeudis, setJeudis] = useState([]);
    const [vendredis, setVendredis] = useState([]);
    const [samedis, setSamedis] = useState([]);

    function getSamedi() {
        const parametre = id.split('et');
        axios.get("http://localhost:5000/samedi/liste/"+parametre[0]+"/"+parametre[1]).then(function (response) {
        if (response.status === 200) {
            setSamedis(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getVendredi() {
        const parametre = id.split('et');
        axios.get("http://localhost:5000/vendredi/liste/"+parametre[0]+"/"+parametre[1]).then(function (response) {
        if (response.status === 200) {
            setVendredis(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getJeudi() {
        const parametre = id.split('et');
        axios.get("http://localhost:5000/jeudi/liste/"+parametre[0]+"/"+parametre[1]).then(function (response) {
        if (response.status === 200) {
            setJeudis(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getMercredi() {
        const parametre = id.split('et');
        axios.get("http://localhost:5000/mercredi/liste/"+parametre[0]+"/"+parametre[1]).then(function (response) {
        if (response.status === 200) {
            setMercredis(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getMardi() {
        const parametre = id.split('et');
        axios.get("http://localhost:5000/mardi/liste/"+parametre[0]+"/"+parametre[1]).then(function (response) {
        if (response.status === 200) {
            setMardis(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getLundi() {
        const parametre = id.split('et');
        axios.get("http://localhost:5000/lundi/liste/"+parametre[0]+"/"+parametre[1]).then(function (response) {
        if (response.status === 200) {
            setLundis(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }


    useEffect(() => {
        getLundi();
        getMardi();
        getMercredi();
        getJeudi();
        getVendredi();
        getSamedi();
    },[])

    const [active, setActive] = useState(false);

    const handleToggle = () => {
      setActive(!active);
    };
        return (
         <>

            <Context/>
            <div className="container mt-5">
            <h6 className='text-center text-success mt-4 mb-5' style={{fontFamily:'Century Gothic'}}>Emploi du temps pendant la semaine</h6>
                    <div className="align-items-center justify-content-center">
                      <Tabs defaultActiveKey={1} id="tabs">
                        <Tab eventKey={1} title="Lundi">
                            <h4 onClick={handleToggle} className={`panel-title ${active ? 'active' : ''}`}></h4>
                            <div id="collapseOne" expanded={active}>
                            <div className="container mt-5"> 
                            <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                            <th style={{textAlign:"center",width:"250px"}}>Heure</th>
                            <th style={{textAlign:"center",width:"300px"}}>Profs</th>
                            <th style={{textAlign:"center",width:"150px"}}>Matière</th>
                            <th style={{textAlign:"center",width:"150px"}}>Niveau</th>
                            <th style={{textAlign:"center",width:"150px"}}>N° Salle</th>
                        </tr>
                    </thead>            
                     
                    <tbody> 
                    {lundis.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun cours d'enseignement</td>
                        </tr>
                        ) : (
                    lundis.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.heure_debut} &nbsp; - &nbsp; {item.heure_fin}</td>
                            <td style={{ textAlign: "center" }}>{item.nom}</td>
                            <td style={{ textAlign: "center" }}>{item.libelle}</td>
                            <td style={{ textAlign: "center" }}>{item.design} {item.parcours}</td>
                            <td style={{ textAlign: "center" }}>{item.numero}</td>
                        </tr>
                        ))
                    )}

                     </tbody>            
               </table><br/><br/>
               </div>
                            </div>
                        </Tab>

                        <Tab eventKey={2} title="Mardi">
                            <h4 onClick={handleToggle} className={`panel-title ${active ? 'active' : ''}`}></h4>
                            <div id="collapseOne" expanded={active}>
                            <div className="container mt-5"> 
                            <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                            <th style={{textAlign:"center",width:"250px"}}>Heure</th>
                            <th style={{textAlign:"center",width:"300px"}}>Profs</th>
                            <th style={{textAlign:"center",width:"150px"}}>Matière</th>
                            <th style={{textAlign:"center",width:"150px"}}>Niveau</th>
                            <th style={{textAlign:"center",width:"150px"}}>N° Salle</th>
                        </tr>
                    </thead>            
                     
                    <tbody> 
                    {mardis.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun cours d'enseignement</td>
                        </tr>
                        ) : (
                    mardis.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.heure_debut} &nbsp; - &nbsp; {item.heure_fin}</td>
                            <td style={{ textAlign: "center" }}>{item.nom}</td>
                            <td style={{ textAlign: "center" }}>{item.libelle}</td>
                            <td style={{ textAlign: "center" }}>{item.design} {item.parcours}</td>
                            <td style={{ textAlign: "center" }}>{item.numero}</td>
                        </tr>
                        ))
                    )}

                     </tbody>            
               </table><br/><br/>
               </div>
                            </div>
                        </Tab>

                        <Tab eventKey={3} title="Mercredi">
                            <h4 onClick={handleToggle} className={`panel-title ${active ? 'active' : ''}`}></h4>
                            <div id="collapseOne" expanded={active}>
                            <div className="container mt-5"> 
                            <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                            <th style={{textAlign:"center",width:"250px"}}>Heure</th>
                            <th style={{textAlign:"center",width:"300px"}}>Profs</th>
                            <th style={{textAlign:"center",width:"150px"}}>Matière</th>
                            <th style={{textAlign:"center",width:"150px"}}>Niveau</th>
                            <th style={{textAlign:"center",width:"150px"}}>N° Salle</th>
                        </tr>
                    </thead>            
                     
                    <tbody> 
                    {mercredis.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun cours d'enseignement</td>
                        </tr>
                        ) : (
                    mercredis.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.heure_debut} &nbsp; - &nbsp; {item.heure_fin}</td>
                            <td style={{ textAlign: "center" }}>{item.nom}</td>
                            <td style={{ textAlign: "center" }}>{item.libelle}</td>
                            <td style={{ textAlign: "center" }}>{item.design} {item.parcours}</td>
                            <td style={{ textAlign: "center" }}>{item.numero}</td>
                        </tr>
                        ))
                    )}

                     </tbody>            
               </table><br/><br/>
               </div>
                            </div>
                        </Tab>

                        <Tab eventKey={4} title="Jeudi">
                            <h4 onClick={handleToggle} className={`panel-title ${active ? 'active' : ''}`}></h4>
                            <div id="collapseOne" expanded={active}>
                            <div className="container mt-5"> 
                            <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                            <th style={{textAlign:"center",width:"250px"}}>Heure</th>
                            <th style={{textAlign:"center",width:"300px"}}>Profs</th>
                            <th style={{textAlign:"center",width:"150px"}}>Matière</th>
                            <th style={{textAlign:"center",width:"150px"}}>Niveau</th>
                            <th style={{textAlign:"center",width:"150px"}}>N° Salle</th>
                        </tr>
                    </thead>            
                     
                    <tbody> 
                    {jeudis.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun cours d'enseignement</td>
                        </tr>
                        ) : (
                    jeudis.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.heure_debut} &nbsp; - &nbsp; {item.heure_fin}</td>
                            <td style={{ textAlign: "center" }}>{item.nom}</td>
                            <td style={{ textAlign: "center" }}>{item.libelle}</td>
                            <td style={{ textAlign: "center" }}>{item.design} {item.parcours}</td>
                            <td style={{ textAlign: "center" }}>{item.numero}</td>
                        </tr>
                        ))
                    )}

                     </tbody>            
               </table><br/><br/>
               </div>
                            </div>
                        </Tab>


                        <Tab eventKey={5} title="Vendredi">
                            <h4 onClick={handleToggle} className={`panel-title ${active ? 'active' : ''}`}></h4>
                            <div id="collapseOne" expanded={active}>
                            <div className="container mt-5"> 
                            <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                            <th style={{textAlign:"center",width:"250px"}}>Heure</th>
                            <th style={{textAlign:"center",width:"300px"}}>Profs</th>
                            <th style={{textAlign:"center",width:"150px"}}>Matière</th>
                            <th style={{textAlign:"center",width:"150px"}}>Niveau</th>
                            <th style={{textAlign:"center",width:"150px"}}>N° Salle</th>
                        </tr>
                    </thead>            
                     
                    <tbody> 
                    {vendredis.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun cours d'enseignement</td>
                        </tr>
                        ) : (
                    vendredis.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.heure_debut} &nbsp; - &nbsp; {item.heure_fin}</td>
                            <td style={{ textAlign: "center" }}>{item.nom}</td>
                            <td style={{ textAlign: "center" }}>{item.libelle}</td>
                            <td style={{ textAlign: "center" }}>{item.design} {item.parcours}</td>
                            <td style={{ textAlign: "center" }}>{item.numero}</td>
                        </tr>
                        ))
                    )}

                     </tbody>            
               </table><br/><br/>
               </div>
                            </div>
                        </Tab>

                        <Tab eventKey={6} title="Samedi">
                            <h4 onClick={handleToggle} className={`panel-title ${active ? 'active' : ''}`}></h4>
                            <div id="collapseOne" expanded={active}>
                            <div className="container mt-5"> 
               <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                           <th style={{textAlign:"center",width:"250px"}}>Heure</th>
                            <th style={{textAlign:"center",width:"300px"}}>Profs</th>
                            <th style={{textAlign:"center",width:"150px"}}>Matière</th>
                            <th style={{textAlign:"center",width:"150px"}}>Niveau</th>
                            <th style={{textAlign:"center",width:"150px"}}>N° Salle</th>
                        </tr>
                    </thead>            
                     
                    <tbody> 
                    {samedis.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun cours d'enseignement</td>
                        </tr>
                        ) : (
                    samedis.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.heure_debut} &nbsp; - &nbsp; {item.heure_fin}</td>
                            <td style={{ textAlign: "center" }}>{item.nom}</td>
                            <td style={{ textAlign: "center" }}>{item.libelle}</td>
                            <td style={{ textAlign: "center" }}>{item.design} {item.parcours}</td>
                            <td style={{ textAlign: "center" }}>{item.numero}</td>
                        </tr>
                        ))
                    )}

                     </tbody>           
               </table><br/>             
            </div>
                            </div>
                        </Tab>
                      </Tabs>
                    </div>
            </div>
            
            
         </>
        );
}
