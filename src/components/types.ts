import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  index: number;
  description: string;
  imgUrl: string;
  question: string;
  answer: string;
}

export interface Team {
  name: string;
  created_at?: Timestamp;
  finished_at?: Timestamp;
  total_penalty?: number;
}
