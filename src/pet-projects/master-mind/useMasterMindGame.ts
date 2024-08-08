import { useState } from 'react';
import { PegColor } from './components/Peg';

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
  const [secretColorSet, setSecretColorSet] = useState<VariantColor[] | null>(null);
  const [board, setBoard] = useState<BoardVariant[] | null>(null);
  const [currentVariant, setCurrentVariant] = useState<PegColor[]>(EMPTY_VARIANT);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const currentStepIndex = board ? board.length : 0;
  const gameWasRun = board !== null;

  const commitIsDisabled = currentVariant.some((v) => v === 'empty');
  console.log('commitIsDisabled', commitIsDisabled);
  const startGame = () => {
    const newSet = generateSecretColorSet();

    setSecretColorSet(newSet);
    setBoard([]);
  };

  const selectColor = (index: number, color: VariantColor) => {
    console.log(index, color);
    setCurrentVariant(prevVariant => {
      const newVariants = [...prevVariant];
      newVariants[index] = color;

      return newVariants;
    });
    setSelectedItemIndex(null);
  };

  const selectItem = (index: number) => {
    console.log('selectItem', index);
    setSelectedItemIndex(index);
  };

  const commitVariant = () => {
    setBoard(prevBoard => {
      if (prevBoard === null) {
        return prevBoard;
      }

      return [...prevBoard, currentVariant as BoardVariant];
    });
    setCurrentVariant(EMPTY_VARIANT);
  }

  return {
    currentStepIndex,
    gameWasRun,
    board,
    secretColorSet,
    currentVariant,
    selectedItemIndex,
    commitIsDisabled,
    selectColor,
    startGame,
    selectItem,
    commitVariant,
  };
};

export default useMasterMindGame;
