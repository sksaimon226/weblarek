import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ICheckMark } from '../../types';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';

/**
 * Сообщение об успешном оформлении заказа
 */
export class PayCheckMark extends Component<ICheckMark> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

    set total(value: number) {
        this.descriptionElement.textContent = `${settings.CheckMark} ${value} ${settings.Synapses}`;
    }
}