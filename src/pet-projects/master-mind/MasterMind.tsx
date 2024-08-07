import useMasterMindGame from "./useMasterMindGame";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Peg from "./components/Peg";

const MasterMind = () => {
  const {
    secretColorSet,
    startGame,
  } = useMasterMindGame();

  return (
    <div className="MasterMind">
      <Box>
        <Typography variant="h2">Master Mind Game</Typography>

        <Button onClick={startGame}>Start Game</Button>
      </Box>
      <Box display="flex" width={140} justifyContent="space-between">
        {secretColorSet?.map((color, index) => (
          <Box key={index} sx={{}}>
            <Peg color={color}/>
          </Box>
        ))}
      </Box>

    </div>
  );
}

export default MasterMind;
