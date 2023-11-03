import './styles.css';
import "font-awesome/css/font-awesome.css";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { ModalBody, ModalFooter, ModalTitle, Form } from 'react-bootstrap'
import axios from 'axios';
import Context from "../template/Context";
import ModalDelete from "../template/ModalDelete";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

 
const initialState = {
    nom:"",
    adresse:"",
    telephone:"",
    grade:""
 }

export default function Enseignant() {
    const [state,setState] = useState(initialState);
    const {nom,adresse,telephone,grade} = state;
    const [enseignants, setEnseignants] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!nom || !adresse || !telephone || !grade){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/enseignant/add',{  
              nom,
              adresse,
              telephone,
              grade
           }).then(()=>{
              setState({nom:"", adresse:"", telephone:"", grade:""});
              handleClose();
              toast.success("Ajout avec succès!")
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!nom || !adresse || !telephone || !grade){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/enseignant/edit/"+numItem,{   
              nom,
              adresse,
              telephone,
              grade
           }).then((response)=>{
              if (response.status === 200) {
                setState({nom:"", adresse:"", telephone:"", grade:""});
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
        axios.delete("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/enseignant/delete/"+id).then(function (response) {
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
        axios.get("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/enseignant/liste").then(function (response) {
        if (response.status === 200) {
            setEnseignants(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    const [numItem, setNumItem] = useState(1);
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (id) => {
        axios.get("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/enseignant/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

    const [filterText, setFilterText] = useState('');
    const filteredProf = enseignants.filter((enseignant) =>
    enseignant.nom.toLowerCase().includes(filterText.toLowerCase()) || 
    enseignant.grade.toLowerCase().includes(filterText.toLowerCase())
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
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Nouveau enseignants</h5><br/>
                    </ModalTitle>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="nom"
                    name="nom"
                    placeholder="Nom de l'enseignant"
                    value={nom}
                    onChange={handleInputChange}/><br/>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="adresse"
                    name="adresse"
                    placeholder="Adresse de l'enseignant"
                    value={adresse}
                    onChange={handleInputChange}/><br/>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="telephone"
                    name="telephone"
                    placeholder="Téléphone de l'enseignant"
                    value={telephone}
                    onChange={handleInputChange}/><br/>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="grade"
                    name="grade"
                    placeholder="Grade de l'enseignant"
                    value={grade}
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
                    id="nom"
                    name="nom"
                    placeholder="Nom de l'enseignant"
                    className="form-control"
                    value={nom || ""}
                    onChange={handleInputChange}
                    /><br/>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="adresse"
                    name="adresse"
                    placeholder="Adresse de l'enseignant"
                    value={adresse || ""}
                    onChange={handleInputChange}/><br/>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="telephone"
                    name="telephone"
                    placeholder="Téléphone de l'enseignant"
                    value={telephone || ""}
                    onChange={handleInputChange}/><br/>

                    <input 
                    type='text' 
                    className='form-control' 
                    id="grade"
                    name="grade"
                    placeholder="Grade de l'enseignant"
                    value={grade || ""}
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
            <h6 className='text-center text-info mt-4' >Liste de tous les enseignants</h6>
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
                        <th style={{textAlign:"center",width:"150px"}}>Nom</th>
                        <th style={{textAlign:"center",width:"150px"}}>Adresse</th>
                        <th style={{textAlign:"center",width:"150px"}}>Téléphone</th>
                        <th style={{textAlign:"center",width:"150px"}}>Grade</th>
                        <th style={{textAlign:"center",width:"200px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead> 

                    <tbody> 
                    {filteredProf.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun donnée...</td>
                        </tr>
                        ) : (
                    filteredProf.map((enseignant,index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td style={{textAlign:"center"}}>{enseignant.nom}</td>
                            <td style={{textAlign:"center"}}>{enseignant.adresse}</td>
                            <td style={{textAlign:"center"}}>+ 261 {enseignant.telephone}</td>
                            <td style={{textAlign:"center"}}>{enseignant.grade}</td>
                            <td> 
                                <Link className="link"  to={`/semaine2/${enseignant.id}&${enseignant.nom}`}>
                                    <button className="btn btn-info btn-sm" style={{fontSize:"12px"}}>Disponibilité</button>
                                </Link>
                                
                                <button className="btn btn-danger" onClick={() => showDeleteModal(enseignant.id)}><i className="fa fa-trash"></i></button> 

                                <button className="btn btn-success" onClick={() => showEditModal(enseignant.id)}><i className="fa fa-edit"></i></button> 
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
