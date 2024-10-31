function changeImage(imageNumber) {
    const rectangles = document.querySelectorAll('.rectangle'); // Получаем кнопки
    const phoneContentItems = document.querySelectorAll('.phone-content-item'); // Получаем все элементы контента

    // Удаляем класс 'active' у всех кнопок и контентных элементов
    rectangles.forEach(rectangle => rectangle.classList.remove('active'));
    phoneContentItems.forEach(item => item.classList.remove('active'));

    // В зависимости от номера изображения, обновляем изображение и активируем соответствующий контент
    switch(imageNumber) {
        case 1:
            rectangles[0].classList.add('active'); // Активируем кнопку
            phoneContentItems[0].classList.add('active'); // Активируем контентный элемент
            break;
        case 2:
            rectangles[1].classList.add('active');
            phoneContentItems[1].classList.add('active');
            break;
        case 3:
            rectangles[2].classList.add('active');
            phoneContentItems[2].classList.add('active');
            break;
    }
}