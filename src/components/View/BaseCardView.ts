import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';
import { TBaseCard } from '../../types';

export abstract class BaseCardView<T extends TBaseCard> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent = value === null
            ? settings.priceless
            : `${value} ${settings.Synapses}`;
    }
}