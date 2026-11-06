import { BaseFormView } from './BaseFormView';
import { IEvents } from '../base/Events';
import { TFormMod, TOrderFormView, TPayment } from '../../types';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';

/**
 * Первый шаг оформления: способ оплаты и адрес доставки
 */
export class OrderFormView extends BaseFormView<TOrderFormView> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(events: IEvents, container: HTMLFormElement) {
        super(events, container);

        this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.cardButton.addEventListener('click', () => {
            this.events.emit<TFormMod>('form:change', { payment: 'card' });
        });

        this.cashButton.addEventListener('click', () => {
            this.events.emit<TFormMod>('form:change', { payment: 'cash' });
        });

        this.addressInput.addEventListener('input', () => {
            this.events.emit<TFormMod>('form:change', { address: this.addressInput.value });
        });
    }

    set payment(value: TPayment | '') {
        this.cardButton.classList.toggle(settings.paymentActiveClass, value === 'card');
        this.cashButton.classList.toggle(settings.paymentActiveClass, value === 'cash');
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}