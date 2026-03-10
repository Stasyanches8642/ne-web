import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const soups = await prisma.category.create({
    data: { name: 'Первые блюда' },
  });
  const mains = await prisma.category.create({
    data: { name: 'Вторые блюда' },
  });
  const salads = await prisma.category.create({ data: { name: 'Салаты' } });
  const desserts = await prisma.category.create({ data: { name: 'Десерты' } });
  const softDrinks = await prisma.category.create({
    data: { name: 'Безалкогольные напитки' },
  });
  const alcohol = await prisma.category.create({
    data: { name: 'Алкогольные напитки' },
  });

  await prisma.dish.createMany({
    data: [
      {
        name: 'Русский борщ',
        description:
          'Традиционный красный русский борщ, украшенный сметаной и зеленью.',
        ingredients:
          'Свинина, говядина, морковь, капуста, лук репчатый, свёкла, картофель, томаты, сметана, зелень.',
        isVegetarian: false,
        price: 400,
        imageUrl: '/htdocs/img/meals/Russian_borscht.png',
        categoryId: soups.id,
      },
      {
        name: 'Грибной крем-суп в хлебной тарелке',
        description:
          'Нежный крем-суп из шампиньонов в тарелке из свежеиспеченного овсяного хлеба.',
        ingredients:
          'Шампиньоны, картофель, лук, морковь, сливки, овсяный хлеб.',
        isVegetarian: true,
        price: 375,
        imageUrl: '/htdocs/img/meals/Mushroom_soup.png',
        categoryId: soups.id,
      },
      {
        name: 'Гороховый суп',
        description:
          'Ароматный гороховый суп, украшенный сухарями, сметаной и зеленью.',
        ingredients: 'Горох, лук, морковь, овсяный хлеб, сметана, зелень.',
        isVegetarian: true,
        price: 350,
        imageUrl: '/htdocs/img/meals/Pea_soup.png',
        categoryId: soups.id,
      },
      {
        name: 'Стейк со спаржей',
        description:
          'Стейк рибай желаемой вами обжарки с ошпаренной на раскаленном масле спаржей.',
        ingredients: 'Говядина, спаржа.',
        isVegetarian: false,
        price: 750,
        imageUrl: '/htdocs/img/meals/Steak_with_asparagus.png',
        categoryId: mains.id,
      },
      {
        name: 'Паста с морепродуктами',
        description:
          'Изысканная паста со свежими морепродуктами в сливочном соусе, украшенная зеленью.',
        ingredients: 'Спагетти, креветки, кальмар, мидии, сливки, зелень.',
        isVegetarian: false,
        price: 600,
        imageUrl: '/htdocs/img/meals/Pasta_with_seafood.png',
        categoryId: mains.id,
      },
      {
        name: 'Рататуй',
        description:
          'Классический рататуй из фермерских овощей в прованских травах.',
        ingredients: 'Томаты, кабачки, баклажаны, чеснок, смесь трав.',
        isVegetarian: true,
        price: 400,
        imageUrl: '/htdocs/img/meals/Ratatouille.png',
        categoryId: mains.id,
      },
      {
        name: 'Салат Мимоза',
        description: 'Нежный овощной салат Мимоза с морепродуктами и зеленью.',
        ingredients:
          'Картофель, морковь, куриные яйца, огурцы, креветки, мидии, кальмар, горбуша, зелень.',
        isVegetarian: false,
        price: 550,
        imageUrl: '/htdocs/img/meals/Mimosa.png',
        categoryId: salads.id,
      },
      {
        name: 'Салат Цезарь',
        description:
          'Классический салат Цезарь с пармезаном и обжаренным куриным филе.',
        ingredients:
          'Салат айсберг, курица, томаты, огурцы, овсяный хлеб, пармезан.',
        isVegetarian: false,
        price: 450,
        imageUrl: '/htdocs/img/meals/Cesar.png',
        categoryId: salads.id,
      },
      {
        name: 'Салат с хрустящими баклажанами',
        description: 'Теплый салат с обжаренными баклажанами и сыром Фета.',
        ingredients: 'Баклажаны, томаты, сыр Фета, базилик, прованские травы.',
        isVegetarian: true,
        price: 370,
        imageUrl: '/htdocs/img/meals/Eggplant_salad.png',
        categoryId: salads.id,
      },
      {
        name: 'Шоколадный ганаш',
        description:
          'Нежнейший ганаш из горького шоколада с шариком ванильного пломбира и брусничным джемом, украшенный листиком мяты.',
        ingredients:
          'Горький шоколад, сливки, яйца, молоко, ваниль, брусника, сахар, какао, мята.',
        isVegetarian: true,
        price: 430,
        imageUrl: '/htdocs/img/meals/Chocolate_ganache.png',
        categoryId: desserts.id,
      },
      {
        name: 'Шоколадный фондан',
        description:
          'Горячий фондан с топленым шоколадом внутри и шариком ванильного мороженого снаружи, украшенный листиком мяты.',
        ingredients:
          'Горький шоколад, сливочное масло, сливки, яйца, молоко, сахар, ваниль, мята.',
        isVegetarian: true,
        price: 380,
        imageUrl: '/htdocs/img/meals/Chocolate_fondue.png',
        categoryId: desserts.id,
      },
      {
        name: 'Меренговый вишнёвый рулет',
        description:
          'Рулет из меренги — хрустящий снаружи и мягкий внутри. Начинка из ванильного крема и свежих вишнёвых ягод.',
        ingredients:
          'Вишня, сливочное масло, сливки, яйца, крахмал, сахар, ванилин.',
        isVegetarian: true,
        price: 350,
        imageUrl: '/htdocs/img/meals/Meringue_cherry_roll.png',
        categoryId: desserts.id,
      },
      {
        name: 'Капучино',
        description: '250 мл',
        isVegetarian: true,
        price: 170,
        imageUrl: '/htdocs/img/meals/Cappuccino.png',
        categoryId: softDrinks.id,
      },
      {
        name: 'Морс из брусники',
        description: '350 мл',
        isVegetarian: true,
        price: 140,
        imageUrl: '/htdocs/img/meals/Lingonberry_juice.png',
        categoryId: softDrinks.id,
      },
      {
        name: 'Чёрный чай с лимоном',
        description: '300 мл',
        isVegetarian: true,
        price: 120,
        imageUrl: '/htdocs/img/meals/Black_tea.png',
        categoryId: softDrinks.id,
      },
      {
        name: 'Белое вино',
        description: 'Sante Rive Soave, Cielo, 2021',
        ingredients: '125 мл | 750 мл',
        isVegetarian: true,
        price: 370,
        imageUrl: '/htdocs/img/meals/White_vine.png',
        categoryId: alcohol.id,
      },
      {
        name: 'Красное вино',
        description: 'Burfield Shiraz, Australia, 2023',
        ingredients: '125 мл | 750 мл',
        isVegetarian: true,
        price: 350,
        imageUrl: '/htdocs/img/meals/Red_vine.png',
        categoryId: alcohol.id,
      },
      {
        name: 'Мохито',
        description: 'Коктейль на водке',
        ingredients: '300 мл | 1000 мл',
        isVegetarian: true,
        price: 250,
        imageUrl: '/htdocs/img/meals/Mojito.png',
        categoryId: alcohol.id,
      },
    ],
  });

  console.log('База данных заполнена!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
