import Peg, { PegColor } from './Peg';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { Save } from '@mui/icons-material';
import { VariantColor } from '../useMasterMindGame';

interface BoardRowProps {
  variant: PegColor[];
  response: PegColor[] | null;
  selectedItemIndex?: number | null;
  commitIsDisabled?: boolean;
  isActive?: boolean;
  onItemClick?: (index: number) => void;
  onSelectColor?: (index: number, color: VariantColor) => void;
  onCommit?: () => void;
}

const ALL_COLORS: VariantColor[] = [
  'blue',
  'yellow',
  'gray',
  'red',
  'green',
  'purple',
];

const colorOptions: VariantColor[] = ALL_COLORS;

const BoardRow = (props: BoardRowProps) => {
  const {
    variant,
    response,
    selectedItemIndex,
    commitIsDisabled,
    isActive,
    onSelectColor,
    onItemClick,
    onCommit,
  } = props;

  const renderResponsePlace = () => {
    if (isActive) {
      return (
        <IconButton
          color="success"
          onClick={onCommit}
          disabled={commitIsDisabled}
        >
          <Save/>
        </IconButton>
      );
    }

    if (response === null) {
      return null;
    }

    return (
      <Box sx={{
        display: 'flex',
        gap: '6px',
        width: '38px',
        flexWrap: 'wrap',
      }}>
        {
          response.map((color, i) => (
            <Peg key={i} color={color} size="small" />
          ))
        }
      </Box>
    )
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      border: `2px solid ${isActive ? '#303030' : 'transparent'}`,
      borderRadius: '8px',
    }}>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        {
          variant.map((variantColor, itemIndex) => {
            const colorPanelIsDisplayed = isActive && itemIndex === selectedItemIndex;
            const handleClick = (isActive && onItemClick)
              ? () => onItemClick(itemIndex)
              : undefined;

            return (
              <Box key={itemIndex} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    transition: 'all .2s',
                    ...(colorPanelIsDisplayed ? { transform: 'scale(1.12)' } : {}),
                  }}
                >
                  <Peg
                    color={variantColor}
                    onClick={handleClick}
                    isActive={colorPanelIsDisplayed}
                  />
                </Box>
                {
                  colorPanelIsDisplayed && (
                    <Box sx={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      width: '76px',
                      gap: '6px',
                      alignItems: 'center',
                      padding: '6px',
                      border: '2px solid #303030',
                      borderRadius: '8px',
                      zIndex: 1,
                      background: '#e3e1e1',
                    }}>
                      {
                        colorOptions.map((color, colorIndex) => {
                          const handleSelectColor = onSelectColor
                          ? () => onSelectColor(itemIndex, color)
                            : undefined;

                          return (
                            <Peg
                              key={colorIndex}
                              size='small'
                              color={color}
                              onClick={handleSelectColor}
                            />
                          );
                        })
                      }
                    </Box>
                  )
                }
              </Box>
            );
          })
        }
      </Box>

      {
        renderResponsePlace()
      }

    </Box>
  );
};

export default BoardRow;
