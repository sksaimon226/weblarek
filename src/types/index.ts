export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash';

export interface IBuyer {
  payment: TPayment | null;
  address: string;
  phone: string;
  email: string;
}

export interface ValidationErrors {
  payment?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}


// Тип для ответа сервера с товарами
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

// Тип для ответа сервера при оформлении заказа
export interface IOrderConfirmation {
  Id: string;
  total: number;
}

// Интерфейс для данных, отправляемых на сервер при оформлении заказа
export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

export interface IHeader {
    counter: number;
}

export interface IGallery {
    catalog: HTMLElement[];
}

export interface IModal {
    content: HTMLElement;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export type TBaseCard = Pick<IProduct, 'title' | 'price'>;
export type TCatalogCardView = TBaseCard & Pick<IProduct, 'image' | 'category'>;

export type TModelCardView = TCatalogCardView & Pick<IProduct, 'description'> & {
    buttonText: string;
    buttonDisabled: boolean;
};

export type TCartCardView = TBaseCard & {
    index: number;
};

export interface IBaseForm {
    valid: boolean;
    errors: string;
}

export type TOrderFormView = IBaseForm & Pick<IBuyer, 'payment' | 'address'>;
export type TFormMod = Partial<IBuyer>;
export type TContactFormView = IBaseForm & Pick<IBuyer, 'email' | 'phone'>;

export interface ICheckMark {
    total: number;
}

export interface ICart {
    items: HTMLElement[];
    total: number;
    buttonDisabled: boolean;
}