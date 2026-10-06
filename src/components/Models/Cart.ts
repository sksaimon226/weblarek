 import { IProduct } from "../../types";
 
 export class Cart {
  private items: IProduct[] = [];

  /**
   * Возвращает массив товаров, находящихся в корзине
   * @returns массив товаров
   */
  getItems(): IProduct[] {
    return this.items; // возвращаем копию массива
  }

  /**
   * Добавляет товар в корзину
   * @param product - товар для добавления
   */
  addItem(product: IProduct): void {
    this.items.push(product);
  }

  /**
   * Удаляет товар из корзины
   * @param product - товар для удаления
   */
  removeItem(product: IProduct): void {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  /**
   * Очищает корзину — удаляет все товары
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Рассчитывает общую стоимость всех товаров в корзине
   * @returns общая стоимость товаров
   */
  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price ?? 0);
    }, 0);
  }

  /**
   * Получает количество товаров в корзине (общее число позиций)
   * @returns количество товаров
   */
  getItemCount(): number {
    return this.items.length;
  }

  /**
   * Проверяет наличие товара в корзине по его ID
   * @param id - идентификатор товара
   * @returns true, если товар есть в корзине, false — если нет
   */
  hasItem(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}