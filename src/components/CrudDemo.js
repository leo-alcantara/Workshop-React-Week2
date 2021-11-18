import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useForm } from 'react-hook-form';



const baseURL = "http://localhost:8080/api/v1/person/";

const CrudDemo = () => {

    const [persons, setPersons] = useState([]);
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [showData, setShowData] = useState(false);
    const initialData = {id:0, title:"", firstName:"", lastName:"", email:""};
    const [person, setPerson] = useState(initialData);
    const [id, setId] = useState(0);
   
    const [refresh, setRefresh] = useState(false);

    const [showDetais, setShowDetails] = useState(false);

    useEffect(()=>{
        axios.get(baseURL).then((res)=>{
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
    },[refresh]);

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
         console.log("++++++++++++++++++++++++++++++");
         console.log(props.list);
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
            await axios.delete(`${baseURL}${props.person.id}`).then(res => {
                    setMessage("Person successfully deleted!");
                    setRefresh(!refresh);
                }).catch(err => {
                if(err.message){
                    setError(err.response.data.statusText);
                } else {
                    setError(err.message);
                }
                setMessage();
            })
        };

        const updatePerson = async () => {
            const data = {id: person.id, title: person.title, firstName: person.firstName, lastName: person.lastName, email: person.email};
            
          await axios.put(baseURL, data).then(res => {
                if(res.status === 204){
                    setPerson(res.data.value);
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
                <button type="button" className="btn btn-primary btn-sm text-white m-1" onClick={showData}>Show Details</button> 
                <button type="button" className="btn btn-danger btn-sm text-white m-1" onClick={deletePerson}>Delete Person</button> 
                <button type="button" className="btn btn-warning btn-sm text-white m-1" onClick={updatePerson}>Update Person</button> 
            </div>
            
        );
    }

    const ShowPersonDetails = () => {
        //console.log(person);
        if(showDetais){
            return(<div className="card">
                <div className="card-header bg-info text-white">
                    Person Details
                </div>
                <div className="card-body">
                    <h5 className="card-title">Person ID: {person.id}</h5>
                    <h5 className="card-title">Person Title: {person.title}</h5>
                    <h5 className="card-title">Person Name: {person.firstName} {person.lastName}</h5>                     
                    <h5 className="card-title">Person E-mail: {person.email}</h5>
                </div>
                <div className="card-footer bg-dark">
                    <button type="button" className="btn btn-outline-danger" onClick={() => {setShowDetails(false); setPerson({person})}}>Hide Details</button>
                </div>  
            </div>
                );
        } else {
            return ("");
        }
        
    };

    const Form = () => {
       
        const {register, handleSubmit, formState:{errors}} = useForm();
        
        /*const saveData = (data) => {
        console.log(data);
        };*/

        const savePerson = async (data) => {
            console.log(data);
            await axios.post(baseURL, data).then(res => {
                console.log("RESPONSE", res);
                if(res.status === 201){
                   
                    setMessage("Operation successfully completed");
                    setRefresh(!refresh);
                } else {
                    setMessage("API ERROR: ", res.status);
                }
                setError();
            }).catch(err => {
                console.log("ERROR: ", err);
                if(err.response){
                    console.log("ERROR RESPONSE: ", err.response);
                    setError(err.response.data.statusText);
                } else {
                    setError(err.message);
                }
                setMessage();
            })  
            console.log(data);   
        };

        
            return (
                <div className="container">
                        <form className="form-control m-2" onSubmit={handleSubmit(savePerson)}>
                            <div className="row">
                                <div className= "col-12 m-2">
                                    <input type="text" className="form-control" placeholder="Enter First Name" {...register("firstName", {required:true, maxLength: 20})} />
                                    {errors.firstName && errors.firstName.type === "required" && <span className="text-danger">First Name is required</span>}
                                    {errors.firstName && errors.firstName.type === "maxLength" && <span className="text-danger">Max Length exceeded</span>}
                                </div>
                                <div className= "col-12 m-2">
                                    <input type="text" className="form-control" placeholder="Enter Last Name" {...register("lastName", {required:true, maxLength: 20})} />
                                    {errors.lastName && errors.lastName.type === "required" && <span className="text-danger">Last Name is required</span>}
                                    {errors.lastName && errors.lastName.type === "maxLength" && <span className="text-danger">Max Length exceeded</span>}
                                </div>
                                <div className="col-12 m-2">
                                   <input type="text" className="form-control" placeholder="Enter E-mail Address" {...register("email", {required:true})}/>
                                    {errors.email && <span className="text-danger">Email Address required</span>}
                                </div>
                                <div className="col-12 m-2">
                                    <input type="text" className="form-control" placeholder="Enter Title" {...register("title", {required:true})}/>
                                    {errors.title && <span className="text-danger">Title required</span>}
                                </div>
                                <div>
                                     <button type="submit" className="btn btn-success btn-sm m-2">Add</button>
                                     <button type="reset" className="btn btn-danger btn-sm m-2" >Reset</button>   
                                </div>                                          
                            </div>
                        </form>   
                </div>
            );
        };










 

    return (
        <div className="container">
           
            <Form/>
           
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