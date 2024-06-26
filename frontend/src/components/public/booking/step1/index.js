import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.css";

function Step1({ barbers, isLoading, selectedBarber, onBarberChange }) {
  const handleChange = (barber) => {
    onBarberChange(barber);
  };

  return (
    <div className="step1-container">
      {isLoading ? (
        <div style={{ width: "100%", textAlign: "center", marginTop: 20 }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="barber-photos-container">
          {barbers.map((barber) => (
            <div
              key={barber.barberId}
              className={`barber-photo-wrapper ${selectedBarber.barberId === barber.barberId ? "selected" : ""}`}
              onClick={() => handleChange(barber)}
            >
              <img
                src={
                  barber.photoUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
                }
                alt={barber.name}
                className="barber-photo"
              />
              <p className="barber-name">{barber.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Step1;
