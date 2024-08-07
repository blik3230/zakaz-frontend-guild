import { PegColor } from "../useMasterMindGame";
import Box from "@mui/material/Box";

interface PegProps {
  color: PegColor;
}

const Peg = ({ color }: PegProps) => {

  return (
    <Box sx={{border: '2px solid #303030', borderRadius: 30}} className="Peg">
      <Box sx={{width: 20, height: 10, borderRadius: 15, background: color}}></Box>
    </Box>
  );
}

export default Peg;
