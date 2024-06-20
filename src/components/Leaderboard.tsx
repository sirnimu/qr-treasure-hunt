import { collection, getDocs, query } from "firebase/firestore";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import { IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import BasePage from "./ui/BasePage";
import { Team } from "./types";
import { useNavigate, useSearchParams } from "react-router-dom";

const Leaderboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();
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
      <Stack justifyContent="space-between">
        <Typography variant="h2" py={2}>
          Rezultatai
        </Typography>
        <IconButton sx={{ marginRight: 2 }} onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>
      </Stack>

      <Stack display="grid" gridTemplateColumns="1fr repeat(3, 2fr)">
        <Typography sx={{ fontWeight: 500 }}>#</Typography>
        <Typography sx={{ fontWeight: 500 }}>Komanda</Typography>
        <Typography sx={{ fontWeight: 500 }}>Bauda</Typography>
        <Typography sx={{ fontWeight: 500 }}>Bendras laikas</Typography>
      </Stack>
      {teams.length === 0 && <LinearProgress color="secondary" />}
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
          const formattedTotalTime = `${
            Math.floor(totalTime / 3600) + ":"
          }${String(Math.floor((totalTime % 3600) / 60)).padStart(
            2,
            "0"
          )}:${String(Math.floor(totalTime % 60)).padStart(2, "0")}`;

          return (
            <Stack
              key={index}
              display="grid"
              gridTemplateColumns="1fr repeat(3, 2fr)"
              sx={[
                team.name === teamName && {
                  background: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.primary.main,
                },
              ]}
            >
              <Typography>{index + 1}.</Typography>
              <Typography>{team.name}</Typography>
              <Typography>
                {team?.total_penalty
                  ? Number(team?.total_penalty) / 60 + ":00"
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
