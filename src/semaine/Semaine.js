import './style.css';
import "font-awesome/css/font-awesome.css";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ModalBody, ModalFooter, ModalTitle, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import Context from "../template/Context";
import ModalDelete from "../template/ModalDelete";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

 
const initialState = {
    debut:"",
    fin:""
 }

export default function Semaine() {
    const [state,setState] = useState(initialState);
    const {debut,fin} = state;
    const [semaines, setSemaines] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!debut || !fin){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://localhost:5000/semaine/add',{  
              debut,
              fin
           }).then(()=>{
              setState({debut:"",fin:""});
              handleClose();
              toast.success("Ajout avec succès!")
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!debut || !fin){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://localhost:5000/semaine/edit/"+numItem,{   
              debut,
              fin
           }).then((response)=>{
              if (response.status === 200) {
                setState({debut:"",fin:""});
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

     //SUPPRESSION
     const deleteItem = (id) => {
        axios.delete("http://localhost:5000/semaine/delete/"+id).then(function (response) {
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
        axios.get("http://localhost:5000/semaine/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

    const [filterText, setFilterText] = useState('');
    const filteredSemaine = semaines.filter((semaine) =>
    semaine.debut.toLowerCase().includes(filterText.toLowerCase()) ||
    semaine.fin.toLowerCase().includes(filterText.toLowerCase())
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
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Nouvelle semaine</h5><br/>
                    </ModalTitle>

                    <input 
                    type='date' 
                    className='form-control' 
                    id="debut"
                    name="debut"
                    placeholder="Niveau"
                    value={debut}
                    onChange={handleInputChange}/><br/>

                    <input 
                    type='date' 
                    className='form-control' 
                    id="fin"
                    name="fin"
                    placeholder="fin"
                    value={fin}
                    onChange={handleInputChange}/><br/>
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
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Modification d'une matière</h5><br/>
                    </ModalTitle>
                    <form onSubmit={handleSubmitEdit} >
                    <input 
                    type='date' 
                    className='form-control' 
                    id="debut"
                    name="debut"
                    placeholder="Niveau"
                    value={debut || ""}
                    onChange={handleInputChange}/><br/>

                    <input 
                    type='date' 
                    className='form-control' 
                    id="fin"
                    name="fin"
                    placeholder="fin"
                    value={fin || ""}
                    onChange={handleInputChange}/><br/>

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
                confirmModal={deleteItem}
                hideModal={hideConfirmationModal}
                id={id}
                message={deleteMessage}
            />

            <Context/>
            
            <div className="container"> 
            <h6 className='text-center text-info mt-4' >Liste de toutes les semaines</h6>
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
                        <th style={{textAlign:"center",width:"200px"}}>Début de la semaine</th>
                        <th style={{textAlign:"center",width:"200px"}}>Fin de la semaine</th>
                        <th style={{textAlign:"center",width:"150px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead>

                    <tbody> 
                    {filteredSemaine.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun donnée...</td>
                        </tr>
                        ) : (
                    filteredSemaine.map((semaine,index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td style={{textAlign:"center"}}>{semaine.debut}</td>
                            <td style={{textAlign:"center"}}>{semaine.fin}</td>
                            <td>
                                <Link className="link"  to={`/about/${semaine.debut}et${semaine.fin}`}>
                                    <button className="btn btn-info"><i className="fa fa-eye"></i></button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => showDeleteModal(semaine.id)}><i className="fa fa-trash"></i></button> 

                                <button className="btn btn-success" onClick={() => showEditModal(semaine.id)}><i className="fa fa-edit"></i></button> 
                            </td>
                        </tr>
                        )))}

                     </tbody>          
               </table>
                </div>

                <div className='col-2'>
                <Form.Group>
        <Form.Control
          type="text"
          placeholder="Rechercher..."
          value={filterText}
          onChange={handleFilterChange}
          style={{width:"200px"}}
        />
      </Form.Group>
                </div>
            </div>
                
               
            </div>
         </>
        );
}
