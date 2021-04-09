import axios from 'axios'
import { useEffect, useState } from 'react'


const Chats = () => {

    const [chats, setChats] = useState([])
    useEffect(() => {

        axios.get('http://localhost:5000/chat')
            .then(response => setChats(response.data))

    }, [])

    return (
        
        <div>
            <h1>Chat</h1>
            
            {
                chats.map((item, index) =>
                    <div key={index} className="chats">
                    <div class="divMensaje">
                        <p className="chatowner">{item.owner}</p>
                        <p className="chatinformation">{item.text}</p>
                        <p className="chattdate">{item.date}</p>
                    </div>
                    </div>
                )
                
            }
            
            
        </div>
        
        )}
             
export default Chats;
