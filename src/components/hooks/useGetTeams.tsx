import { useCallback, useEffect, useState } from "react";
import { Team } from "../types";
import { collection, getDocs, query } from "firebase/firestore";
import firebase from "../../firebase";

export const useGetTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServerData = useCallback(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadServerData();
  }, [loadServerData]);

  return {
    teams,
    isLoading,
  };
};
