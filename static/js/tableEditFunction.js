// Кнопка режима редактирования
const editButton = document.querySelector('.header__edit-button');
// Переключатель
let isActive = false;

document.addEventListener('click', (e) => {
    if (e.target === editButton) {
        // Все таблицы на странице
        const tableList = document.querySelectorAll('table');
        // Стилизуем активную кнопку
        editButton.classList.toggle('button--primary');
        // Переключаем режим редактирования
        isActive = !isActive;
        // Функция для обновления классов ячеек
        const updateEditActiveClass = (addClass) => {
            tableList.forEach(tableListItem => {
                const tableCells = tableListItem.querySelectorAll('td');
                tableCells.forEach(tableCell => {
                    if (addClass) {
                        tableCell.classList.add('edit-active');
                    } else {
                        tableCell.classList.remove('edit-active');
                        // Удаляем атрибут contenteditable, если режим редактирования отключен
                        tableCell.removeAttribute('contenteditable');
                    }
                });
            });
        };
        // Вызов функции с нужным параметром
        updateEditActiveClass(isActive);
    }

    // Проверяем, кликнули ли по ячейке таблицы
    const targetTd = e.target.closest('.editable-table td');
    if (targetTd && targetTd.classList.contains('edit-active')) {
        if (isActive) {
            // Даем возможность редактировать текст в ячейке
            targetTd.setAttribute('contenteditable', 'true');
            // Устанавливаем фокус на ячейку для удобства редактирования
            targetTd.focus(); 
            // Обработка события потери фокуса для сохранения изменений
            targetTd.addEventListener('blur', () => {
                // Убираем возможность редактирования после выхода из ячейки
                targetTd.removeAttribute('contenteditable'); 
                // { once: true }, чтобы обработчик сработал только один раз
            }, { once: true }); 
        }
    }
});
