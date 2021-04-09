import axios from 'axios';
import { useEffect, useState } from 'react';
import { ACCES_TOKEN_NAME } from "../../constants/constant"
import { withRouter, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Users = () => {
    const [users, setUsers] = useState();         

        useEffect(() => {
            const token = localStorage.getItem(ACCES_TOKEN_NAME)
            console.log(token)
            axios.get(`http://localhost:5000/user/perfil`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUsers(response.data);
    
                })
                .catch(err => {
                    console.log(err.response);
                }
                );
        }, []);
    


    return (
        <div>
            {users &&
                users.map((item, index) =>(
                    <div key={index} className="users">
                    <div>
                        <p className="username">{item.username}</p>
                    </div>
                    <div>
                        {item.post}
                    </div>
                    </div>
                )
                    
                )
                
            }

        </div>
        );
    };
             
export default Users;
