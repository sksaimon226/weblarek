export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

type TPayment = 'card' | 'cash';

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
  orderId: string;
  total: number;
}

