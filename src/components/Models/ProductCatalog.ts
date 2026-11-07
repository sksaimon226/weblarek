 import { IProduct } from "../../types";
 import { IEvents } from '../base/Events';
 
 export class ProductCatalog {
    protected items: IProduct[] = [];
    protected SelectedProduct: IProduct | null = null;
    constructor(protected events: IEvents) {}

    setItems(items: IProduct[]): void {
        this.items = items;
        this.events.emit('catalog:changed')
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItem(id: string): IProduct | undefined {
        return this.items.find((item) => item.id === id);
    }

    setSelectedProduct(product: IProduct): void {
        this.SelectedProduct = product;
        this.events.emit('preview:changed');
    }

    getSelectedProduct(): IProduct | null {
        return this.SelectedProduct;
    }
}