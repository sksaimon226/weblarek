 import { IBuyer } from "../../types";
 import { ValidationErrors } from "../../types";
 
  export class Buyer {
  private data: IBuyer = {
    payment: null,
    address: '',
    phone: '',
    email: ''
  };

  /**
   * Сохраняет данные покупателя. Может принимать как все поля, так и отдельные.
   * @param partialData - объект с данными покупателя (частичный)
   */
  public setData(partialData: Partial<IBuyer>): void {
    this.data = {
      ...this.data,
      ...partialData
    };
  }

  /**
   * Возвращает все данные покупателя
   * @returns объект с данными покупателя
   */
  getData(): IBuyer {
    return { ...this.data };
  }

  /**
   * Очищает все данные покупателя, сбрасывая их к значениям по умолчанию
   */
  clearData(): void {
    this.data = {
      payment: null,
      address: '',
      phone: '',
      email: ''
    };
  }

  /**
   * Проверяет валидность данных и возвращает объект с ошибками
   * Поле считается валидным, если оно не пустое
   * @returns объект с сообщениями об ошибках для невалидных полей
   */
  validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (this.data.payment === null) {
      errors.payment = 'Не выбран вид оплаты';
    }

    if (!this.data.address.trim()) {
      errors.address = 'Укажите адрес доставки';
    }

    if (!this.data.phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    if (!this.data.email.trim()) {
      errors.email = 'Укажите email';
    }

    return errors;
  }

  /**
   * Проверяет, все ли данные валидны
   * @returns true, если нет ошибок валидации
   */
}