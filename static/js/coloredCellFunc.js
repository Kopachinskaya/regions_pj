// Определяем нужные ячейки с отклонениями и мероприятиями 
const divationCells = document.querySelectorAll('.percent');
const eventCells = document.querySelectorAll('.event');

// Перебираем все ячейки с процентами
divationCells.forEach(divationCell => {
    // Преобразуем строку в число (если такое вообще возможно)
    const deviationCellNumber = Number(divationCell.textContent)
    // Получаем родительский элемент td
    const parentTd = divationCell.parentElement;
    // Проверяем, насколько большой процент и красим в соответсвущий цвет
    if (deviationCellNumber <= 18) {
        parentTd.classList.add('highlight-green');
    } else if (deviationCellNumber <= 40) {
        parentTd.classList.add('highlight-yellow');
    } else if (deviationCellNumber > 40) {
        parentTd.classList.add('highlight-red');
    }
});