// Функция для сохранения всей страницы в sessionStorage
function savePageState() {
  const mainContent = document.querySelector('main'); // Главный контейнер
  if (mainContent) {
      sessionStorage.setItem('savedPage', mainContent.innerHTML);
  }
}

// Функция для загрузки сохраненного состояния страницы
function loadPageState() {
  const savedPage = sessionStorage.getItem('savedPage');
  if (savedPage) {
      const mainContent = document.querySelector('main');
      if (mainContent) {
          mainContent.innerHTML = savedPage;
          restoreEventListeners(); // Восстанавливаем обработчики событий
      }
  }
}

// Функция восстановления событий после загрузки из sessionStorage
function restoreEventListeners() {
  // Восстанавливаем обработчики событий для кнопок редактирования
  document.querySelectorAll('.edit-buttons button').forEach(button => {
      button.addEventListener('click', function (event) {
          if (event.target.matches('button[onclick="addRow()"]')) {
              addRow(event);
          } else if (event.target.matches('button[onclick="deleteRow()"]')) {
              deleteRow(event);
          }
      });
  });

  // Восстанавливаем кнопку "Редактировать"
  const editButton = document.getElementById('editButton');
  if (editButton) {
      editButton.addEventListener('click', toggleEditMode);
  }
}

// Функция для сохранения страницы при изменениях
function autoSaveOnEdit() {
  document.addEventListener('input', savePageState);
}

// Обработчик события для кнопки "Сохранить данные"
document.getElementById('saveDataButton').addEventListener('click', function () {
  savePageState();
  alert('Изменения сохранены!');
});

// Восстановление данных при загрузке страницы
window.addEventListener('load', function () {
  loadPageState();
  autoSaveOnEdit();
});