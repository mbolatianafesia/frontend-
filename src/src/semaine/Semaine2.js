import './style.css';
import "font-awesome/css/font-awesome.css";
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Context from "../template/Context";

export default function Semaine() {
    const { id } = useParams();
    const [semaines, setSemaines] = useState([]);

    useEffect(() => {
        getList();
    })

    function getList() {
        const numero = id.split('&');
        axios.get("http://a6714779b4dd24b53bfbc883f3178066-229242559.eu-west-3.elb.amazonaws.com:5000/disponibilite/liste/"+numero[0]).then(function (response) {
        if (response.status === 200) {
            setSemaines(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

        return (
         <>

            <Context/>
            <h6 className='text-center text-info mt-4' >Liste de toutes les semaines pendant lesquelles l'enseignant est disponible</h6>
            
            <div className="container mt-4">
                <table className="styled-table">
                    <thead>
                    <tr className='bg-light text-black'>
                        <th style={{textAlign:"center",width:"400px"}}>Semaine</th>
                        <th style={{textAlign:"center",width:"300px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead>            
                     
             

                     <tbody> 
                    {semaines.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucune disponibilité...</td>
                        </tr>
                        ) : (
                    semaines.map((semaine, index) => (
                        <tr key={index}>
                           <td style={{textAlign:"center"}}>Du {semaine.debut} jusqu'au {semaine.fin}</td>
                           <td>
                                <Link className="link"  to={`/about2/${semaine.debut}&${semaine.fin}&${id}`}>
                                    <button className="btn btn-sm btn-info"><i className="fa fa-eye"></i> voir l'emploi du temps</button>
                                </Link>
                             </td>
                        </tr>
                        ))
                    )}

                     </tbody>          
               </table>
            </div>
         </>
        );
}
