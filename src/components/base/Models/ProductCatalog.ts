 import { IProduct } from "../../../types";
 
 export class ProductCatalog {
  private items: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  /**
   * Сохраняет массив товаров в модели
   * @param products - массив товаров для сохранения
   */
  setItems(products: IProduct[]): void {
    this.items = products;
  }

  /**
   * Возвращает массив всех товаров
   * @returns массив товаров
   */
  getItems(): IProduct[] {
    return this.items;
  }

  /**
   * Находит товар по его ID
   * @param id - идентификатор товара
   * @returns найденный товар или null, если товар не найден
   */
  getItemById(id: string): IProduct | null {
    return this.items.find(product => product.id === id) || null;
  }

  /**
   * Сохраняет товар для подробного отображения
   * @param product - товар для сохранения
   */
  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  /**
   * Возвращает товар, выбранный для подробного отображения
   * @returns выбранный товар или null, если товар не выбран
   */
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}