import { collection, getDocs, query } from "firebase/firestore";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import BasePage from "./ui/BasePage";

const Leaderboard = () => {
  const [teams, setTeams] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const initTeams = async () => {
      const q = query(collection(firebase, "teams"));
      const querySnapshot = await getDocs(q);
      const teams = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
        };
      });
      setTeams(teams);
    };

    initTeams();
  }, []);

  return (
    <BasePage>
      <Typography variant="h2" pt={2}>
        Komandos:
      </Typography>
      {teams.map((team, index) => (
        <Typography>
          {index + 1}. {team.name}
        </Typography>
      ))}
    </BasePage>
  );
};

export default Leaderboard;
