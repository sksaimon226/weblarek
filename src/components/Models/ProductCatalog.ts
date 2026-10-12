 import { IProduct } from "../../types";
 
 export class ProductCatalog {
    protected items: IProduct[] = [];
    protected SelectedProduct: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItem(id: string): IProduct | undefined {
        return this.items.find((item) => item.id === id);
    }

    setSelectedProduct(product: IProduct): void {
        this.SelectedProduct = product;
    }

    getSelectedProduct(): IProduct | null {
        return this.SelectedProduct;
    }
}