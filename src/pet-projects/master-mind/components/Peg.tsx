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
  normal: 32,
};

interface PegProps {
  color: PegColor;
  size?: PegSize,
  isActive?: boolean;
  onClick?: () => void,
}

const Peg = ({ color, size = 'normal', isActive, onClick }: PegProps) => {
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
        boxShadow: 'inset 1px -1px 2px rgba(0, 0, 0, 0.3),' +
          'inset -1px 1px 2px rgba(255, 255, 255, 0.3),' +
          '-1px 1px 2px rgba(0, 0, 0, 0.3)',
        cursor: onClick ? 'pointer' : 'default',
        translation: 'all 0.3s',
        ...(
          isActive
            ? {
              outline: '2px solid #303030',
              outlineOffset: '2px',
              boxShadow: `-2px 2px 6px 3px rgb(0 10 30 / 38%)`
            }
            : {}
        ),
        ...(
          color !== 'empty'
            ? {
              '&:after': {
                content: '""',
                display: 'none',
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
