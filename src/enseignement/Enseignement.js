import './style.css';
import "font-awesome/css/font-awesome.css";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ModalBody, ModalFooter, ModalTitle, Form } from 'react-bootstrap'
import axios from 'axios';
import Context from "../template/Context";
import ModalDelete from "../template/ModalDelete";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

 
const initialState = {
    id_se:0,
    id_p:0,
    id_m:0,
    id_s:0,
    id_c:0,
    date_jour:"",
    jour:"",
    heure_debut:"",
    heure_fin:""
 }

export default function Enseignement() {
    const [state,setState] = useState(initialState);
    const {id_se,id_p,id_m,id_s,id_c,date_jour,jour,heure_debut,heure_fin} = state;
    const [enseignements, setEnseignements] = useState([]);
    const [enseignants, setEnseignants] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [salles, setSalles] = useState([]);
    const [classes, setClasses] = useState([]);
    const [semaines, setSemaines] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        getMatiere();
        getClasse();
        getSalle();
        getSemaine();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!id_p || !id_m || !id_s || !id_c || !date_jour || !jour || !heure_debut || !heure_fin){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://localhost:5000/enseignement/add',{  
              id_p,
              id_m,
              id_s,
              id_c,
              date_jour,
              jour,
              heure_debut,
              heure_fin
           }).then(()=>{
            setState({id_p:0, id_m:0, id_s:0, id_c:0,date_jour:"",jour:"",heure_debut:"",heure_fin:""});
              handleClose();
              toast.success("Ajout avec succès!")
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!date_jour || !jour || !heure_debut || !heure_fin){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://localhost:5000/enseignement/edit/"+numItem,{   
            date_jour,
            jour,
            heure_debut,
            heure_fin
           }).then((response)=>{
              if (response.status === 200) {
                setState({nb_heure:0});
                toast.success("Modification avec succès")
                onClose();
              }
              else{
                toast.error("Il y a sûrement une erreur")
              } 
           })
        }
     }

     function onClose() {
        closeEditModal();
      }

     useEffect(() => {
        getList();

        if (id_se) {
            const d = id_se.split('&');
            axios.get("http://localhost:5000/disponible/liste/"+d[0]+"/"+d[1]).then(function (response) {
        if (response.status === 200) {
            setEnseignants(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }
    }, [id_se])
  
     const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
     }

     const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

      const handleSelectChange2 = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

      const handleSelectChange3 = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

     //SUPPRESSION
     const deleteVendeur = (id) => {
        axios.delete("http://localhost:5000/enseignement/delete/"+id).then(function (response) {
          setDisplayConfirmationModal(false);
          toast.success(`Suppression bien réussie`);
      });
  
    };

    const [displayConfirmationModal, setDisplayConfirmationModal] =
		useState(false);

	const [deleteMessage, setDeleteMessage] = useState(null);

    const [id, setId] = useState(null);

	const showDeleteModal = (id) => {
		setId(id);
		setDeleteMessage(
			`Voulez-vous vraiment supprimer cette ligne?`
		);
		setDisplayConfirmationModal(true);
	};

	const hideConfirmationModal = () => {
		setDisplayConfirmationModal(false);
	};

    function getList() {
        axios.get("http://localhost:5000/enseignement/liste").then(function (response) {
        if (response.status === 200) {
            setEnseignements(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getMatiere() {
        axios.get("http://localhost:5000/matiere/liste").then(function (response) {
        if (response.status === 200) {
            setMatieres(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getClasse() {
        axios.get("http://localhost:5000/classe/liste").then(function (response) {
        if (response.status === 200) {
            setClasses(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getSalle() {
        axios.get("http://localhost:5000/salle/liste").then(function (response) {
        if (response.status === 200) {
            setSalles(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getSemaine() {
        axios.get("http://localhost:5000/semaine/liste").then(function (response) {
        if (response.status === 200) {
            setSemaines(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    const [numItem, setNumItem] = useState(1);
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (id) => {
        axios.get("http://localhost:5000/enseignement/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

    const [filterText, setFilterText] = useState('');
    const enseignements2 = enseignements.filter((enseignement) =>
    enseignement.nom.toLowerCase().includes(filterText.toLowerCase()) ||
    enseignement.libelle.toLowerCase().includes(filterText.toLowerCase())||
    enseignement.numero.toLowerCase().includes(filterText.toLowerCase())||
    enseignement.design.toLowerCase().includes(filterText.toLowerCase())||
    enseignement.parcours.toLowerCase().includes(filterText.toLowerCase())||
    enseignement.heure_debut.toLowerCase().includes(filterText.toLowerCase())||
    enseignement.heure_fin.toLowerCase().includes(filterText.toLowerCase())
  );
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
      };

        return (
         <>
            <Modal show={show} onHide={handleClose}>
                <form  onSubmit={handleSubmit}>
                <ModalBody>
                    <ModalTitle className='text-center'>
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Ajout</h5><br/>
                    </ModalTitle>

                    <select
                        id="id_se"
                        name="id_se"
                        className='form-control'
                        value={state.id_se}
                        onChange={handleSelectChange}
                        >
                        <option value="">Sélectionnez la semaine:</option>
                         {semaines.map((semaine,index) => (
                        <option value={semaine.debut + "&" + semaine.fin}>Du {semaine.debut} au {semaine.fin}</option>
                     ))}
                    </select><br/>

                    <select
                        id="id_p"
                        name="id_p"
                        className='form-control'
                        value={state.id_p}
                        onChange={handleSelectChange}
                        >
                        <option value="">Sélectionnez un enseignant:</option>
                         {enseignants.map((enseignant,index) => (
                        <option value={enseignant.id}>{enseignant.nom}</option>
                     ))}
                    </select><br/>

                    <select
                        id="id_m"
                        name="id_m"
                        className='form-control'
                        value={state.id_m}
                        onChange={handleSelectChange2}
                        >
                        <option value="">Sélectionnez une matière</option>
                         {matieres.map((matiere,index) => (
                        <option value={matiere.id}>{matiere.libelle}</option>
                     ))}
                    </select><br/>

                    <div className='row'>
                        <div className='col'>
                        <select
                        id="id_s"
                        name="id_s"
                        className='form-control'
                        value={state.id_s}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Sélectionnez une salle:</option>
                         {salles.map((salle,index) => (
                        <option value={salle.id}>{salle.numero}</option>
                     ))}
                    </select>
                        </div>

                        <div className='col'>
                        <select
                        id="id_c"
                        name="id_c"
                        className='form-control'
                        value={state.id_c}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Sélectionnez un niveau:</option>
                         {classes.map((classe,index) => (
                        <option value={classe.id}>{classe.design} {classe.parcours}</option>
                     ))}
                    </select>
                        </div>
                    </div><br/>

                    <div className='row'>
                        <div className='col'>
                        <input 
                    type='date' 
                    className='form-control' 
                    id="date_jour"
                    name="date_jour"
                    placeholder="Date du jour"
                    value={date_jour}
                    onChange={handleInputChange}/>
                        </div>

                        <div className='col'>
                        <select
                        id="jour"
                        name="jour"
                        className='form-control'
                        value={state.jour}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Sélectionnez le jour:</option>
                        <option value="Lundi">Lundi</option>
                        <option value="Mardi">Mardi</option>
                        <option value="Mercredi">Mercredi</option>
                        <option value="Jeudi">Jeudi</option>
                        <option value="Vendredi">Vendredi</option>
                        <option value="Samedi">Samedi</option>
                    </select>
                        </div>
                    </div><br/>

                    <div className='row'>
                        <div className='col'>
                        <                   select
                        id="heure_debut"
                        name="heure_debut"
                        className='form-control'
                        value={state.heure_debut}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Début de l'heure:</option>
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                    </select><br/>
                        </div>

                        <div className='col'>
                        <select
                        id="heure_fin"
                        name="heure_fin"
                        className='form-control'
                        value={state.heure_fin}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Fin de l'heure:</option>
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                    </select>
                        </div>
                    </div>

                </ModalBody>
            
                <ModalFooter>
                    <Button variant='secondary' style={{fontFamily: "Century gothic"}} onClick={handleClose}>
                        Fermer
                    </Button>

                    <Button type="submit" style={{fontFamily: "Century gothic"}} variant='primary'>
                        Ajouter
                    </Button>
                </ModalFooter>
                </form>
            </Modal>

            <Modal
                size="md"
                show={showEdit}
                onHide={closeEditModal}
                backdrop="static"
                keyboard={false}
            >

                <ModalBody>
                    <ModalTitle className='text-center'>
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Modification</h5><br/>
                    </ModalTitle>
                    <form onSubmit={handleSubmitEdit}
                    >

                <input 
                    type='date' 
                    className='form-control' 
                    id="date_jour"
                    name="date_jour"
                    placeholder="Date du jour"
                    value={date_jour || ""}
                    onChange={handleInputChange}/><br/>

                    <select
                        id="jour"
                        name="jour"
                        className='form-control'
                        value={jour || ""}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Sélectionnez le jour:</option>
                        <option value="Lundi">Lundi</option>
                        <option value="Mardi">Mardi</option>
                        <option value="Mercredi">Mercredi</option>
                        <option value="Jeudi">Jeudi</option>
                        <option value="Vendredi">Vendredi</option>
                        <option value="Samedi">Samedi</option>
                    </select><br/>

<                   select
                        id="heure_debut"
                        name="heure_debut"
                        className='form-control'
                        value={heure_debut || ""}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Sélectionnez l'heure de début:</option>
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                    </select><br/>

                    <select
                        id="heure_fin"
                        name="heure_fin"
                        className='form-control'
                        value={heure_fin || ""}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Sélectionnez l'heure de fin:</option>
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                    </select><br/>
                   

                    <ModalFooter>
                        <Button variant='secondary' style={{fontFamily: "Century gothic"}} onClick={closeEditModal}>
                            Fermer
                        </Button>

                        <Button type="submit" style={{fontFamily: "Century gothic"}} variant='primary'>
                            Modifier
                        </Button>
                    </ModalFooter>
                    </form>   
                </ModalBody>
            </Modal>

            <ModalDelete
                showModal={displayConfirmationModal}
                confirmModal={deleteVendeur}
                hideModal={hideConfirmationModal}
                id={id}
                message={deleteMessage}
            />

            <Context/>
            
            <div className="container"> 
            <h6 className='text-center text-info mt-4' >Liste du programme d'enseignement</h6>
            <div className='row mt-4'>
                <div className='col-1'>
                <div id='btn_ajouter' onClick={handleShow}>
                        AJOUTER &nbsp; <i className='fa fa-plus'></i>
                    </div>
                </div>
                <div className='col'>
                <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                        <th style={{textAlign:"center",width:"100px"}}>N°</th>
                        <th style={{textAlign:"center",width:"100px"}}>Enseignant</th>
                        <th style={{textAlign:"center",width:"100px"}}>Matière</th>
                        <th style={{textAlign:"center",width:"50px"}}>Salle</th>
                        <th style={{textAlign:"center",width:"50px"}}>Classe</th>
                        <th style={{textAlign:"center",width:"200px"}}>Date du jour</th>
                        <th style={{textAlign:"center",width:"100px"}}>Heures</th>
                        <th style={{textAlign:"center",width:"100px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead> 

                    <tbody> 
                    {enseignements2.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun donnée...</td>
                        </tr>
                        ) : (
                        enseignements2.map((enseignement,index) => (
                            <tr key={index}>
                                <td style={{textAlign:"center"}}>{index + 1}</td>
                                <td style={{textAlign:"center"}}>{enseignement.id_p} {enseignement.nom}</td>
                                <td style={{textAlign:"center"}}>{enseignement.libelle}</td>
                                <td style={{textAlign:"center"}}>{enseignement.numero}</td>
                                <td style={{textAlign:"center"}}>{enseignement.design} {enseignement.parcours}</td>
                                <td style={{textAlign:"center"}}>{enseignement.date_jour} ({enseignement.jour})</td>
                                <td style={{textAlign:"center"}}>{enseignement.heure_debut} - {enseignement.heure_fin}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => showDeleteModal(enseignement.id)}><i className="fa fa-trash"></i></button> 
    
                                    <button className="btn btn-success" onClick={() => showEditModal(enseignement.id)}><i className="fa fa-edit"></i></button> 
                                </td>
                            </tr>
                            )))}
                     </tbody>           
               </table>
                </div>

                <div className='col-1'>
                <Form.Group>
        <Form.Control
          type="text"
          placeholder="Rechercher..."
          value={filterText}
          onChange={handleFilterChange}
          style={{width:"160px"}}
        />
      </Form.Group>
                </div>
            </div>
                
               
            </div>
         </>
        );
}
