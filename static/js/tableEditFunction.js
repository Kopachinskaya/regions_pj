// Объявление переменных
const editButton = document.querySelector('.header__edit-button');
const editButtonsBlockList = document.querySelectorAll('.edit-buttons'); 
let isActive = false;


// Функция для добавления строки
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
        newCell.innerText = `Новая ячейка ${i + 1}`;
    }
}

// Функция для удаления строки
function deleteRow() {
    const table = event.target.closest('.table-wrap').querySelector('table');
    const rowCount = table.rows.length;

    if (rowCount > 1) {
        table.deleteRow(-1);
    } else {
        alert('Нельзя удалить все строки!');
    }
}

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

    addRowButtons(newRow.rowIndex);
}

// Функция для добавления кнопок под заголовком
function addRowButtons(headerRowIndex) {
    const rowButtonsDiv = document.getElementById("rowButtons");
    if (!rowButtonsDiv) return; // Проверка на существование элемента

    const buttonContainer = document.createElement('div');

    const addButton = document.createElement('button');
    addButton.innerText = 'Добавить строку';
    
    addButton.onclick = function() { addRow(headerRowIndex); };

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить строку';
    
    deleteButton.onclick = function() { deleteRow(headerRowIndex); };
    
    rowButtonsDiv.appendChild(buttonContainer);
}

// Добавление фото
function initContainerSplit() {
    const emptyBox = document.querySelector('.empty-box');
    const plusButton = document.createElement('button');
    plusButton.innerHTML = '+';
    plusButton.classList.add('split-button');
    plusButton.style.display = 'none';

    let splitCount = 0; // Количество нажатий

    plusButton.addEventListener('click', function handleSplit() {
        splitCount++;

        switch (splitCount) {
            case 1:
                // Первое нажатие: разделяем контейнер по высоте
                const originalHeight = emptyBox.offsetHeight; // Запоминаем исходную высоту
                const newHeight = (originalHeight - 5) / 2; // Учитываем расстояние 5px между контейнерами

                emptyBox.style.height = `${newHeight}px`;

                const newContainer1 = emptyBox.cloneNode(true);
                newContainer1.style.height = `${newHeight}px`; // Высота второго контейнера с учетом отступа

                // Удаляем кнопку `+` у первого контейнера
                emptyBox.querySelector('.split-button').remove();

                // Добавляем кнопку `+` только во второй контейнер
                const newPlusButton = document.createElement('button');
                newPlusButton.innerHTML = '+';
                newPlusButton.classList.add('split-button');
                newContainer1.appendChild(newPlusButton);

                // Обработчик для деления по ширине
                newPlusButton.addEventListener('click', function splitHorizontally() {
                    // Создаем flex-контейнер для горизонтального размещения
                    const horizontalWrapper = document.createElement('div');
                    horizontalWrapper.style.display = 'flex';
                    horizontalWrapper.style.width = '100%';
                    horizontalWrapper.style.height = `${newContainer1.offsetHeight}px`;
                    horizontalWrapper.style.gap = '20px'; // Отступ между контейнерами

                    // Создаем два новых контейнера и делим по ширине
                    const leftBox = newContainer1.cloneNode(true);
                    const rightBox = newContainer1.cloneNode(true);
                    leftBox.style.width = 'calc(50% - 2.5px)'; // Учитываем отступ
                    rightBox.style.width = 'calc(50% - 2.5px)';
                    leftBox.style.height = '100%';
                    rightBox.style.height = '100%';

                    // Удаляем кнопку `+` у второго контейнера после деления
                    newPlusButton.remove();

                    // Добавляем контейнеры в новый горизонтальный блок
                    horizontalWrapper.appendChild(leftBox);
                    horizontalWrapper.appendChild(rightBox);

                    // Заменяем старый контейнер новым горизонтальным блоком
                    newContainer1.replaceWith(horizontalWrapper);
                });

                emptyBox.parentNode.insertBefore(newContainer1, emptyBox.nextSibling);
                break;
        }
    });

    emptyBox.appendChild(plusButton);
}

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initContainerSplit();

    const editButton = document.querySelector('#editButton');

    editButton.addEventListener('click', () => {
        const splitButtons = document.querySelectorAll('.split-button');

        splitButtons.forEach(button => {
            button.style.display = button.style.display === 'none' ? 'block' : 'none';
        });
    });
});

// Обработчик события для кнопки "Редактировать таблицу"
document.addEventListener('click', (e) => {
    if (e.target === editButton) {
        isActive = !isActive; // Переключаем режим редактирования
        editButton.classList.toggle('button--primary', isActive); // Меняем стиль кнопки в зависимости от состояния

        const editableElements = document.querySelectorAll('.info-table-header__item, .info-table-thead th, td, .container-1 div');

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
