import { useState } from 'react';
import { PegColor } from './components/Peg';
import { VARIANT_COUNT } from './MasterMind';

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

const ITEMS_IN_VARIANT_COUNT = 4;


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
  const [boardVariants, setBoardVariants] = useState<BoardVariant[]>([]);
  const [currentVariant, setCurrentVariant] = useState<PegColor[]>(EMPTY_VARIANT);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [rulesIsOpen, setRulesIsOpen] = useState<boolean>(false);

  const currentStepIndex = boardVariants.length;


  const commitIsDisabled = currentVariant.some((v) => v === 'empty');

  console.log('secretColorSet', secretColorSet);

  const startGame = () => {
    const newSet = generateSecretColorSet();

    setSecretColorSet(newSet);
    setBoardVariants([]);
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

  const getResponseOfVariant = (
    variant: PegColor[],
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

  const checkVariant = (variant: PegColor[]) => {
    const response = getResponseOfVariant(variant);
    return response.every((v) => v === 'green');
  }

  const commitVariant = () => {
    const newBoard = [...boardVariants, currentVariant as BoardVariant];

    setBoardVariants(newBoard);
    setCurrentVariant(EMPTY_VARIANT);

    // on first step determinate secret color set
    if (secretColorSet === null) {
      const newSecretColorSet = generateSecretColorSet();

      setSecretColorSet(newSecretColorSet);
    }

    const isSuccess = checkVariant(currentVariant);
    const isLastStep = newBoard.length === VARIANT_COUNT;

    if (isSuccess || isLastStep) {
      setGameOver(true);
    }
  }

  const openRules = () => setRulesIsOpen(true);
  const closeRules = () => setRulesIsOpen(false);

  return {
    currentStepIndex,
    boardVariants,
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
    checkVariant,
    getResponseOfVariant,
  };
};

export default useMasterMindGame;
