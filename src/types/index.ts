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


