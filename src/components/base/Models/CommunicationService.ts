import { IApi } from '../../../types';
import { IProduct, IBuyer } from '../../../types'

// Тип для ответа сервера с товарами
interface IProductsResponse {
  items: IProduct[];
}

// Тип для ответа сервера при оформлении заказа
interface IOrderConfirmation {
  orderId: string;
  total: number;
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
  async getProducts(): Promise<IProductsResponse> {
    try {
      const response = await this.api.get('/product/');
      return response as IProductsResponse;
    } catch (error) {
      throw new Error(`Ошибка при получении товаров: ${error}`);
    }
  }

  /**
   * Отправляет данные о заказе на сервер
   * Выполняет POST‑запрос на эндпоинт /order/
   * @param buyer - данные покупателя (IBuyer)
   * @param cartItems - массив товаров из корзины (IProduct[])
   * @returns Promise<IOrderConfirmation> — объект, подтверждающий покупку
   * с указанием ID заказа и общей суммы
   */
  async sendOrder(
    buyer: IBuyer,
    cartItems: IProduct[]
  ): Promise<IOrderConfirmation> {
    try {
      // Формируем данные для отправки на сервер
      const orderData = {
        payment: buyer.payment,
        address: buyer.address,
        phone: buyer.phone,
        email: buyer.email,
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price ?? 0
        }))
      };

      const response = await this.api.post('/order/', orderData);
      return response as IOrderConfirmation;
    } catch (error) {
      throw new Error(`Ошибка при отправке заказа: ${error}`);
    }
  }
}

export { CommunicationService };