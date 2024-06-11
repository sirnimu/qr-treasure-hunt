import { useCallback, useEffect, useState } from "react";
import { Task } from "../types";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../firebase";

export const useGetTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServerData = useCallback(async () => {
    setIsLoading(true);
    const tasksCollection = collection(db, "assignments");

    const converter = {
      toFirestore: (data: Task) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Task,
    };

    const querySnapshot = await getDocs(
      query(tasksCollection, orderBy("index")).withConverter(converter)
    );

    const fetchedTasks: Task[] = [];
    querySnapshot.forEach((doc) =>
      fetchedTasks.push({ ...doc.data(), id: doc.id })
    );
    setTasks(fetchedTasks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadServerData();
  }, []);

  return {
    tasks,
    isLoading,
  };
};
