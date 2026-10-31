const VisionAIEngine = require('../src/aiEngine');
const { rgbToHsl } = require('../src/colorConverter');

describe('🔗 INTEGRATION TESTS: Взаємодія RGB->HSL та ШІ-рушія Brain.js', () => {
  let engine;

  beforeEach(() => {
    engine = new VisionAIEngine();
  });

  test('IT-1: Повний цикл навчання та розпізнавання ландшафту "Густий ліс 🌲"', () => {
    // 1. Навчаємо модель
    engine.trainModelBatch(200, 0.05);

    // 2. Симулюємо зчитану з Canvas зелену матрицю (RGB: 34, 139, 34)
    const hsl = rgbToHsl(34, 139, 34);
    const mockInputs = {};
    for (let z = 0; z < 9; z++) {
      mockInputs[`h_${z}`] = hsl.h / 360;
      mockInputs[`s_${z}`] = hsl.s;
      mockInputs[`l_${z}`] = hsl.l;
    }

    // 3. Передаємо евристику зеленого спектра (55 < H <= 165)
    const heuristic = { forest: 13.5, water: 0, desert: 0 };
    const outcome = engine.processInputs(mockInputs, heuristic);

    // 4. Перевірка
    expect(outcome.resultName).toBe('Густий ліс 🌲');
    expect(outcome.probabilities.forest).toBeGreaterThan(50);
  });

  test('IT-2: Перевірка виправленої помилки з ЛР4 (Автозапуск навчання при відсутності попереднього виклику)', () => {
    expect(engine.isTrained).toBe(false);

    const mockInputs = {};
    for (let z = 0; z < 9; z++) {
      mockInputs[`h_${z}`] = 0.5;
      mockInputs[`s_${z}`] = 0.5;
      mockInputs[`l_${z}`] = 0.5;
    }

    // Запускаємо без попереднього trainModelBatch()
    const outcome = engine.processInputs(mockInputs, { forest: 0, water: 13.5, desert: 0 });

    // Перевіряємо, що прапорець isTrained автоматично став true
    expect(engine.isTrained).toBe(true);
    expect(outcome).toHaveProperty('resultName');
  });
});