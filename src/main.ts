import './scss/styles.scss';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { CommunicationService } from './components/Models/CommunicationService';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';



// Экземпляр каталога товаров
const productCatalog = new ProductCatalog();
console.log('Тестируем модель каталога товаров');

productCatalog.setItems(apiProducts.items);
// тут кладем моковые данные в каталог
console.log('Все товары:', productCatalog.getItems());
// проверяем что все попало в каталог

console.log('Товар по id:', productCatalog.getItems(apiProducts.items[0].id));
// проверяем что можно получить товар

// Экземпляр корзины
const cart = new Cart();

// Экземпляр покупателя
const buyer = new Buyer();

const api = new Api(API_URL);
const communicationService = new CommunicationService(api);


// Находим товар по ID
const testProductId = '854cef69-976d-4c2a-a18c-2aa45046c390';
const foundProduct = productCatalog.getItemById(testProductId);

console.log(`Товар с ID ${testProductId}:`, foundProduct);
// Устанавливаем выбранный товар для подробного отображения
if (foundProduct) {
    productCatalog.setSelectedProduct(foundProduct);
}

// Получаем выбранный товар
console.log('Выбранный товар:', productCatalog.getSelectedProduct());

console.log('\n=== ПРОВЕРКА КЛАССА Cart ===');

// Добавляем товары в корзину
if (foundProduct) {
    cart.addItem(foundProduct);
}
const secondProduct = productCatalog.getItemById('2');
if (secondProduct) {
    cart.addItem(secondProduct);
}

// Получаем товары из корзины
console.log('Товары в корзине:', cart.getItems());

// Проверяем наличие товара в корзине
console.log('Есть товар с ID 1 в корзине?', cart.hasItem('1'));

// Получаем общую стоимость
console.log('Общая стоимость товаров в корзине:', cart.getTotalPrice());

// Получаем количество товаров
console.log('Количество товаров в корзине:', cart.getItemCount());

// Удаляем один товар из корзины
if (secondProduct) {
    cart.removeItem(secondProduct);
}
console.log('После удаления второго товара:', cart.getItems());
console.log('Новая общая стоимость:', cart.getTotalPrice());

console.log('\n=== ПРОВЕРКА КЛАССА Buyer ===');

// Получаем данные покупателя
console.log('Данные покупателя:', buyer.getData());

// Валидируем данные
const validationErrors = buyer.validate();
console.log('Ошибки валидации:', validationErrors);

// Очищаем данные покупателя
buyer.clearData();
console.log('После очистки данных:', buyer.getData());
// === ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА И СОХРАНЕНИЕ В МОДЕЛИ КАТАЛОГА ===

console.log('Загрузка товаров с сервера');
communicationService.getProducts()
    .then(productsResponse => {
        // Сохраняем полученные товары в модель каталога
        productCatalog.setItems(productsResponse.items)
        // ПРОВЕРКА: убеждаемся, что данные сохранились в каталоге
        console.log('=== ПРОВЕРКА ДАННЫХ В КАТАЛОГЕ ===');

        // 1. Выводим общее количество товаров
        const catalogItems = productCatalog.getItems();
        console.log('Количество товаров в каталоге после сохранения:', catalogItems.length);


        // 2. Выводим первый товар для проверки структуры
        if (catalogItems.length > 0) {
            console.log('Первый товар в каталоге:', catalogItems[0]);
        }
    }).catch((error: Error) => {
        console.error('Ошибка при загрузке товаров с сервера:', error);
    });