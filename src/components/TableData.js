import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import { Fragment } from 'react/cjs/react.production.min';
import Person from './Person';

const TableData = (props) => {
    const initialData = {id:0, title:"", firstName:"", lastName:"", email:""};
    const [person, setPerson] = useState(initialData);
   

    const [showDetais, setShowDetails] = useState(false);

    const TableHeader = () => {
        return(
            <Fragment>
             <thead>
                 <tr>
                     <th scope="col">ID</th>
                     <th scope="col">Person Name</th>
                     <th scope="col">Person E-mail</th>
                 </tr>
             </thead>
             </Fragment>
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

        const deletePerson = () => {
            axios.delete()

        };


        return (
            <div>  
                <button type="button" className="btn btn-primary text-white m-1" onClick={showData}>Show Details</button> 
                <button type="button" className="btn btn-danger text-white m-1" onClick={showData}>Delete Person</button> 
                <button type="button" className="btn btn-warning text-white m-1" onClick={showData}>Update Person</button> 
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
                    <h5 className="card-title">{person.personName} E-mail: {person.email}</h5>
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
            <table className="table table-stripped">
                <TableHeader/>
                <TableRow list = {props.list}/>
            </table> 
            <br/>
            <ShowPersonDetails/>   
        </div>
    );
};

export default TableData;