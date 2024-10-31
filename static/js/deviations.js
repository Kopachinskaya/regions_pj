document.addEventListener('DOMContentLoaded', function () {
    const deviationCells = document.querySelectorAll('.deviation');

    deviationCells.forEach(cell => {
        const value = parseFloat(cell.textContent.trim()); // Получаем значение из ячейки, удаляя лишние пробелы

        if (!isNaN(value)) { // Проверка, что значение - число
            if (value >= 0) {
                cell.style.color = '#A9D18E'; // Устанавливаем зеленый цвет текста
            } else {
                cell.style.color = '#ff4d4d'; // Устанавливаем красный цвет текста
            }
        }
    });
});