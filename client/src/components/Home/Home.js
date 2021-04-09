import axios from 'axios'
import { useEffect, useState } from 'react'


const Menu = () => {

    const [menu, setMenu] = useState([])
    console.log(menu)
    useEffect(() => {

        axios.get('http://localhost:5000/menu')
            .then(response => setMenu(response.data))

    }, [])


    return (
        
        <div>
            <h1></h1>
            {
                menu.map((item, index) =>
                    <div key={index} className="menu">
                    <div>
                        
                    </div>
                    </div>
                )
                
            }

        </div>
        )}
             
export default Menu;