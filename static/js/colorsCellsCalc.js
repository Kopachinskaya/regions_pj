// Находим ячейки для счета
const countResult = document.querySelector('.count-result');
const countRed = document.querySelector('.count-red');
const countYellow = document.querySelector('.count-yellow');
const countGreen = document.querySelector('.count-green');

// Меняем содержимое ячеек в зависимости от количества зон
const colorsCalc = () => {
    // Счетчики для каждой зоны
    let redCount = 0;
    let yellowCount = 0;
    let greenCount = 0;

    // Находим все строки таблицы
    const rows = document.querySelectorAll('table.spсified-color tbody tr');

    rows.forEach(row => {
        // Проверяем, является ли строка заголовком зоны
        if (row.cells.length > 0) {
            const firstCellText = row.cells[0].textContent.trim();

            if (firstCellText.includes('Желтые зоны')) {
                yellowCount++;
            } else if (firstCellText.includes('Красные зоны')) {
                redCount++;
            } else if (firstCellText.includes('Зеленые зоны')) {
                greenCount++;
            }
        }
    });

    // Меняем содержимое результата
    countResult.textContent = redCount + yellowCount + greenCount; // Общее количество зон

    countRed.textContent = redCount; // Количество красных зон
    countYellow.textContent = yellowCount; // Количество желтых зон
    countGreen.textContent = greenCount; // Количество зеленых зон
}

// Вызываем функцию для обновления счетчиков
colorsCalc();