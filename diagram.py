import matplotlib.pyplot as plt

# Дані з бенчмарку
pixels = [0.78, 0.88, 1.06, 1.38, 1.38, 1.58]
times = [7.64, 9.48, 10.88, 11.86, 12.02, 12.78]

plt.figure(figsize=(8, 4.5))
plt.plot(pixels, times, marker='o', color='#38bdf8', linewidth=2, markersize=6)

plt.title('Залежність часу обробки від кількості пікселів', fontsize=12)
plt.xlabel('Кількість пікселів (Мп)', fontsize=10)
plt.ylabel('Середній час обробки (ms)', fontsize=10)
plt.grid(True, linestyle='--', alpha=0.6)

plt.savefig('benchmark_graph.png', dpi=300, bbox_inches='tight')
plt.show()