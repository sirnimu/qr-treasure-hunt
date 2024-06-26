import { Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { useEffect, useState } from "react";
import { Team } from "./types";

const Timer = () => {
  const [currentTeam, setCurrentTeam] = useState<Team>();
  const [timePassed, setTimePassed] = useState(0);
  const teamName = localStorage.getItem("team");
  const penalty = localStorage.getItem("penalty") ?? 0;

  useEffect(() => {
    const fetchData = async () => {
      if (!teamName) {
        throw Error("No team data");
        return;
      }

      const teamRef = doc(db, "teams", teamName);
      const teamSnapshot = await getDoc(teamRef);

      if (teamSnapshot.exists()) {
        setCurrentTeam(teamSnapshot.data() as Team);
      } else {
        console.error("No such document!");
      }
    };

    fetchData();
  }, [teamName]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentTeam?.created_at) {
        return;
      }

      setTimePassed(
        new Date().getTime() -
          currentTeam?.created_at?.toDate().getTime() +
          (penalty ? Number(penalty) * 1000 * 60 * 5 : 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTeam, penalty]);

  return (
    <Typography sx={[!timePassed && { visibility: "hidden" }]}>
      {Math.floor(timePassed / 1000 / 60)}min{" "}
      {Math.floor((timePassed / 1000) % 60)}s
    </Typography>
  );
};

export default Timer;
