import { collection, getDocs, query } from "firebase/firestore";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import BasePage from "./ui/BasePage";
import { Team } from "./types";
import { useSearchParams } from "react-router-dom";

const Leaderboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const [searchParams] = useSearchParams();
  const teamName = searchParams.get("team");

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
      <Stack display="grid" gridTemplateColumns="repeat(3, 1fr)">
        <Typography sx={{ fontWeight: 500 }}>Pavadinimas</Typography>
        <Typography sx={{ fontWeight: 500 }}>Bauda</Typography>
        <Typography sx={{ fontWeight: 500 }}>Bendras laikas</Typography>
      </Stack>
      {teams
        .sort((team1, team2) => {
          const timePassed1 =
            !!team1?.created_at && !!team1?.finished_at
              ? (team1?.finished_at?.toDate().getTime() -
                  team1?.created_at?.toDate().getTime()) /
                1000
              : 0;
          const penaltyTime1 = team1?.total_penalty ?? 0;
          const totalTime1 = timePassed1 + penaltyTime1;

          const timePassed2 =
            !!team2?.created_at && !!team2?.finished_at
              ? (team2?.finished_at?.toDate().getTime() -
                  team2?.created_at?.toDate().getTime()) /
                1000
              : 0;
          const penaltyTime2 = team2?.total_penalty ?? 0;
          const totalTime2 = timePassed2 + penaltyTime2;

          if (totalTime1 === 0) return 1;
          if (totalTime2 === 0) return -1;

          return totalTime1 === 0 ? totalTime2 : totalTime1 - totalTime2;
        })
        .map((team, index) => {
          const timePassed =
            !!team?.created_at && !!team?.finished_at
              ? (team?.finished_at?.toDate().getTime() -
                  team?.created_at?.toDate().getTime()) /
                1000
              : 0;
          const penaltyTime = team?.total_penalty ?? 0;
          const totalTime = timePassed + penaltyTime;
          const formattedTotalTime = `${Math.floor(
            totalTime / 60
          )}min  ${Math.floor(totalTime % 60)}s`;

          return (
            <Stack
              key={index}
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
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
                {team?.total_penalty
                  ? Number(team?.total_penalty) / 60 + "min"
                  : "-"}
              </Typography>
              <Typography>{timePassed ? formattedTotalTime : "-"}</Typography>
            </Stack>
          );
        })}
    </BasePage>
  );
};

export default Leaderboard;
