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
    id_p:0,
    id_se:0,
    status:""
 }

export default function Disponibilite() {
    const [state,setState] = useState(initialState);
    const {id_p, id_se, status} = state;
    const [disponibles, setDisponibles] = useState([]);
    const [enseignants, setEnseignants] = useState([]);
    const [semaines, setSemaines] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        getEnseignant();
        getSemaine();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!id_p || !id_se || !status){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://localhost:5000/disponible/add',{  
              id_p,
              id_se,
              status
           }).then(()=>{
            setState({id_p:0, id_se:0,status:""});
              handleClose();
              toast.success("Ajout avec succès!")
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!status){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://localhost:5000/disponible/edit/"+numItem,{   
            status
           }).then((response)=>{
              if (response.status === 200) {
                setState({status:""});
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
    })
  
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
        axios.delete("http://localhost:5000/disponible/delete/"+id).then(function (response) {
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
        axios.get("http://localhost:5000/disponible/liste").then(function (response) {
        if (response.status === 200) {
            setDisponibles(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getEnseignant() {
        axios.get("http://localhost:5000/enseignant/liste").then(function (response) {
        if (response.status === 200) {
            setEnseignants(response.data);
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
        axios.get("http://localhost:5000/disponible/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

    const [filterText, setFilterText] = useState('');
    const disponibles2 = disponibles.filter((disponible) =>
    disponible.nom.toLowerCase().includes(filterText.toLowerCase()) ||
    disponible.debut.toLowerCase().includes(filterText.toLowerCase()) ||
    disponible.fin.toLowerCase().includes(filterText.toLowerCase()) ||
    disponible.status.toLowerCase().includes(filterText.toLowerCase())
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
                        id="id_se"
                        name="id_se"
                        className='form-control'
                        value={state.id_se}
                        onChange={handleSelectChange2}
                        >
                        <option value="">Sélectionnez une semaine</option>
                         {semaines.map((semaine,index) => (
                        <option value={semaine.id}>{semaine.debut} - {semaine.fin}</option>
                     ))}
                    </select><br/>

                    <select
                        id="status"
                        name="status"
                        className='form-control'
                        value={state.status}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Disponibilité:</option>
                        <option value="OUI">OUI</option>
                        <option value="NON">NON</option>
                    </select>

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

                    <select
                        id="status"
                        name="status"
                        className='form-control'
                        value={state.status || ""}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Disponibilité:</option>
                        <option value="OUI">OUI</option>
                        <option value="NON">NON</option>
                    </select>
                   

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
            <h6 className='text-center text-info mt-4' >Disponibilité de tous les enseignants</h6> 
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
                        <th style={{textAlign:"center",width:"50px"}}>N°</th>
                        <th style={{textAlign:"center",width:"250px"}}>Semaine</th>
                        <th style={{textAlign:"center",width:"250px"}}>Enseignants</th>
                        <th style={{textAlign:"center",width:"150px"}}>Disponibilité</th>
                        <th style={{textAlign:"center",width:"100px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead>  

                    <tbody> 
                    {disponibles2.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun donnée...</td>
                        </tr>
                        ) : (
                        disponibles2.map((disponible,index) => (
                            <tr key={index}>
                                <td style={{textAlign:"center"}}>{index + 1}</td>
                                <td style={{textAlign:"center"}}>Du {disponible.debut} &nbsp; au &nbsp; {disponible.fin}</td>
                                <td style={{textAlign:"center"}}>{disponible.nom}</td>
                                <td style={{textAlign:"center"}}>{disponible.status}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => showDeleteModal(disponible.id)}><i className="fa fa-trash"></i></button> 
    
                                    <button className="btn btn-success" onClick={() => showEditModal(disponible.id)}><i className="fa fa-edit"></i></button> 
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
