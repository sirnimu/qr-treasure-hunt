import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Zoom from "react-medium-image-zoom";
import OldPaper from "../ui/BasePage";
import { data } from "../data.json";

const Questions = () => {
  return (
    <OldPaper>
      <Stack pb={4}>
        <Typography variant="h3">Vietos</Typography>
      </Stack>
      <Stack gap={4} flexWrap="wrap">
        {data.map((place) => (
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <Zoom>
                <CardMedia
                  component="img"
                  height="auto"
                  image={place.imageUrl}
                />
              </Zoom>
            </CardActionArea>
            <CardContent>
              <Stack>
                <Typography variant="h5" component="div">
                  {place.title ?? "Vieta"}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </OldPaper>
  );
};

export default Questions;
