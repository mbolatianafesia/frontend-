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
    libelle:""
 }

export default function Matiere() {
    const [state,setState] = useState(initialState);
    const {libelle} = state;
    const [matieres, setMatieres] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!libelle){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://localhost:5000/matiere/add',{  
              libelle
           }).then(()=>{
              setState({libelle:""});
              handleClose();
              toast.success("Ajout avec succès!")
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!libelle){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://localhost:5000/matiere/edit/"+numItem,{   
              libelle
           }).then((response)=>{
              if (response.status === 200) {
                setState({libelle:""});
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
        axios.delete("http://localhost:5000/matiere/delete/"+id).then(function (response) {
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
        axios.get("http://localhost:5000/matiere/liste").then(function (response) {
        if (response.status === 200) {
            setMatieres(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    const [numItem, setNumItem] = useState(1);
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (id) => {
        axios.get("http://localhost:5000/matiere/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

    const [filterText, setFilterText] = useState('');
    const filteredMatieres = matieres.filter((matiere) =>
    matiere.libelle.toLowerCase().includes(filterText.toLowerCase())
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
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Nouvelle matière</h5><br/>
                    </ModalTitle>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="libelle"
                    name="libelle"
                    placeholder=""
                    value={libelle}
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
                    <form style={{
                    margin:"auto",
                    padding:"15px",
                    maxWidth:"450px",
                    fontFamily:"cambria",
                    fontSize:"13pt",
                    alignContent:"center"
                    }}
                    onSubmit={handleSubmitEdit}
                    >
                    <input
                    type="text"
                    id="libelle"
                    name="libelle"
                    placeholder=""
                    className="form-control"
                    value={libelle || ""}
                    onChange={handleInputChange}
                    /><br/>

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
            <h6 className='text-center text-info mt-4' >Liste de toutes les matières</h6>
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
                        <th style={{textAlign:"center",width:"300px"}}>Matières</th>
                        <th style={{textAlign:"center",width:"150px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead> 

                    <tbody> 
                    {filteredMatieres.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun donnée...</td>
                        </tr>
                        ) : (
                    filteredMatieres.map((matiere,index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td style={{textAlign:"center"}}>{matiere.libelle}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => showDeleteModal(matiere.id)}><i className="fa fa-trash"></i></button> 

                                <button className="btn btn-success" onClick={() => showEditModal(matiere.id)}><i className="fa fa-edit"></i></button> 
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
