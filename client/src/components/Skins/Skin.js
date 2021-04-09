import axios from 'axios'
import { useEffect, useState } from 'react'


const Skins = () => {

    const [skins, setSkins] = useState([])
    console.log(skins)
    useEffect(() => {

        axios.get('http://localhost:5000/skins')
            .then(response => setSkins(response.data))

    }, [])


    return (
        
        <div>
            <h1>Skin</h1>
            {
                skins.map((item, index) =>
                    <div key={index} className="skins">
                    <div>
                        <p className="skinname">{item.name}</p>
                        <p className="skinfloat">{item.float}</p>
                        <p className="skinicon">{item.icon}</p>
                    </div>
                    </div>
                )
                
            }

        </div>
        )}
             
export default Skins;
