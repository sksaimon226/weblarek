import { BaseCardView } from '../View/BaseCardView'
import { ICardActions, TCartCardView } from '../../types';
import { ensureElement } from '../../utils/utils';

/**
 * Карточка товара в корзине
 */
export class CartCardView extends BaseCardView<TCartCardView> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (actions?.onClick) {
            this.deleteButton.addEventListener('click', actions.onClick);
        }
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}