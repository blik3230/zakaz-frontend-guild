import useMasterMindGame from './useMasterMindGame';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BoardRow from './components/BoardRow';
import GameRules from './components/GameRules';
import { Dialog, DialogContent } from '@mui/material';

export const VARIANT_COUNT = 10;

const MasterMind = () => {
  const {
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
    checkVariant,
    getResponseOfVariant,
    secretColorSet,
  } = useMasterMindGame();

  const renderGameOver = () => {
    const lastVariant = boardVariants[boardVariants.length - 1];

    const successfully = checkVariant(lastVariant);

    if (successfully) {
      return (
        <Box
          sx={{ p: '10px' }}
        >
          <Typography variant="h4">Поздравляю ты разгадал комбинацию. Кол-во попыток:{boardVariants.length} </Typography>
          <Button onClick={startGame}>Начать заново</Button>
        </Box>
      );
    }

    return (
      <Box
        sx={{ p: '10px' }}
      >
        <Typography variant="h4">Тебе не удалось разгадать комбинацию</Typography>
        <BoardRow variant={secretColorSet || []} response={null} />
        <Typography variant="h5">Удачи в следующий раз!</Typography>
        <Button onClick={startGame}>Начать заново</Button>
      </Box>
    );
  };

  return (
    <Box className="MasterMind" >
      <Box>
        <Box>
          <Typography variant="h4">Mastermind</Typography>

          <Button sx={{m: '12px 0'}} onClick={openRules}>Открыть правила игры</Button>

          {
            gameOver && renderGameOver()
          }
        </Box>

        <Box sx={{
          width: '340px',
          padding: '20px',
          border: '2px solid #303030',
          borderRadius: '8px',
          background: '#f2f3f2',
          boxShadow: '-2px 2px 10px rgba(0, 0, 0, 0.2)',
        }}>
          {
            Array.from({ length: VARIANT_COUNT }, (_v, variantIndex) => {

              if (variantIndex === currentStepIndex) {

                if (gameOver) {
                  return (
                    <BoardRow
                      variant={['empty', 'empty', 'empty', 'empty']}
                      response={null}
                    />
                  );
                }

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
                const response = getResponseOfVariant(variantFromBoard);

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
