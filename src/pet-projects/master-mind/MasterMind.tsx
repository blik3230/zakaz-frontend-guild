import useMasterMindGame, { VariantColor } from './useMasterMindGame';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Peg, { PegColor } from './components/Peg';
import { IconButton } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export const VARIANT_COUNT = 10;
const ITEMS_IN_VARIANT_COUNT = 4;
const ALL_COLORS: VariantColor[] = [
  'gray',
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
];

export const getResponseOfVariant = (
  variant: PegColor[],
  secretColorSet: VariantColor[] | null,
): PegColor[] => {
  if (secretColorSet === null) {
    return Array.from({ length: ITEMS_IN_VARIANT_COUNT }, () => 'empty');
  }

  const result = {
    inPlace: [] as PegColor[],
    inSet: [] as PegColor[],
    empty: [] as PegColor[],
  };

  variant.reduce((acc, color, index) => {
    if (color === secretColorSet[index]) {
      acc.inPlace.push('green');
    } else if (secretColorSet.includes(color as VariantColor)) {
      acc.inSet.push('gray');
    } else {
      acc.empty.push('empty');
    }

    return acc;
  }, result);

  return [
    ...result.inPlace,
    ...result.inSet,
    ...result.empty,
  ];
};

const MasterMind = () => {
  const {
    secretColorSet,
    gameWasRun,
    board,
    currentStepIndex,
    currentVariant,
    selectedItemIndex,
    commitIsDisabled,
    gameOver,
    selectColor,
    selectItem,
    startGame,
    commitVariant,
  } = useMasterMindGame();

  console.log('(!gameWasRun || gameOver)', (!gameWasRun || gameOver));

  return (
    <Box className="MasterMind" width="360px">
      <Box>
        <Typography variant="h2">Master Mind Game</Typography>
        {
          (!gameWasRun || gameOver) && (
            <Button onClick={startGame}>Start Game</Button>
          )
        }

        {
          gameOver && (
            <Typography>Game Over</Typography>
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
                        <IconButton color="primary"
                          onClick={commitVariant}
                          disabled={commitIsDisabled}>
                          <CheckCircle />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                }

                if (variantFromBoard) {
                  const response = getResponseOfVariant(variantFromBoard, secretColorSet);

                  return (
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                      border: '2px solid transparent',
                      borderRadius: '8px',
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
                          response.map((color, i) => (
                            <Peg key={i} color={color} size="small" />
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
                      border: '2px solid transparent',
                      borderRadius: '8px',
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
