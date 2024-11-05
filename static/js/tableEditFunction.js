// Кнопка режима редактирования
const editButton = document.querySelector('.header__edit-button');
let isActive = false;

document.addEventListener('click', (e) => {
    if (e.target === editButton) {
        // Стилизуем активную кнопку
        editButton.classList.toggle('button--primary');
        
        // Переключаем режим редактирования
        isActive = !isActive;

        // Все редактируемые элементы на странице
        const editableElements = document.querySelectorAll('.info-table-header__item, .info-table-thead th, td');

        editableElements.forEach(element => {
            if (isActive) {
                element.classList.add('edit-active'); // Добавляем класс для стилизации
                element.setAttribute('contenteditable', 'true'); // Делаем элемент редактируемым
            } else {
                element.classList.remove('edit-active'); // Убираем класс
                element.removeAttribute('contenteditable'); // Убираем возможность редактирования
            }
        });
    }
});

// Функция для генерации
function generateResponse() {
    alert("Ответ сгенерирован!"); // Пример уведомления
}
