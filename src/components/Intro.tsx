import { Button, Stack, Typography } from "@mui/material";
import OldPaper from "./ui/BasePage";
import { useNavigate } from "react-router-dom";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import db from "../firebase";

const Intro = () => {
  const navigate = useNavigate();

  const teamName = localStorage.getItem("team");

  const startGame = async () => {
    if (!teamName) {
      return;
    }

    try {
      const docRef = doc(collection(db, "teams"), teamName);
      await setDoc(docRef, { name: teamName, created_at: serverTimestamp() });
      navigate("/play");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <OldPaper>
      <Typography variant="body1">
        Sveikiname subūrus{" "}
        <Typography component="span" sx={{ fontWeight: 700 }}>
          {teamName}
        </Typography>{" "}
        komandą! Kai pradėsite žaidimą, bus skaičiuojamas jūsų komandos laikas,
        tad turite sparčiai ieškoti ir galvoti atsakymus - SKAIČIUS. Jei
        matysite nuotrauką - toje Gniaužių vietoje slypi gudriai paslėptas
        atsakymas. O jei matote uždavinį - skubėkite jį išmąstyti. Kur slypi
        lobis paaiškės, kai suvesite visus atsakymus teisingai. Jei įvesite
        neteisingą skaičių, gausite baudą - pridėsime 5 min prie lobio paieškos
        laiko. O kas laukia pačių greičiausių? Prieš pat Joninių laužo uždegimą
        bus skelbiami rezultatai ir viena komanda turės garbę jį uždegti kartu
        su proseneliu Jonu! Pasiruošę?
      </Typography>
      <Stack py={2}>
        <Button onClick={startGame}>Pradedam!</Button>
      </Stack>
    </OldPaper>
  );
};

export default Intro;
