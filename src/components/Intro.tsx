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
      alert("Team does not exist");
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
      <Typography variant="body1" sx={{ textAlign: "justify" }} pb={2}>
        Sveikiname subūrus {teamName}!
      </Typography>

      <Typography sx={{ textAlign: "justify" }} pb={2}>
        Kai pradėsite žaidimą, bus skaičiuojamas jūsų komandos{" "}
        <Typography component="span" sx={{ fontWeight: 700 }}>
          laikas
        </Typography>
        , tad turite sparčiai ieškoti ir galvoti atsakymus -{" "}
        <Typography component="span" sx={{ fontWeight: 700 }}>
          skaičius
        </Typography>
        . Jei matysite nuotrauką - toje Gniaužių vietoje slypi gudriai paslėptas
        atsakymas. O jei matote uždavinį - skubėkite jį išmąstyti. Kur slypi
        lobis paaiškės, kai suvesite visus 18 atsakymų teisingai. Jei įvesite
        neteisingą skaičių, gausite{" "}
        <Typography component="span" sx={{ fontWeight: 700 }}>
          baudą
        </Typography>{" "}
        - pridėsime 5 min prie lobio paieškos laiko.
      </Typography>

      <Typography sx={{ textAlign: "justify" }}>
        Kas laukia pačių greičiausių? Prieš pat Joninių laužo uždegimą bus
        skelbiami rezultatai ir viena komanda turės garbę jį uždegti kartu su
        proseneliu Jonu! Pasiruošę?
      </Typography>
      <Stack py={2}>
        <Button onClick={startGame} autoFocus>
          Pradedam!
        </Button>
      </Stack>
    </OldPaper>
  );
};

export default Intro;
