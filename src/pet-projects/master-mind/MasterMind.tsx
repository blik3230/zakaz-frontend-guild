import useMasterMindGame, { VariantColor } from './useMasterMindGame';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PegColor } from './components/Peg';
import BoardRow from './components/BoardRow';
import GameRules from './components/GameRules';
import { Dialog, DialogContent } from '@mui/material';

export const VARIANT_COUNT = 10;
const ITEMS_IN_VARIANT_COUNT = 4;


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
    boardVariants,
    currentStepIndex,
    currentVariant,
    selectedItemIndex,
    commitIsDisabled,
    gameOver,
    selectColor,
    selectItem,
    startGame,
    commitVariant,
    rulesIsOpen,
    openRules,
    closeRules,
  } = useMasterMindGame();

  return (
    <Box sx={{display: 'flex', gap: 10}} className="MasterMind" >
      <Box width="340px">
        <Box>
          <Typography variant="h4">Mastermind</Typography>

          <Button sx={{m: '12px 0'}} onClick={openRules}>Открыть правила игры</Button>

          {
            (gameOver) && (
              <Button onClick={startGame}>Start Game</Button>
            )
          }

          {
            gameOver && (
              <Typography>Game Over</Typography>
            )
          }
        </Box>

        <Box sx={{
          padding: '20px',
          border: '2px solid #303030',
          borderRadius: '8px',
          background: '#f2f3f2',
          boxShadow: '-2px 2px 10px rgba(0, 0, 0, 0.2)',
        }}>
          {
            Array.from({ length: VARIANT_COUNT }, (_v, variantIndex) => {

              if (variantIndex === currentStepIndex) {
                return (
                  <BoardRow
                    isActive
                    variant={currentVariant}
                    response={null}
                    commitIsDisabled={commitIsDisabled}
                    onItemClick={selectItem}
                    onSelectColor={selectColor}
                    selectedItemIndex={selectedItemIndex}
                    onCommit={commitVariant}
                  />
                );
              }

              const variantFromBoard = boardVariants![variantIndex];

              if (variantFromBoard) {
                const response = getResponseOfVariant(variantFromBoard, secretColorSet);

                return (
                  <BoardRow
                    variant={variantFromBoard}
                    response={response}
                  />
                );
              } else {
                return (
                  <BoardRow
                    variant={['empty', 'empty', 'empty', 'empty']}
                    response={null}
                  />
                );
              }
            }).reverse()
          }
        </Box>

    </Box>

      <Dialog
        open={rulesIsOpen}
        onClose={closeRules}
      >
        <DialogContent>
          <GameRules/>
        </DialogContent>
      </Dialog>


    </Box>

  );
};

export default MasterMind;
