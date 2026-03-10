import { Controller, Get, Query } from '@nestjs/common';
import { Render } from '@nestjs/common';
import { DishService } from './dish/dish.service';
import { ReviewService } from './review/review.service';

const MOCK_USER = {
  name: 'Анастасия',
  surname: 'Филевская',
  firstName: 'Анастасия',
  patronymic: 'Денисовна',
  phone: '+79818202314',
  birthday: '2005-02-19',
  email: 'fil_an_den@mail.ru',
};

const HALLS = [
  {
    image: 'Garden_Of_Eden_Hole.png',
    nameEn: 'Blossom - Garden of Eden',
    address: 'СПБ, ул.Глинки, д.2',
    metro: ['Сенная площадь', 'Адмиралтейская'],
    phone: '+7(123)456-78-90',
  },
  {
    image: 'Rainforest_Hole.png',
    nameEn: 'Blossom - Rainforest',
    address: 'СПБ, Каменноостровский просп., д.47',
    metro: ['Петроградская'],
    phone: '+7(123)456-78-91',
  },
  {
    image: 'Desert_Rose_Hole.png',
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
  constructor(
    private readonly dishService: DishService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get()
  @Render('index')
  async getIndexPage(@Query('auth') auth?: string) {
    const allCategories = await this.dishService.findAllCategories();
    const featuredDishes = allCategories.flatMap((c) => c.dishes).slice(0, 3);
    return {
      user: resolveUser(auth),
      activePage: 'major',
      pageStyle: 'major',
      featuredDishes,
    };
  }

  @Get('catalog')
  @Render('catalog')
  async getCatalogPage(@Query('auth') auth?: string) {
    const categories = await this.dishService.findAllCategories();
    return {
      user: resolveUser(auth),
      activePage: 'catalog',
      pageStyle: 'catalog',
      categories,
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
    return {
      user: resolveUser(auth),
      activePage: 'profile',
      pageStyle: 'profile',
    };
  }

  @Get('reviews')
  @Render('reviews')
  async getReviewsPage(@Query('auth') auth?: string) {
    const reviews = await this.reviewService.findAll();
    return {
      user: resolveUser(auth),
      activePage: 'reviews',
      pageStyle: 'reviews',
      reviews,
    };
  }
}
