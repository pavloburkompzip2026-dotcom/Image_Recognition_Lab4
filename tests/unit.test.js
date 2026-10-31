const { rgbToHsl } = require('../src/colorConverter');
const { generateDataset } = require('../src/datasetGenerator');

describe('🧪 UNIT TESTS: Математичні алгоритми конвертації та формування даних', () => {

  test('UT-1: Конвертація чистив зеленого кольору (RGB 0, 255, 0 -> HSL)', () => {
    const result = rgbToHsl(0, 255, 0);
    expect(result.h).toBe(120); // 120 градусів = зелений
    expect(result.s).toBe(1);
    expect(result.l).toBe(0.5);
  });

  test('UT-2: Конвертація чистого синього кольору (RGB 0, 0, 255 -> HSL)', () => {
    const result = rgbToHsl(0, 0, 255);
    expect(result.h).toBe(240); // 240 градусів = синій
    expect(result.s).toBe(1);
    expect(result.l).toBe(0.5);
  });

  test('UT-3: Граничний кейс — Чорний колір (0, 0, 0)', () => {
    const result = rgbToHsl(0, 0, 0);
    expect(result).toEqual({ h: 0, s: 0, l: 0 });
  });

  test('UT-4: Генерація датасету — Перевірка обсягу та ключів структури', () => {
    const dataset = generateDataset();
    expect(dataset.length).toBe(300); // 100 * 3 класи
    expect(dataset[0]).toHaveProperty('input');
    expect(dataset[0]).toHaveProperty('output');
    expect(dataset[0].input).toHaveProperty('h_0');
  });
});