import { VariantColor } from '../useMasterMindGame';
import Box from '@mui/material/Box';

export type PegColor = VariantColor | 'empty';

const pegColorMap: Record<PegColor, string> = {
  empty: 'white',
  blue: 'blue',
  green: 'green',
  yellow: 'yellow',
  gray: 'gray',
  red: 'red',
  purple: 'purple',
};

type PegSize = 'small' | 'normal';

const sizeMap: Record<PegSize, number> = {
  small: 15,
  normal: 40,
};

interface PegProps {
  color: PegColor;
  size?: PegSize,
  onClick?: () => void,
}

const Peg = ({ color, size = 'normal', onClick }: PegProps) => {
  const sizeFromMap = sizeMap[size];

  return (
    <Box
      className="Peg"
      onClick={onClick}
      sx={{
        position: 'relative',
        width: sizeFromMap,
        height: sizeFromMap,
        border: '2px solid #303030',
        borderRadius: '50%',
        background: pegColorMap[color],
        overflow: 'hidden',
        ...(
          color !== 'empty'
            ? {
              '&:after': {
                content: '""',
                position: 'absolute',
                top: '2px',
                left: '-2px',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.15)',
              },
            }
            : {}
        ),
      }} />
  );
};

export default Peg;
