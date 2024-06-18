import { collection, getDocs, query } from "firebase/firestore";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { Team } from "./types";

const Leaderboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const teamName = localStorage.getItem("team");

  useEffect(() => {
    const initTeams = async () => {
      const q = query(collection(firebase, "teams"));
      const querySnapshot = await getDocs(q);
      const teams = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          created_at: data.created_at,
          finished_at: data.finished_at,
          total_penalty: data.total_penalty,
        };
      });
      setTeams(teams);
    };

    initTeams();
  }, []);

  return (
    <BasePage>
      <Typography variant="h2" pt={2}>
        Rezultatai:
      </Typography>
      {teams.length === 0 && <CircularProgress size={48} color="secondary" />}
      <Stack display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr">
        <Typography sx={{ fontWeight: 500 }}>Pavadinimas</Typography>
        <Typography sx={{ fontWeight: 500 }}>Pradėjo</Typography>
        <Typography sx={{ fontWeight: 500 }}>Bauda</Typography>
        <Typography sx={{ fontWeight: 500 }}>Viso</Typography>
      </Stack>
      {teams.map((team, index) => (
        <Stack
          key={index}
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr 1fr"
          sx={[
            team.name === teamName && {
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.primary.main,
            },
          ]}
        >
          <Typography>
            {index + 1}. {team.name}
          </Typography>
          <Typography>
            {team?.created_at?.toDate().toLocaleTimeString()}
          </Typography>
          <Typography>
            {team?.total_penalty
              ? Number(team?.total_penalty) / 60 + "min"
              : "-"}
          </Typography>
          <Typography>
            {team?.created_at && team?.finished_at
              ? Math.round(
                  ((team?.finished_at?.toDate().getTime() -
                    team?.created_at?.toDate().getTime()) /
                    1000 +
                    (team?.total_penalty ?? 0)) /
                    60
                ) + "min"
              : "-"}
          </Typography>
        </Stack>
      ))}
    </BasePage>
  );
};

export default Leaderboard;
