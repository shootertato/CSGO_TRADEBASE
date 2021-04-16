import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter, Link } from "react-router-dom";


const Posts = (props) => {
  const [posts, setPosts] = useState();

/* console.log(posts); */
  useEffect(() => {
    axios.get("/posts").then((response) => {
      setPosts(response.data);
    });
  });

  const redirectToPostCreate = () => {
    props.history.push("/newpost");
  };

  

   
  return (
    <div>
      <h1>Posts</h1>

      <div>
        <button class="btn btn-success" onClick={() => redirectToPostCreate()}>
          Crea tu anuncio aqui!
        </button>
      </div>

      <div class="card" className="post">
        {posts &&
          posts.map((item, index) => (
            
            <div key={index} className="posts">
                
              <div class="card-header" className="posted">
                <h5 className="postowner">Posted by {item.owner.username}</h5>
              </div>

              <div class="card-body" className="posted">

                <p className="poststatus">{item.status}</p>

                <p class="card-text" className="postinformation">{item.information}</p>

                <p class="card-text" className="postdate">{item.date}</p>

                <a class="btn btn-primary" href={item.tradelink}>Enviar oferta</a>
                

                

                


              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
