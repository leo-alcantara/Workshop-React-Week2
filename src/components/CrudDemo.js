import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import TableData from './TableData';

const baseURL = "http://localhost:8080/api/v1/person/";

const CrudDemo = () => {

    const [persons, setPersons] = useState([]);
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [showData, setShowData] = useState(false);
    const initialData = {id:0, title:"", firstName:"", lastName:"", email:""};
    const [person, setPerson] = useState(initialData);
    const [id, setId] = useState(0);
   

    const [showDetais, setShowDetails] = useState(false);

    useEffect( async ()=>{
        await axios.get(baseURL).then((res)=>{
            if(res.status === 200){
                console.log(res.data);
                setPersons(res.data);
                setMessage("Operation successfully completed");
            } else {
                setMessage("API ERROR: " , res.status);
            }
            setError();
        }).catch(err => {
            console.log("ERROR: ", err);
            if(err.message){
                setError(err.message);
            } else {
                setError(err);
            }
            setMessage();
        }); 
    },[]);

    const TableHeader = () => {
        return(
           
             <thead>
                 <tr>
                     <th scope="col">ID</th>
                     <th scope="col">Person Name</th>
                     <th scope="col">Person E-mail</th>
                 </tr>
             </thead>
            
         );
     };

     const TableRow = (props) => {
        return (
    <tbody>
        {
            props.list.map((person) => (
            <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName} {person.lastName}</td>
                <td>{person.email}</td>
                <td><TableAction person={person}/></td>
            </tr>
    ))
        }
    </tbody>
        );
    };

    const TableAction = (props) => {

        const showData = () => {
            setShowDetails(true);
            console.log("Show Data", props.person);
            setPerson(props.person);
        }

        const deletePerson = async () => {
            await axios.delete(`${baseURL}${id}`).then(res => {
                if(res.status === 200){
                    setMessage("Person successfully deleted!");
                } else {
                    setMessage("API ERRO: ", res.status);
                }
                setError();
            }).catch(err => {
                if(err.message){
                    setError(err.response.data.statusText);
                } else {
                    setError(err.message);
                }
                setMessage();
            })
        };

        const updatePerson = () => {
            const data = {id:person.id, title:person.title, firstName:person.firstName, lastName:person.lastName, email:person.email};
            
            axios.put(baseURL, data).then(res => {
                if(res.status === 204){
                    setPerson(res.data);
                    setMessage("Operation successfully completed");
                } else {
                    setMessage("API ERROR: ", res.status);
                }
                setError();
            }).catch(err => {
                console.log("ERROR:", err);
                if(err.response){
                    console.log("ERROR RESPONSE: ", err.response);
                    setError(err.response.data.statusText);
                } else {
                    setError(err.message);
                }
                setMessage();
            })
        };


        return (
            <div>  
                <button type="button" className="btn btn-primary text-white m-1" onClick={showData}>Show Details</button> 
                <button type="button" className="btn btn-danger text-white m-1" onClick={deletePerson}>Delete Person</button> 
                <button type="button" className="btn btn-warning text-white m-1" onClick={updatePerson}>Update Person</button> 
            </div>
            
        );
    }

    const ShowPersonDetails = () => {
        console.log(person);
        if(showDetais){
            return(<div className="card">
                <div className="card-header">
                    Person Details
                </div>
                <div className="card-body">
                    <h5 className="card-title">Person ID: {person.id}</h5>
                    <h5 className="card-title">Person Title: {person.title}</h5>
                    <h5 className="card-title">Person Name: {person.firstName} {person.lastName}</h5>                     
                    <h5 className="card-title">Person E-mail: {person.email}</h5>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-outline-dark" onClick={() => {setShowDetails(false); setPerson({person})}}>Hide Details</button>
                </div>  
            </div>
                );
        } else {
            return ("");
        }
        
    };

 

    return (
        <div className="container">
            CRUD Page
            <table className="table table-stripped">
            <TableHeader/>
            <TableRow list={persons}/>
            </table>
            <br/>
            <ShowPersonDetails/>

        </div>
    );
};



export default CrudDemo;