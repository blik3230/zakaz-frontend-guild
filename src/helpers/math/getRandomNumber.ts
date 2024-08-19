function getRandomNumber(end: number): number;
function getRandomNumber(start: number, end: number): number;
function getRandomNumber(start: number, end: number, step: number): number;
function getRandomNumber(start: number, end: number, step: number, exclude: number[]): number;

function getRandomNumber(
  startOrEnd: number,
  end?: number,
  step: number = 1,
  exclude: number[] = []
): number | undefined {
  let start: number;

  if (end === undefined) {
    // Если передан только один аргумент, он считается концом диапазона, а начало равно 0
    start = 0;
    end = startOrEnd;
  } else {
    // Если переданы два аргумента, это начало и конец диапазона
    start = startOrEnd;
  }

  // Рассчитываем количество возможных шагов в указанном диапазоне
  const range = Math.floor((end - start) / step);

  // Создаем массив всех возможных значений
  const possibleValues = [];
  for (let i = 0; i <= range; i++) {
    const value = start + i * step;
    if (!exclude.includes(value)) {
      possibleValues.push(value);
    }
  }

  // Если нет доступных значений, возвращаем undefined или выбрасываем ошибку
  if (possibleValues.length === 0) {
    console.warn('Нет доступных значений для генерации.');
    return undefined; // Или можно выбросить ошибку: throw new Error('Нет доступных значений для генерации.');
  }

  // Генерируем случайное число из оставшихся доступных значений
  const randomIndex = Math.floor(Math.random() * possibleValues.length);
  return possibleValues[randomIndex];
}

export default getRandomNumber;
