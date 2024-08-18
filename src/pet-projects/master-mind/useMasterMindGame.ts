import { useState } from 'react';
import { PegColor } from './components/Peg';
import { getResponseOfVariant, VARIANT_COUNT } from './MasterMind';

export type VariantColor =
  'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'gray'
  | 'purple';

type BoardVariant = VariantColor[];

const variantColorMap: Record<number, VariantColor> = {
  1: 'red',
  2: 'green',
  3: 'blue',
  4: 'yellow',
  5: 'gray',
  6: 'purple',
};


const EMPTY_VARIANT: PegColor[] = ['empty', 'empty', 'empty', 'empty'];

const generateSecretColorSet = () => {
  const set = new Set<VariantColor>();

  while (set.size < 4) {
    set.add(variantColorMap[Math.ceil(Math.random() * 6)]);
  }

  return Array.from(set);
};

const useMasterMindGame = () => {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [secretColorSet, setSecretColorSet] = useState<VariantColor[] | null>(null);
  const [board, setBoard] = useState<BoardVariant[] | null>(null);
  const [currentVariant, setCurrentVariant] = useState<PegColor[]>(EMPTY_VARIANT);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [rulesIsOpen, setRulesIsOpen] = useState<boolean>(false);

  const currentStepIndex = board ? board.length : 0;
  const gameWasRun = board !== null;
  console.log('gameWasRun', gameWasRun);
  console.log('gameOver', gameOver);


  const commitIsDisabled = currentVariant.some((v) => v === 'empty');
  console.log('commitIsDisabled', commitIsDisabled);

  const startGame = () => {
    const newSet = generateSecretColorSet();

    setSecretColorSet(newSet);
    setBoard([]);
    setGameOver(false);
  };

  const selectColor = (index: number, color: VariantColor) => {
    const newVariant = currentVariant.map(v => {
      if (v === color) {
        return 'empty';
      }

      return v;
    });

    newVariant[index] = color;

    setCurrentVariant(newVariant);

    let firstEmptyIndex = newVariant.findIndex(v => v === 'empty');

    setSelectedItemIndex(firstEmptyIndex);
  };

  const selectItem = (index: number) => {
    setSelectedItemIndex(index === selectedItemIndex? null : index);
  };

  const commitVariant = () => {
    if (board) {
      const newBoard = [...board, currentVariant as BoardVariant];

      setBoard(newBoard);
      setCurrentVariant(EMPTY_VARIANT);

      const response = getResponseOfVariant(currentVariant, secretColorSet);
      const isSuccess = response.every((v) => v === 'green');
      const isLastStep = newBoard.length === VARIANT_COUNT;

      if (isSuccess || isLastStep) {
        setGameOver(true);
      }
    }
  }

  const openRules = () => setRulesIsOpen(true);
  const closeRules = () => setRulesIsOpen(false);

  return {
    currentStepIndex,
    gameWasRun,
    board,
    secretColorSet,
    currentVariant,
    selectedItemIndex,
    commitIsDisabled,
    gameOver,
    rulesIsOpen,
    openRules,
    closeRules,
    selectColor,
    startGame,
    selectItem,
    commitVariant,
  };
};

export default useMasterMindGame;
