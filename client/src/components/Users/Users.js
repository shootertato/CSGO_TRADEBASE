import axios from 'axios';
import { useEffect, useState } from 'react';
import { ACCES_TOKEN_NAME } from "../../constants/constant"
import { withRouter, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Users = () => {
    const [users, setUsers] = useState(null);     
    
    console.log(users)

        useEffect(() => {
            const token = localStorage.getItem(ACCES_TOKEN_NAME)
            console.log(token)
            axios.get(`http://localhost:5000/users/perfil`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUsers(response.data);
    
                })
                .catch(err => {
                    console.log(err.response.data);
                }
                );
        }, []);
    

    
    return(
        <div>
            {users &&
                <div> 
                   
                         <p className="titulo">Posts de {users.username}</p>
                                       
                    {users.posts.map(item=>{
                        return(
                            <div>
                                     <div class="card-body" className="posts">                  
                            <p className="poststatus">{item.status}</p>

                            <p class="card-text" className="postinformation">{item.information}</p>

                            <p class="card-text" className="postdate">{item.date}</p>

                             <a class="btn btn-primary" href={item.tradelink}>Enviar oferta</a>

                            </div>
                            </div> 
                        )
                    })
                    
                    }
                    </div>
                   

            }
        </div>
    )
    }
export default Users;
