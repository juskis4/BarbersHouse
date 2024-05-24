import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.css";
import { useTranslation } from "react-i18next";
import { getBarbersWithServices } from "../../../services/barberService.js";

function Team() {
  const { t } = useTranslation();
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBarbers = async () => {
      setIsLoading(true);
      try {
        const allBarbers = await getBarbersWithServices();
        setBarbers(allBarbers);
      } catch (err) {
        console.log("Error fetching barbers data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  return (
    <section id="team" className="team-container">
      <div className="team-content">
        <h2 className="team-header">{t("team.header")}</h2>
        {isLoading ? (
          <div style={{ width: "100%", textAlign: "center", marginTop: 20 }}>
            <CircularProgress />
          </div>
        ) : (
          <div className="team-list">
            {barbers.map((barber) => (
              <div key={barber.barberId} className="team-member">
                <div className="team-member-photo">
                  <img
                    src={
                      barber.photoUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
                    }
                    alt={barber.name}
                  />
                </div>
                <div className="team-member-info">
                  <h3>{barber.name}</h3>
                  <p>{barber.bio}</p>
                  <div className="team-member-rating">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="star">
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Team;
