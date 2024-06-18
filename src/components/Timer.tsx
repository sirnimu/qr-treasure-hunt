import { Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { useEffect, useState } from "react";
import { Team } from "./types";
import { formatDistance } from "date-fns";

const Timer = () => {
  const [currentTeam, setCurrentTeam] = useState<Team>();
  const teamName = localStorage.getItem("team") ?? "";
  const penalty = localStorage.getItem("penalty") ?? 0;

  useEffect(() => {
    const fetchData = async () => {
      const teamRef = doc(db, "teams", teamName);
      const teamSnapshot = await getDoc(teamRef);

      if (teamSnapshot.exists()) {
        setCurrentTeam(teamSnapshot.data() as Team);
      } else {
        console.error("No such document!");
      }
    };

    fetchData();
  }, []);

  const timePassed = formatDistance(
    new Date(),
    currentTeam?.created_at?.toDate() ?? new Date()
  );

  return (
    <>
      <Typography>Praėjo laiko: {timePassed}</Typography>
      <Typography>
        Bauda: {penalty ? Number(penalty) * 5 + "min" : "-"}
      </Typography>
    </>
  );
};

export default Timer;
