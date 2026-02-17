import { Controller, Get, Query, Render } from '@nestjs/common';

const MOCK_USER = {
  name: 'Анастасия',
  surname: 'Филевская',
  firstName: 'Анастасия',
  patronymic: 'Денисовна',
  phone: '+79818202314',
  birthday: '2005-02-19',
  email: 'fil_an_den@mail.ru',
};

const MENU_SECTIONS = [
  {
    title: 'Первые блюда',
    items: [
      {
        image: 'Russian_borscht.png',
        name: 'Русский борщ',
        description:
          'Традиционный красный русский борщ, украшенный сметаной и зеленью.',
        ingredients:
          'Свинина, говядина, морковь, капуста, лук, свёкла, картофель, томаты, сметана, зелень.',
        price: '400 руб',
      },
      {
        image: 'Mushroom_soup.png',
        name: 'Грибной крем-суп в хлебной тарелке',
        description:
          'Нежный крем-суп из шампиньонов в тарелке из свежеиспеченного овсяного хлеба.',
        ingredients:
          'Шампиньоны, картофель, лук, морковь, сливки, овсяный хлеб.',
        price: '375 руб',
        vegetarian: true,
      },
      {
        image: 'Pea_soup.png',
        name: 'Гороховый суп',
        description:
          'Ароматный гороховый суп, украшенный сухарями, сметаной и зеленью.',
        ingredients: 'Горох, лук, морковь, овсяный хлеб, сметана, зелень.',
        price: '350 руб',
        vegetarian: true,
      },
    ],
  },
  {
    title: 'Вторые блюда',
    items: [
      {
        image: 'Steak_with_asparagus.png',
        name: 'Стейк со спаржей',
        description:
          'Стейк рибай желаемой вами обжарки с ошпаренной на раскаленном масле спаржей.',
        ingredients: 'Говядина, спаржа.',
        price: '750 руб',
      },
      {
        image: 'Pasta_with_seafood.png',
        name: 'Паста с морепродуктами',
        description:
          'Изысканная паста со свежими морепродуктами в сливочном соусе.',
        ingredients: 'Спагетти, креветки, кальмар, мидии, сливки, зелень.',
        price: '600 руб',
      },
      {
        image: 'Ratatouille.png',
        name: 'Рататуй',
        description:
          'Классический рататуй из фермерских овощей в прованских травах.',
        ingredients: 'Томаты, кабачки, баклажаны, чеснок, смесь трав.',
        price: '400 руб',
        vegetarian: true,
      },
    ],
  },
  {
    title: 'Салаты',
    items: [
      {
        image: 'Mimosa.png',
        name: 'Салат Мимоза',
        description: 'Нежный овощной салат Мимоза с морепродуктами и зеленью.',
        ingredients:
          'Картофель, морковь, яйца, огурцы, креветки, мидии, кальмар, горбуша, зелень.',
        price: '550 руб',
      },
      {
        image: 'Cesar.png',
        name: 'Салат Цезарь',
        description:
          'Классический салат Цезарь с пармезаном и обжаренным куриным филе.',
        ingredients:
          'Салат айсберг, курица, томаты, огурцы, овсяный хлеб, пармезан.',
        price: '450 руб',
      },
      {
        image: 'Eggplant_salad.png',
        name: 'Салат с хрустящими баклажанами',
        description: 'Теплый салат с обжаренными баклажанами и сыром Фета.',
        ingredients: 'Баклажаны, томаты, сыр Фета, базилик, прованские травы.',
        price: '370 руб',
        vegetarian: true,
      },
    ],
  },
  {
    title: 'Десерты',
    items: [
      {
        image: 'Chocolate_ganache.png',
        name: 'Шоколадный ганаш',
        description:
          'Нежнейший ганаш из горького шоколада с шариком ванильного пломбира и брусничным джемом.',
        ingredients:
          'Горький шоколад, сливки, яйца, молоко, ваниль, брусника, сахар, какао, мята.',
        price: '430 руб',
      },
      {
        image: 'Chocolate_fondue.png',
        name: 'Шоколадный фондан',
        description:
          'Горячий фондан с топленым шоколадом внутри и шариком ванильного мороженого снаружи.',
        ingredients:
          'Горький шоколад, масло, сливки, яйца, молоко, сахар, ваниль, мята.',
        price: '380 руб',
      },
      {
        image: 'Meringue_cherry_roll.png',
        name: 'Меренговый вишнёвый рулет',
        description: 'Нежный меренговый рулет с вишнёвой начинкой.',
        ingredients: 'Вишня, масло, сливки, яйца, крахмал, сахар, ванилин.',
        price: '350 руб',
      },
    ],
  },
  {
    title: 'Безалкогольные напитки',
    items: [
      {
        image: 'Cappuccino.png',
        name: 'Капучино',
        description: '250 мл',
        ingredients: '',
        price: '170 руб',
      },
      {
        image: 'Lingonberry_juice.png',
        name: 'Морс из брусники',
        description: '350 мл',
        ingredients: '',
        price: '140 руб',
      },
      {
        image: 'Black_tea.png',
        name: 'Чёрный чай с лимоном',
        description: '300 мл',
        ingredients: '',
        price: '120 руб',
      },
    ],
  },
  {
    title: 'Алкогольные напитки',
    items: [
      {
        image: 'White_vine.png',
        name: 'Белое вино',
        description: 'Sante Rive Soave, Cielo, 2021 | 125 мл / 750 мл',
        ingredients: '',
        price: '370 руб / 2000 руб',
      },
      {
        image: 'Red_vine.png',
        name: 'Красное вино',
        description: 'Burfield Shiraz, Australia, 2023 | 125 мл / 750 мл',
        ingredients: '',
        price: '350 руб / 1850 руб',
      },
      {
        image: 'Mojito.png',
        name: 'Мохито',
        description: '(коктейль на водке) | 300 мл / 1000 мл',
        ingredients: '',
        price: '250 руб / 900 руб',
      },
    ],
  },
];

