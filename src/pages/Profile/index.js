import React,{useEffect, useState} from 'react';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css'

export default function Profile(){
  const [incidents,setIncidents] =useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  useEffect(()=>{
    api.get('profile',{
      headers:{
        Authorization:ongId,
      }
    }).then( response =>{
      setIncidents(response.data)
    })
  },[ongId])
  const  handleLogout = () =>{
    localStorage.clear()
    history.push('/')
  }
  const  handleDeleteIncident = async(id) => {
    try{
      await api.delete(`incidents/${id}`,{
        headers:{
          Authorization: ongId,
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id))
    }catch(err){
      alert('Erro ao deletar caso, tente novamente')
    }
  }
  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vindo, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout} >
          <FiPower size={18} color="#E02041"/>
        </button>
        
      </header>
      <h1>Casos Cadastrados</h1>
        <ul>
          {incidents.map(incident=>(
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>       
             <strong>DESCRIÇÂO:</strong>
             <p>{incident.description}</p>
             <p>{Intl.NumberFormat('pt-BR',{ style:'currency', currency: 'BRL'}).format(incident.value)}</p>
             <button type="button" onClick={()=>handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#A8A8B3"/>
             </button>
          </li>
          ))}
        </ul>
    </div>
  )
}