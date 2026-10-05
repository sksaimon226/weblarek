import './scss/styles.scss';
import { ProductCatalog } from '../src/components/base/models/ProductCatalog';
import { Cart } from '../src/components/base/models/Cart';
import { Buyer } from '../src/components/base/models/Buyer';
//import { IProduct } from '../src/types/index'//
import { apiProducts } from './utils/data';

// Экземпляр каталога товаров
const productCatalog = new ProductCatalog(apiProducts.items);

// Экземпляр корзины
const cart = new Cart();

// Экземпляр покупателя
const buyer = new Buyer({
  address: 'ул. Ленина, 15',
  phone: '+7 (999) 123-45-67',
  email: 'user@example.com'
});

// Получаем все товары из каталога
console.log('Все товары в каталоге:', productCatalog.getItems());

// Находим товар по ID
const foundProduct = productCatalog.getItemById('1');
console.log('Товар с ID 1:', foundProduct);

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
console.log('Все данные валидны?', buyer.isValid());

// Добавляем вид оплаты
buyer.setPayment('card');
console.log('После добавления вида оплаты:', buyer.getData());
console.log('Теперь все данные валидны?', buyer.isValid());

// Очищаем данные покупателя
buyer.clearData();
console.log('После очистки данных:', buyer.getData());