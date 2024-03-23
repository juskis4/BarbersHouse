import * as React from 'react';
import "./index.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useState, useEffect } from 'react'; 

function Barbers() {

  const [expandedBarberId, setExpandedBarberId] = useState(null);
  const [barbers, setBarbers] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 

  const getBarbersWithServices = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5037/Barbers/Services");
      setBarbers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBarbersWithServices(); 
  }, []); 

  // Function to handle card expansion
  const handleCardExpand = (barberId) => {
    setExpandedBarberId(barberId === expandedBarberId ? null : barberId);
  };

  const ExpandedCardContent = ({ barber }) => {
    return (
      <div>
        <h4>Services:</h4>
        <ul>
          {barber.services.map((service) => (
            <li key={service.serviceId}>
              <strong>{service.title}</strong> ({service.duration} mins) - ${service.price}
              <p>{service.description}</p> 
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {isLoading ? 
        <div style={{ width: '100%', textAlign: 'center', marginTop: 20 }}> 
          <CircularProgress />
        </div>
      :  
      barbers.map((barber) => (
        <Card sx={{ maxWidth: 345, margin: 2, flex: '1 0 30%' }} key={barber.barberId}> 
          <CardActionArea onClick={() => handleCardExpand(barber.barberId)}>
          <div className="image-placeholder">
                    <CardMedia
                        component="img"
                        height="140"
                        image={barber.photoUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg'} 
                        alt={barber.name}
                        className="my-card-image"
                    />
                </div>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {barber.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {barber.bio} 
                    </Typography>
                    </CardContent>
          </CardActionArea> 

          {expandedBarberId === barber.barberId && (
            <CardContent> 
              <ExpandedCardContent barber={barber} />
            </CardContent>
          )} 
        </Card>
      ))}  
    </div>
  );
}

export default Barbers;
