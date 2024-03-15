import "./index.css";
import axios from 'axios';

function Barbers() {
    const getBarbersWithServices = () => {
        axios.get("http://localhost:5037/Barbers/Services")
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    
    return (

        <div>
            <button className="butan" onClick={getBarbersWithServices}>Get Barbers With Service to Console</button>    
        </div>
    );
  }
  
  export default Barbers;