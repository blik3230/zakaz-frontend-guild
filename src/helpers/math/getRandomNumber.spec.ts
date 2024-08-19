import getRandomNumber from './getRandomNumber';

describe('getRandomNumber', () => {
  it('should generate a number between 0 and end when only end is provided', () => {
    const end = 10;
    const result = getRandomNumber(end);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(end);
  });

  it('should generate a number between start and end', () => {
    const start = 2;
    const end = 10;
    const result = getRandomNumber(start, end);

    expect(result).toBeGreaterThanOrEqual(start);
    expect(result).toBeLessThanOrEqual(end);
  });

  it('should generate a number with step', () => {
    const start = 2;
    const end = 10;
    const step = 2;
    const result = getRandomNumber(start, end, step);

    expect(result).toBeGreaterThanOrEqual(start);
    expect(result).toBeLessThanOrEqual(end);
    expect((result - start) % step).toBe(0);
  });

  it('should exclude specific numbers', () => {
    const start = 1;
    const end = 10;
    const exclude = [2, 4, 6, 8];
    const result = getRandomNumber(start, end, 1, exclude);

    expect(result).toBeGreaterThanOrEqual(start);
    expect(result).toBeLessThanOrEqual(end);
    expect(exclude).not.toContain(result);
  });

  it('should return undefined if all possible numbers are excluded', () => {
    const start = 1;
    const end = 4;
    const exclude = [1, 2, 3, 4];
    const result = getRandomNumber(start, end, 1, exclude);

    expect(result).toBeUndefined();
  });

  it('should return a number between 0 and end with step and exclusions', () => {
    const start = 0;
    const end = 10;
    const step = 2;
    const exclude = [2, 4, 6, 8];
    const result = getRandomNumber(start, end, step, exclude);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(end);
    expect((result - start) % step).toBe(0);
    expect(exclude).not.toContain(result);
  });
});
