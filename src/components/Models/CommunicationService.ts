import { IApi } from '../../types';
import { IProduct, IBuyer } from '../../types'
import { IOrderConfirmation } from '../../types';

// Тип для ответа сервера с товарами
interface IProductsResponse {
  items: IProduct[];
}


/**
 * Класс CommunicationService — слой коммуникации с сервером.
 * Использует композицию: зависит от объекта, реализующего интерфейс IApi.
 */
class CommunicationService {
  private api: IApi;

  /**
   * Конструктор принимает объект, реализующий интерфейс IApi
   * @param api - экземпляр класса с методами get и post для выполнения HTTP‑запросов
   */
  constructor(api: IApi) {
    this.api = api;
  }

  /**
   * Получает массив товаров с сервера
   * Выполняет GET‑запрос на эндпоинт /product/
   * @returns Promise<IProductsResponse> — объект с массивом товаров
   */
  getProducts(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>('/product/');
  }

  /**
   * Отправляет данные о заказе на сервер
   * Выполняет POST‑запрос на эндпоинт /order/
   * @param buyer - данные покупателя (IBuyer)
   * @param cartItems - массив товаров из корзины (IProduct[])
   * @returns Promise<IOrderConfirmation> — объект, подтверждающий покупку
   * с указанием ID заказа и общей суммы
   */
  sendOrder(
    buyer: IBuyer,
    cartItems: IProduct[]
  ): Promise<IOrderConfirmation> {
    return this.api.post<IOrderConfirmation>('/order/', {
      payment: buyer.payment,
      address: buyer.address,
      phone: buyer.phone,
      email: buyer.email,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price ?? 0
      }))
    });
  }
}

export { CommunicationService };