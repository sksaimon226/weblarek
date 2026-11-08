import './scss/styles.scss';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { CartModel } from './components/Models/CartModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { CommunicationService } from './components/Models/CommunicationService';
import { Api } from './components/base/Api';
import { API_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { ICart, IOrderRequest, IProduct, TContactFormView, TFormMod, TOrderFormView } from './types';
import { Header } from './components/View/Header';
import { Gallery } from './components/View/Gallery';
import { Modal } from './components/View/Modal';
import { CatalogCardView } from './components/View/CatalogCardview';
import { ModalCardView } from './components/View/ModalCardView';
import {CartCardView} from './components/View/CartCardView';
import { Cart} from './components/View/Cart';
import { OrderFormView } from './components/View/OrderFormView';
import { ContactFormView } from './components/View/ContactFormView';
import { PayCheckMark } from './components/View/PayCheckMark';

// Шаблоны 
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const modalCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cartCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const checkMarkTemplate = ensureElement<HTMLTemplateElement>('#success');

// ---------- Брокер событий, API и модели данных ----------
const events = new EventEmitter();
const api = new Api(API_URL);
const webLarekApi = new CommunicationService(api);
const productCatalog = new ProductCatalog(events);
const cartmodel = new CartModel(events);
const buyerModel = new BuyerModel(events);

// ---------- Компоненты представления ----------
const header = new Header(events, ensureElement<HTMLElement>('.header'));
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new Modal(events, ensureElement<HTMLElement>('#modal-container'));
const cardPreview = new ModalCardView(events, cloneTemplate(modalCardTemplate));
const basketView = new Cart(events, cloneTemplate(cartTemplate));
const orderForm = new OrderFormView(events, cloneTemplate<HTMLFormElement>(orderTemplate));
const contactsForm = new ContactFormView(events, cloneTemplate<HTMLFormElement>(contactTemplate));
const success = new PayCheckMark(events, cloneTemplate(checkMarkTemplate));

// Карточки товаров в корзине
function getBasketCards(): HTMLElement[] {
    return cartmodel.getItems().map((item, index) => {
        const card = new CartCardView(cloneTemplate(cartCardTemplate), {
            onClick: () => events.emit('basket-item:delete-click', item),
        });
        return card.render({ title: item.title, price: item.price, index: index + 1 });
    });
}

// Данные для отрисовки корзины
function getBasketData(): ICart {
    return {
        items: getBasketCards(),
        total: cartmodel.getTotalPrice(),
        buttonDisabled: cartmodel.getItemCount() === 0,
    };
}

// Данные для формы способа оплаты и адреса
function getOrderFormData(): TOrderFormView {
    const { payment, address } = buyerModel.getData();
    const errors = buyerModel.validate();
    return {
        payment,
        address,
        valid: !errors.payment && !errors.address,
        errors: [errors.payment, errors.address].filter(Boolean).join(settings.errorsSeparator),
    };
}

// Данные для формы почты и телефона
function getContactsFormData(): TContactFormView {
    const { email, phone } = buyerModel.getData();
    const errors = buyerModel.validate();
    return {
        email,
        phone,
        valid: !errors.email && !errors.phone,
        errors: [errors.email, errors.phone].filter(Boolean).join(settings.errorsSeparator),
    };
}

// Изменился каталог: выводим карточки на главной странице
events.on('catalog:changed', () => {
    const cards = productCatalog.getItems().map((item) => {
        const card = new CatalogCardView(cloneTemplate(catalogCardTemplate), {
            onClick: () => events.emit('card:select', item),
        });
        return card.render({
            title: item.title,
            price: item.price,
            image: item.image,
            category: item.category,
        });
    });

    gallery.render({ catalog: cards });
});

// Изменился товар для просмотра: открываем его в модальном окне
events.on('preview:changed', () => {
    const product = productCatalog.getSelectedProduct();
    if (!product) return;

    let buttonText = settings.buyButtonText;
    if (product.price === null) {
        buttonText = settings.unavailableButtonText;
    } else if (cartmodel.hasItem(product.id)) {
        buttonText = settings.removeButtonText;
    }

    modal.render({
        content: cardPreview.render({
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            description: product.description,
            buttonText,
            buttonDisabled: product.price === null,
        }),
    });
    modal.open();
});

// Изменилась корзина: обновляем счётчик в шапке и содержимое корзины
events.on('basket:changed', () => {
    header.render({ counter: cartmodel.getItemCount() });
    basketView.render(getBasketData());
});

// Изменились данные покупателя: обновляем формы и ошибки валидации
events.on('buyer:changed', () => {
    orderForm.render(getOrderFormData());
    contactsForm.render(getContactsFormData());
});

// ---------- События представлений ----------

// Выбрана карточка в каталоге
events.on('card:select', (product: IProduct) => {
    productCatalog.setSelectedProduct(product);
});

// Нажата кнопка в карточке подробного просмотра: добавляем или удаляем товар
events.on('preview:button-click', () => {
    const product = productCatalog.getSelectedProduct();
    if (!product) return;

    if (cartmodel.hasItem(product.id)) {
        cartmodel.removeItem(product);
    } else {
        cartmodel.addItem(product);
    }
    modal.close();
});

// Нажата кнопка удаления товара в корзине
events.on('basket-item:delete-click', (product: IProduct) => {
    cartmodel.removeItem(product);
});

// Нажата кнопка открытия корзины
events.on('basket:open', () => {
    modal.render({ content: basketView.render() });
    modal.open();
});

// Нажата кнопка «Оформить» в корзине
events.on('basket:order', () => {
    modal.render({ content: orderForm.render() });
    modal.open();
});

// Изменены данные в форме
events.on('form:change', (data: TFormMod) => {
    buyerModel.setData(data);
});

// Отправлена первая форма: переходим ко второй
events.on('order:submit', () => {
    modal.render({ content: contactsForm.render() });
    modal.open();
});

// Отправлена вторая форма: оформляем заказ на сервере
events.on('contacts:submit', () => {
    const order: IOrderRequest = {
        ...buyerModel.getData(),
        total: cartmodel.getTotalPrice(),
        items: cartmodel.getItems().map((item) => item.id),
    };
     webLarekApi
        .sendOrder(order)
        .then((result) => {
            cartmodel.clear();
            buyerModel.clearData();
            modal.render({ content: success.render({ total: result.total }) });
            modal.open();
        })
        .catch((error) => {
            console.error('Ошибка оформления заказа', error);
        });
});

// Нажата кнопка закрытия сообщения об успешном заказе
events.on('success:close', () => {
    modal.close();
});


// События моделей выполнят начальный рендер счётчика, корзины и форм
cartmodel.clear();
buyerModel.clearData();

// ---------- Загрузка каталога с сервера ----------
webLarekApi
    .getProducts()
    .then((data) => {
        productCatalog.setItems(data.items);
    
    })
    .catch((error) => {
        console.error('Ошибка загрузки каталога', error);
    });