import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewPost = (props) => {
  const [newPost, setNewPost] = useState({
    information: "",
    status: "",
    tradelink: "",
    date: "",
  });

  const handleChangeInput = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };

  const redirectToHome = () => {
    props.history.push("/posts");
  };

  
  const createPost = (event) => {
    event.preventDefault();
    const status = event.target.status.value;
    const information = event.target.information.value;
    const tradelink = event.target.tradelink.value; 
    const date = event.target.date.value;
    const newPost = {status, information, tradelink,  date};

   axios.post("/api/newpost", newPost, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }) 
      .then((response) => {
        console.log(response.data);
        
      }); 
  };

  return (
    <div>
      <h1 className="crearpost">Crea un anuncio de intercambio</h1>
      <div className="tutorial">
        <p className="textotutorial">En informacion tienes que poner la skin que tienes y despues la que quieres conseguir, en status elegir el estado del intercambio, poner el tradelink y la fecha </p>
        <p>Ejemplo:</p>
        <p className="textotutorial">Tengo un Ak-47| Frontside Misty(Minimal Wear) y quiero una Ak-47| Redline(Minimal Wear) </p>
      </div>
      

      <form onSubmit={(e)=> createPost(e)}>
        <p>Information:</p>
        <input name="information" type="text" onChange={handleChangeInput} />

        <p>Status:</p>
        <select name="status" onChange={handleChangeInput}>
          <option value="" id="status">--Elige un status--</option>
          <option value="Active">Active</option>
          <option value="Done">Done</option>
          <option value="Tradelock">Tradelock</option>
        </select>
 
        <p>Tradelink:</p>
        <p>
          <a href="https://steamcommunity.com/id/shootertato/tradeoffers/privacy#trade_offer_access_url">¿Cual es mi tradelink?</a>
        </p>
        
        <input name="tradelink" type="text" onChange={handleChangeInput} placeholder="tradelink"/>

        <p>Date:</p>
        <input name="date" type="date" onChange={handleChangeInput} />

        <p>
          <button className="btn btn-primary">Crear anuncio</button>
        </p>
        

           
      </form>
    </div>
  );
};

export default NewPost;
