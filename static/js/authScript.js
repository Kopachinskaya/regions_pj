// Личный кабинет
function togglePassword() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // Проверяем текущее состояние поля пароля
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Меняем тип на текст для показа пароля
        eyeIcon.src = 'img/eye-open.png'; // Меняем изображение на открытый глаз
    } else {
        passwordField.type = 'password'; // Скрываем пароль
        eyeIcon.src = 'img/eye-closed.png'; // Меняем изображение на закрытый глаз
    }
}

// Функция для входа (пример)
document.getElementById('loginButton').addEventListener('click', login);

function login() {
    const email = document.getElementById('email').value; // Получаем значение поля email
    const password = document.getElementById('password').value; // Получаем значение поля пароля

    // Проверка логина и пароля
    if (email === 'azarova_04@internet.ru' && password === '00000000') {
        window.location.href = 'page1.html'; // Переход на страницу 1
    } else {
        alert('Неправильный логин или пароль!'); // Сообщение об ошибке
    }
}
