import { BaseFormView } from './BaseFormView';
import { IEvents } from '../base/Events';
import { TCheckoutStep2FormView, TFormMod } from '../../types';
import { ensureElement } from '../../utils/utils';


export class CheckoutStep2FormView extends BaseFormView<TCheckoutStep2FormView> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(events: IEvents, container: HTMLFormElement) {
        super(events, container);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailInput.addEventListener('input', () => {
            this.events.emit<TFormMod>('form:change', { email: this.emailInput.value });
        });

        this.phoneInput.addEventListener('input', () => {
            this.events.emit<TFormMod>('form:change', { phone: this.phoneInput.value });
        });
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}