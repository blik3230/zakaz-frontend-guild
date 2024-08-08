import useMasterMindGame, { VariantColor } from './useMasterMindGame';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Peg from './components/Peg';
import { IconButton } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const VARIANT_COUNT = 10;
const ITEMS_IN_VARIANT_COUNT = 4;
const ALL_COLORS: VariantColor[] = [
  'gray',
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
];

const MasterMind = () => {
  const {
    secretColorSet,
    gameWasRun,
    board,
    currentStepIndex,
    currentVariant,
    selectedItemIndex,
    commitIsDisabled,
    selectColor,
    selectItem,
    startGame,
    commitVariant,
  } = useMasterMindGame();

  console.log('commitIsDisabled', commitIsDisabled)

  return (
    <Box className="MasterMind" width="360px">
      <Box>
        <Typography variant="h2">Master Mind Game</Typography>
        <Button onClick={startGame}>Start Game</Button>
        {
          !gameWasRun && (
            <Button onClick={startGame}>Start Game</Button>
          )
        }
      </Box>

      <Box display="flex" width={140} justifyContent="space-between">
        {secretColorSet?.map((color, index) => (
          <Box key={index} sx={{}}>
            <Peg color={color} />
          </Box>
        ))}
      </Box>

      {
        gameWasRun && (
          <Box sx={{
            padding: '20px',
            border: '2px solid #303030',
            borderRadius: '8px',
          }}>
            {
              Array.from({ length: VARIANT_COUNT }, (_v, variantIndex) => {
                const variantFromBoard = board![variantIndex];
                const colorOptions: VariantColor[] = ALL_COLORS.filter((color) => !currentVariant.includes(color));

                if (variantIndex === currentStepIndex) {
                  return (
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                      border: '2px solid #303030',
                      borderRadius: '8px',
                    }}>
                      <Box sx={{ display: 'flex', gap: '20px' }}>
                        {
                          currentVariant.map((variantColor, itemIndex) => {
                            const colorPanelIsDisplayed = variantIndex === currentStepIndex && itemIndex === selectedItemIndex;

                            return (
                              <Box key={itemIndex} sx={{ position: 'relative' }}>
                                <Peg
                                  color={variantColor}
                                  onClick={() => selectItem(itemIndex)} />
                                {
                                  colorPanelIsDisplayed && (
                                    <Box sx={{
                                      position: 'absolute',
                                      top: '-65px',
                                      left: '-30px',
                                      display: 'flex',
                                      gap: '10px',
                                      alignItems: 'center',
                                      padding: '10px',
                                      border: '2px solid #303030',
                                      borderRadius: '8px',
                                      zIndex: 1,
                                      background: 'white',
                                    }}>
                                      {
                                        colorOptions.map((color, colorIndex) => (
                                          <Peg key={colorIndex}
                                            color={color}
                                            onClick={() => selectColor(itemIndex, color)} />
                                        ))
                                      }
                                    </Box>
                                  )
                                }
                              </Box>
                            );
                          })
                        }
                      </Box>

                      <Box
                        sx={{
                        display: 'flex',
                        gap: '10px',
                        width: '40px',
                        flexWrap: 'wrap',
                      }}>
                        <IconButton color='primary' onClick={commitVariant} disabled={commitIsDisabled}>
                          <CheckCircle/>
                        </IconButton>
                      </Box>
                    </Box>
                  );
                }

                if (variantFromBoard) {
                  return (
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                    }}>
                      <Box sx={{ display: 'flex', gap: '20px' }}>
                        {
                          variantFromBoard.map((v, i) => (
                            <Peg key={i} color={v} />
                          ))
                        }
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        gap: '10px',
                        width: '40px',
                        flexWrap: 'wrap',
                      }}>
                        {
                          Array.from({ length: ITEMS_IN_VARIANT_COUNT }, (_, i) => (
                            <Peg key={i} color="empty" size="small" />
                          ))
                        }
                      </Box>
                    </Box>
                  );
                } else {
                  return (
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                    }}>
                      <Box sx={{ display: 'flex', gap: '20px' }}>
                        {
                          Array.from({ length: ITEMS_IN_VARIANT_COUNT }, (_, i) => {
                            return (
                              <Peg key={i} color="empty" />
                            );
                          })
                        }
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        gap: '10px',
                        width: '40px',
                        flexWrap: 'wrap',
                      }}>
                        {
                          Array.from({ length: ITEMS_IN_VARIANT_COUNT }, (_, i) => (
                            <Peg key={i} color="empty" size="small" />
                          ))
                        }
                      </Box>
                    </Box>
                  );
                }
              }).reverse()
            }
          </Box>
        )
      }

    </Box>
  );
};

export default MasterMind;
