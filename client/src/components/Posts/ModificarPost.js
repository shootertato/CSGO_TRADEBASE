import axios from 'axios'
import { useState } from 'react';
import { withRouter } from "react-router-dom";


const Modify = (props) => {
console.log(props)
    const [modificarPost, setModificarPost] = useState({})
    
console.log(modificarPost)
    const editarPost = (event) => {
        event.preventDefault()

        axios.put(`/api/user/post/` + props.match.params.id ,modificarPost, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt-token')}`
            },
        }
        )

            .then(response => {
                console.log(response.data)
            })
    }

    const changeInput = (event) => {
        setModificarPost({
            ...modificarPost,
            [event.target.name]: event.target.value
        })
    }

    const redirectToPostsUsuario = () => {
        props.history.push('/users/perfil')
    }

   

    return (
        <div>
           <h1 className="crearpost">Modifica el anuncio de intercambio</h1>
                <div className="tutorial">
                <p className="textotutorial">En informacion tienes que poner la skin que tienes y despues la que quieres conseguir, en status elegir el estado del intercambio, poner el tradelink y la fecha </p>
                <p>Ejemplo:</p>
                <p className="textotutorial">Tengo un Ak-47| Frontside Misty(Minimal Wear) y quiero una Ak-47| Redline(Minimal Wear) </p>
        </div>

            <form action="POST" onSubmit={editarPost} >

                <p>Information:</p>
                <input name="information" type="text" value={modificarPost.information} onChange={changeInput} placeholder={props.match.params.name} />

                <p>Status:</p>
                    <select name="status" value={modificarPost.status} onChange={changeInput}>
                        <option value="" id="status">--Elige un status--</option>
                        <option value="Active">Active</option>
                        <option value="Done">Done</option>
                        <option value="Tradelock">Tradelock</option>
                    </select>
 

                <p>Tradelink:</p>
                <p>
                    <a href="https://steamcommunity.com/id/shootertato/tradeoffers/privacy#trade_offer_access_url">¿Cual es mi tradelink?</a>
                </p>
        
                <input name="tradelink" type="text" value={modificarPost.tradelink} onChange={changeInput} />

                <p>Date:</p>
                <input name="date" type="date" value={modificarPost.date} onChange={changeInput} />

                <div>
                    <button className="btn btn-primary" type="submit" onClick={editarPost}>Modificar Post</button>
                </div>
                
            </form>
           
            <div className="mt-2">
                <span>Vuelve a  </span>
                <span className="link" onClick={() => redirectToPostsUsuario()}>Tus posts</span>
            </div>
        </div>
    )
}
export default withRouter(Modify);