const HALLS = [
  {
    image: 'Garden_Of_Eden_Hole.png',
    name: 'Райский сад',
    nameEn: 'Blossom - Garden of Eden',
    address: 'СПБ, ул.Глинки, д.2',
    metro: ['Сенная площадь', 'Адмиралтейская'],
    phone: '+7(123)456-78-90',
  },
  {
    image: 'Rainforest_Hole.png',
    name: 'Тропический лес',
    nameEn: 'Blossom - Rainforest',
    address: 'СПБ, Каменноостровский просп., д.47',
    metro: ['Петроградская'],
    phone: '+7(123)456-78-91',
  },
  {
    image: 'Desert_Rose_Hole.png',
    name: 'Роза пустыни',
    nameEn: 'Blossom - Desert Rose',
    address: 'СПБ, наб. реки Смоленки, д.33',
    metro: ['Приморская'],
    phone: '+7(123)456-78-92',
  },
];

function resolveUser(auth?: string) {
  return auth === 'true' ? MOCK_USER : null;
}

@Controller()
export class AppController {
  @Get()
  @Render('major')
  getMainPage(@Query('auth') auth?: string) {
    return {
      user: resolveUser(auth),
      activePage: 'major',
      featuredDishes: [
        MENU_SECTIONS[1].items[2],
        MENU_SECTIONS[1].items[0],
        MENU_SECTIONS[0].items[1],
      ],
    };
  }

  @Get('catalog')
  @Render('catalog')
  getCatalogPage(@Query('auth') auth?: string) {
    return {
      user: resolveUser(auth),
      activePage: 'catalog',
      pageStyle: 'catalog',
      menuSections: MENU_SECTIONS,
    };
  }

  @Get('basket')
  @Render('basket')
  getBasketPage(@Query('auth') auth?: string) {
    return {
      user: resolveUser(auth),
      activePage: 'basket',
      pageStyle: 'basket',
      basketItems: [
        { name: 'Грибной крем-суп в хлебной тарелке', quantity: 1, total: 375 },
        { name: 'Салат Цезарь', quantity: 2, total: 900 },
        {
          name: 'Белое вино "Sante Rive Soave" (бутылка 750 мл)',
          quantity: 1,
          total: 2000,
        },
      ],
      basketCount: 4,
      basketTotal: 3275,
      deliveryCost: 200,
      orderTotal: 3475,
    };
  }

  @Get('booking')
  @Render('booking')
  getBookingPage(@Query('auth') auth?: string) {
    return {
      user: resolveUser(auth),
      activePage: 'booking',
      pageStyle: 'booking',
      halls: HALLS,
    };
  }

  @Get('authorization')
  @Render('authorization')
  getAuthorizationPage(@Query('auth') auth?: string) {
    return {
      user: resolveUser(auth),
      activePage: 'authorization',
      pageStyle: 'authorization',
    };
  }

  @Get('profile')
  @Render('profile')
  getProfilePage(@Query('auth') auth?: string) {
    return { user: resolveUser(auth), activePage: 'profile' };
  }

  @Get('reviews')
  @Render('reviews')
  getReviewsPage(@Query('auth') auth?: string) {
    return {
      user: resolveUser(auth),
      activePage: 'reviews',
      pageScripts: ['reviews.js', 'reviews-guests-api.js'],
    };
  }
}
