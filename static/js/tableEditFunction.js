// Редактор текста
const editButton = document.querySelector('.header__edit-button');
const editButtonsBlockList = document.querySelectorAll('.edit-buttons'); 
let isActive = false;

document.addEventListener('click', (e) => {
    if (e.target === editButton) {
        editButton.classList.toggle('button--primary');
        isActive = !isActive;

        const editableElements = document.querySelectorAll('.info-table-thead th, td');

        editableElements.forEach(element => {
            if (isActive) {
                element.classList.add('edit-active');
                element.setAttribute('contenteditable', 'true');
            } else {
                element.classList.remove('edit-active');
                element.removeAttribute('contenteditable');
            }
        });

        editButtonsBlockList.forEach(editButtonsBlockItem => {
            editButtonsBlockItem.style.display = isActive ? 'block' : 'none';
        });
    }
});

// Добавить строку
function addRow() {
    const table = event.target.closest('.table-wrap').querySelector('table');
    let maxCellCount = 0;
    // Проходим по всем строкам таблицы, чтобы найти максимальное количество ячеек
    for (let i = 0; i < table.rows.length; i++) {
        const cellCount = table.rows[i].cells.length;
        if (cellCount > maxCellCount) {
            maxCellCount = cellCount; // Обновляем максимальное количество ячеек
        }
    }
    const newRow = table.insertRow(-1); // Добавляем новую строку в конец таблицы

    // Добавляем ячейки в новую строку
    for (let i = 0; i < maxCellCount; i++) {
        const newCell = newRow.insertCell(i);
        newCell.setAttribute('contenteditable', 'true'); // Делаем ячейку редактируемой
    }
}

// Удалить строку
function deleteRow() {
    const table = event.target.closest('.table-wrap').querySelector('table');
    const rowCount = table.rows.length;

    if (rowCount > 1) {
        table.deleteRow(rowCount - 1);
    } else {
        alert('Нельзя удалить все строки!');
    }
}

/* // Добавить столбец
function addColumn() {
    const table = event.target.closest('.table-wrap').querySelector('table');

    for (let i = 0; i < table.rows.length; i++) {
        const newCell = table.rows[i].insertCell(-1);
        
        if (i === 0) {
            newCell.innerHTML = 'Новый столбец';
        } else {
            newCell.setAttribute('contenteditable', 'true');
        }
    }
}

// Удалить столбец
function deleteColumn() {
    const table = event.target.closest('.table-wrap').querySelector('table');
    const colCount = table.rows[0].cells.length;

    if (colCount > 1) { // Убедимся, что не удаляем все столбцы
        for (let i = 0; i < table.rows.length; i++) {
            const lastCellIndex = table.rows[i].cells.length - 1; // Индекс последней ячейки
            table.rows[i].deleteCell(lastCellIndex); // Удаляем последнюю ячейку в текущей строке
        }
    } else {
        alert('Нельзя удалить все столбцы!'); // Предупреждение, если останется только один столбец
    }
} */

// Функция для добавления заголовка
function addHeader(color) {
    const table = event.target.closest('.table-wrap').querySelector('table');
    const newRow = table.insertRow(-1); // Вставляем строку в конец таблицы

    let newCell = newRow.insertCell(0);
    newCell.colSpan = 4; // Объединяем все 4 столбца
    newCell.className = `highlight-${color}`; // Устанавливаем класс цвета

    // Устанавливаем текст заголовка
    switch (color) {
        case 'yellow':
            newCell.innerHTML = 'Желтые зоны';
            break;
        case 'red':
            newCell.innerHTML = 'Красные зоны';
            break;
        case 'green':
            newCell.innerHTML = 'Зеленые зоны';
            break;
    }

    // Добавляем кнопки для добавления и удаления строк под новым заголовком
    addRowButtons(newRow.rowIndex);
}

// Функция для добавления кнопок под заголовком
function addRowButtons(headerRowIndex) {
    const rowButtonsDiv = document.getElementById("rowButtons");
    
    // Создаем контейнер для кнопок
    const buttonContainer = document.createElement('div');
    
    // Кнопка для добавления строки
    const addButton = document.createElement('button');
    addButton.innerText = 'Добавить строку';
    
    // Устанавливаем обработчик события на кнопку добавления строки
    addButton.onclick = function() { addRow(headerRowIndex); };
    
    // Кнопка для удаления строки
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить строку';
    
    // Устанавливаем обработчик события на кнопку удаления строки
    deleteButton.onclick = function() { deleteRow(headerRowIndex); };
    
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(deleteButton);
    
    rowButtonsDiv.appendChild(buttonContainer);
}
