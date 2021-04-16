import axios from 'axios';
import { useEffect, useState } from 'react';
import { ACCES_TOKEN_NAME } from "../../constants/constant"
import { withRouter, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



const Users = (props) => {
    const [users, setUsers] = useState(null);     
    
    
    

        useEffect(() => {
            const token = localStorage.getItem(ACCES_TOKEN_NAME)
            console.log(token)
            axios.get(`/users/perfil`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUsers(response.data);
    
                })
                .catch(err => {
                    console.log(err);
                }
                );
        }, []);

        const handleDeletePost = (id) => {
            axios.delete(`/deletepost/` + id , {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('jwt-token')}`
                }
            })
                .then(response => {
                    // setUser(response.data)
                    console.log(response.data)
                    redirectToPost();
                })
              }
              const redirectToPost = () => {
                props.history.push("/posts");
              };
    

    
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


                            <p>
                                <Link to={'/user/post/' + item._id }>Modificar post</Link>
                            </p>
                            <button class="btn btn-danger" onClick={() => handleDeletePost(item._id)}>Eliminar post</button>

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
