import './scss/styles.scss';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { CommunicationService } from './components/Models/CommunicationService';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const productCatalog = new ProductCatalog();
const cart = new Cart();
const [product1, product2, product3] = productCatalog.getItems();
const buyer = new Buyer();
const api = new Api(API_URL);
const communicationService = new CommunicationService(api);

// Экземпляр каталога товаров
console.log('\n=== ПРОВЕРКА КЛАССА ProductCatalog ===');
console.log('Тестируем модель каталога товаров');
productCatalog.setItems(apiProducts.items);
// тут кладем моковые данные в каталог
console.log('Все товары:', productCatalog.getItems());
// проверяем что все попало в каталог
const firstProduct = productCatalog.getItems()[0];
console.log('Каталог: товар по id', productCatalog.getItem(firstProduct.id));
console.log('Каталог: товар по несуществующему id', productCatalog.getItem('no-such-id'));

console.log('Каталог: товар для просмотра до выбора', productCatalog.getSelectedProduct());
productCatalog.setSelectedProduct(firstProduct);
console.log('Каталог: товар для просмотра после выбора', productCatalog.getSelectedProduct());
// проверяем что можно получить товар


// Экземпляр корзины
console.log('\n=== ПРОВЕРКА КЛАССА Cart ===');
cart.addItem(product1);
cart.addItem(product2);
cart.addItem(product3); // товар без цены
cart.addItem(product1); // повторно — не должен добавиться
console.log('Корзина: товары после добавления', cart.getItems());
console.log('Корзина: количество товаров', cart.getItemCount());
console.log('Корзина: общая стоимость', cart.getTotalPrice());
console.log('Корзина: есть ли товар 1', cart.hasItem(product1.id));

cart.removeItem(product1);
console.log('Корзина: товары после удаления товара 1', cart.getItems());
console.log('Корзина: есть ли товар 1 после удаления', cart.hasItem(product1.id));
console.log('Корзина: стоимость после удаления', cart.getTotalPrice());

cart.clear();
console.log('Корзина: товары после очистки', cart.getItems());
console.log('Корзина: количество после очистки', cart.getItemCount());


// Экземпляр покупателя
console.log('\n=== ПРОВЕРКА КЛАССА Buyer ===');
console.log('Покупатель: ошибки пустой формы', buyer.validate());
buyer.setData({ payment: 'card' });
buyer.setData({ address: 'г. Москва, ул. Пушкина, д. 1' });
console.log('Покупатель: данные после ввода оплаты и адреса', buyer.getData());
console.log('Покупатель: ошибки после первого шага', buyer.validate());
buyer.setData({ email: 'test@test.ru', phone: '+7 999 123-45-67' });
console.log('Покупатель: все данные', buyer.getData());
console.log('Покупатель: ошибки заполненной формы', buyer.validate());
buyer.clearData();
console.log('Покупатель: данные после очистки', buyer.getData());
// Валидируем данные
const validationErrors = buyer.validate();
console.log('Ошибки валидации:', validationErrors);



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

