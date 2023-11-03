import './style.css';
import "font-awesome/css/font-awesome.css";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import axios from 'axios';
import Context from "../template/Context";
import ModalDelete from "../template/ModalDelete";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

 
const initialState = {
    numero:""
 }

export default function Salle() {
    const [state,setState] = useState(initialState);
    const {numero} = state;
    const [salles, setSalles] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!numero){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/salle/add',{  
              numero
           }).then(()=>{
              setState({numero:""});
              handleClose();
              toast.success("Ajout avec succès!")
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!numero){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/salle/edit/"+numItem,{   
              numero
           }).then((response)=>{
              if (response.status === 200) {
                setState({numero:""});
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
        axios.delete("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/salle/delete/"+id).then(function (response) {
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
        axios.get("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/salle/liste").then(function (response) {
        if (response.status === 200) {
            setSalles(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    const [numItem, setNumItem] = useState(1);
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (id) => {
        axios.get("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/salle/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

        return (
         <>
            <Modal show={show} onHide={handleClose}>
                <form  onSubmit={handleSubmit}>
                <ModalBody>
                    <ModalTitle className='text-center'>
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Nouvelle salle</h5><br/>
                    </ModalTitle>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="numero"
                    name="numero"
                    placeholder="Numéro de la salle"
                    value={numero}
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
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Modification</h5><br/>
                    </ModalTitle>
                    <form onSubmit={handleSubmitEdit}
                    >
                    <input
                    type="text"
                    id="numero"
                    name="numero"
                    placeholder="Numéro de la salle"
                    className="form-control"
                    value={numero || ""}
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
            <h6 className='text-center text-info mt-4' >Liste de toutes les salles</h6>
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
                        <th hidden style={{textAlign:"center",width:"50px"}}>N°</th>
                        <th style={{textAlign:"center",width:"300px"}}>Salle de classe</th>
                        <th style={{textAlign:"center",width:"150px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead>  

                    <tbody> 
                    {salles.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun donnée...</td>
                        </tr>
                        ) : (
                        salles.map((salle,index) => (
                            <tr key={index}>
                                <td hidden>{salle.id}</td>
                                <td style={{textAlign:"center"}}>{salle.numero}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => showDeleteModal(salle.id)}><i className="fa fa-trash"></i></button> 

                                    <button className="btn btn-success" onClick={() => showEditModal(salle.id)}><i className="fa fa-edit"></i></button> 
                                </td>
                            </tr>
                            )))}
                     </tbody>          
               </table>
                </div>
            </div>
                
               
            </div>
         </>
        );
}
