class Tabs {
  // объявляем JavaScript класс Tabs
  constructor(config) {
    // специальный метод constructor принимает объект со значениями CSS классов и селекторов
    this.tabs = config.tabsSelector; // записываем в экземпляр JavaScript класса переданный селектор основного элемента вкладок
    this.head = config.tabsHeadSelector; // записываем в экземпляр JavaScript класса переданный селектор элемента c кнопками
    this.body = config.tabsBodySelector; // записываем в экземпляр JavaScript класса переданный селектор элемента c контентом
    this.caption = config.tabsCaptionSelector; // записываем в экземпляр JavaScript класса переданный селектор элемента кнопки
    this.captionActiveClass = config.tabsCaptionActiveClass; // записываем в экземпляр JavaScript класса переданный активный CSS класс элемента кнопки
    this.contentActiveClass = config.tabsContentActiveClass; // записываем в экземпляр JavaScript класса переданный активный CSS класс элемента контента
  }

  getActiveTabName(head) {
    // метод для получения названия активной вкладки
    return head.querySelector(`.${this.captionActiveClass}`).dataset.tab; // возвращаем значение data-tab активной кнопки
  }

  setActiveContent(head, body) {
    // метод для установки активного элемента контента
    if (body.querySelector(`.${this.contentActiveClass}`)) {
      // если уже есть активный элемент контента
      body.querySelector(`.${this.contentActiveClass}`).classList.remove(this.contentActiveClass); // то скрываем его
    }
    const content = body.querySelector(`[data-tab=${this.getActiveTabName(head)}]`);

    content.classList.add(this.contentActiveClass); // затем ищем элемент контента, у которого значение data-tab совпадает со значением data-tab активной кнопки и отображаем его
  }

  onLoad(head, body) {
    // метод для описания логики при загрузке страницы
    // проверяем при загрузке страницы, есть ли активная вкладка
    if (!head.querySelector(`.${this.captionActiveClass}`)) {
      // если активной вкладки нет
      head.querySelector(this.caption).classList.add(this.captionActiveClass); // то делаем активной по-умолчанию первую вкладку
    }

    this.setActiveContent(head, body); // устанавливаем активный элемент контента в соответствии с активной кнопкой при загрузке страницы
  }

  onClick(head, body) {
    // метод для описания логики при клике на элемент с кнопками
    head.addEventListener('click', (e) => {
      // при клике на элемент с кнопками
      const caption = e.target.closest(this.caption); // узнаем, был ли клик на кнопке
      if (!caption) return; // если клик был не на кнопке, то прерываем выполнение метода
      if (caption.classList.contains(this.captionActiveClass)) return; // если клик был на активной кнопке, то тоже прерываем выполнение метода и ничего не делаем

      if (head.querySelector(`.${this.captionActiveClass}`)) {
        // если уже есть активная кнопка
        head.querySelector(`.${this.captionActiveClass}`).classList.remove(this.captionActiveClass); // то удаляем ей активный класс
      }

      caption.classList.add(this.captionActiveClass); // затем добавляем активный класс кнопке, на которой был клик

      this.setActiveContent(head, body); // устанавливаем активный элемент контента в соответствии с активной кнопкой
    });
  }

  init() {
    // основной метод для вызова других описанных методов
    const tabs = document.querySelector(this.tabs); // ищем на странице элемент по переданному селектору основного элемента вкладок и записываем в константу
    const head = tabs.querySelector(this.head); // ищем в элементе tabs элемент с кнопками по переданному селектору и записываем в константу
    const body = tabs.querySelector(this.body); // ищем в элементе tabs элемент с контентом по переданному селектору и записываем в константу

    this.onLoad(head, body); // вызываем метод onLoad и передаем в параметрах константы, объявленные выше

    this.onClick(head, body); // вызываем метод onClick и передаем в параметрах константы, объявленные выше
  }
}

new Tabs({
  // создаем экземпляр JavaScript класса Tabs, и передаем значения CSS классов и селекторов элемента вкладок, которые нужно оживить - about__tabs
  tabsSelector: '.main__tabs', // основной элемент вкладок
  tabsHeadSelector: '.tabs__head', // элемент с кнопками
  tabsBodySelector: '.tabs__body', // элемент с контентом
  tabsCaptionSelector: '.tabs__caption', // элемент кнопки
  tabsCaptionActiveClass: 'tabs__caption_active', // активный класс кнопки
  tabsContentActiveClass: 'tabs__content_active', // активный класс элемента контента
}).init(); // вызываем основной метод init

function william(shipping, upkeep, requirement) {
  return Math.sqrt((2 * shipping * requirement) / upkeep);
}

function williamSelf(shipping, upkeep, requirement, production) {
  return Math.sqrt((2 * shipping * requirement) / (upkeep * (1 - requirement / production)));
}

function williamDeficit(shipping, upkeep, requirement, deficit) {
  return Math.sqrt((2 * shipping * requirement) / upkeep) * Math.sqrt((upkeep + deficit) / deficit);
}

document.querySelector('.main__btn').addEventListener('click', (e) => {
  const content = document.querySelector('.tabs__content.tabs__content_active');
  const tabName = content.getAttribute('data-tab');
  const IZ = parseFloat(content.querySelector('#IZ').value);
  const IX = parseFloat(content.querySelector('#IX').value);
  const Q = parseFloat(content.querySelector('#Q').value);

  if (tabName === 'formula') {
    const optimal = william(IZ, IX, Q).toFixed(2);
    const inYear = (Q / optimal).toFixed(2);
    const everyDay = (240.0 / inYear).toFixed(2);

    window.alert(`Оптимальный размера заказа: ${optimal} единиц 
      \r\nЕжегодное число заказов: ${inYear} раз(а)
      \r\nЗаказ должен размещаться каждые: ${everyDay} дней`);
  }

  if (tabName === 'postavka') {
    const P = parseFloat(content.querySelector('#P').value);
    const optimal = williamSelf(IZ, IX, Q, P).toFixed(2);

    if (P <= Q) {
      window.alert('Недостаточный уровень производства!');
      return;
    }

    const days = ((optimal * 240.0) / P).toFixed(2);
    const cicle = ((optimal / P) * 240.0).toFixed(2);

    window.alert(`Оптимальный размера заказа: ${optimal} единиц
  \r\nПериод пополнения запасов: ${days} дней
  \r\nОбщее время цикла: ${cicle} дней`);
  }

  if (tabName === 'deficit') {
    const D = parseFloat(content.querySelector('#D').value);
    const optimal = williamDeficit(IZ, IX, Q, D).toFixed(2);
    const inYear = (Q / optimal).toFixed(2);
    const everyDay = (240.0 / inYear).toFixed(2);

    window.alert(`Оптимальный размера заказа: ${optimal} единиц
    \r\nЕжегодное число заказов: ${inYear} раз(а)
    \r\nЗаказ должен размещаться каждые: ${everyDay} дней`);
  }
});