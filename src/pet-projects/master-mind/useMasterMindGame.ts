import { useState } from "react";

export type PegColor = 'red' | 'green' | 'blue' | 'yellow' | 'gray' | 'purple';

const colorMap: Record<number, PegColor> = {
  1: 'red',
  2: 'green',
  3: 'blue',
  4: 'yellow',
  5: 'gray',
  6: 'purple',
}

const generateSecretColorSet = () => {
  const set = new Set<PegColor>();

  while(set.size < 4) {
    set.add(colorMap[Math.ceil(Math.random() * 6)])
  }

  return Array.from(set);
};

const useMasterMindGame = () => {
  const [secretColorSet, setSecretColorSet] = useState<PegColor[] | null>(null);

  const startGame = () => {
    const newSet = generateSecretColorSet();

    setSecretColorSet(newSet);
  };

  return {
    secretColorSet,
    startGame,
  };
};

export default useMasterMindGame;
