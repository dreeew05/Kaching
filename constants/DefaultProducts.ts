import { BaseNameImage } from './BusinessTypes';

export interface DefaultProduct extends BaseNameImage {
  productId: number;
  price: number;
  description: string;
}

interface DefaultProducts {
  [key: number]: {
    products: DefaultProduct[];
  };
}

export const getDefaultProducts = (): DefaultProducts => {
  return {
    0: {
      products: [
        {
          productId: 0,
          name: 'Coffee',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/coffee.jpg'),
          price: 100.99,
          description:
            'A hot beverage made from the roasted and ground seeds of a tropical shrub.',
        },
        {
          productId: 1,
          name: 'Tea',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/tea.jpg'),
          price: 50.99,
          description:
            'A hot beverage made by infusing dried crushed leaves in boiling water.',
        },
        {
          productId: 2,
          name: 'Hot Chocolate',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/hot_chocolate.jpg'),
          price: 75.99,
          description:
            'A hot beverage made from cocoa powder and milk.',
        },
        {
          productId: 3,
          name: 'Frapuccino',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/frapuccino.jpg'),
          price: 150.99,
          description:
            'A cold beverage made from coffee, milk, and ice.',
        },
        {
          productId: 4,
          name: 'Smoothie',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/smoothie.jpg'),
          price: 125.99,
          description:
            'A cold beverage made from blended fruits and milk.',
        },
      ],
    },
    1: {
      products: [
        {
          productId: 5,
          name: 'Pastry',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/pastry.jpg'),
          price: 200.25,
          description: 'A sweet baked dessert made from dough.',
        },
        {
          productId: 6,
          name: 'Sandwich',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/sandwich.jpg'),
          price: 50,
          description:
            'A snack made from two pieces of bread with a filling.',
        },
        {
          productId: 7,
          name: 'Salad',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/salad.jpg'),
          price: 75,
          description:
            'A dish made from mixed raw vegetables and a dressing.',
        },
        {
          productId: 8,
          name: 'Snacks',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/snacks.jpg'),
          price: 25,
          description: 'A small amount of food eaten between meals.',
        },
        {
          productId: 9,
          name: 'Cake',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/cakes.jpg'),
          price: 150,
          description:
            'A sweet baked dessert made from flour, sugar, and eggs.',
        },
      ],
    },
    2: {
      products: [
        {
          productId: 10,
          name: 'Coffee Mug',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/coffee_mug.jpg'),
          price: 250,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 11,
          name: 'Tumbler',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/tumbler.jpg'),
          price: 300,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 12,
          name: 'Coffee Beans',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/coffee_bean.jpg'),
          price: 500,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
        {
          productId: 13,
          name: 'Gift Basket',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/gift_basket.jpg'),
          price: 1000,
          description: 'A basket filled with coffee-related items.',
        },
      ],
    },
    3: {
      products: [
        {
          productId: 14,
          name: 'Adobong Manok',
          image: require('../assets/images/onboarding/stock_categories/carinderia/viand/adobong_manok.jpg'),
          price: 250,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 15,
          name: 'Laswa',
          image: require('../assets/images/onboarding/stock_categories/carinderia/viand/laswa.jpg'),
          price: 300,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 16,
          name: 'Bicol Express',
          image: require('../assets/images/onboarding/stock_categories/carinderia/viand/bicol_express.jpg'),
          price: 500,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
        {
          productId: 17,
          name: 'Escabeche',
          image: require('../assets/images/onboarding/stock_categories/carinderia/viand/escabeche.jpg'),
          price: 1000,
          description: 'A basket filled with coffee-related items.',
        },
      ],
    },
    4: {
      products: [
        {
          productId: 18,
          name: 'Diwata Pares Overload',
          image: require('../assets/images/onboarding/stock_categories/carinderia/special/diwata_pares.jpg'),
          price: 150,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 19,
          name: 'Bulalo',
          image: require('../assets/images/onboarding/stock_categories/carinderia/special/bulalo.jpg'),
          price: 150,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 20,
          name: 'Pinaupong Manok',
          image: require('../assets/images/onboarding/stock_categories/carinderia/special/pinaupong_manok.jpg'),
          price: 200,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
        {
          productId: 21,
          name: 'Ramen',
          image: require('../assets/images/onboarding/stock_categories/carinderia/special/ramen.jpg'),
          price: 250,
          description: 'A basket filled with coffee-related items.',
        },
      ],
    },
    5: {
      products: [
        {
          productId: 22,
          name: 'Pares',
          image: require('../assets/images/onboarding/stock_categories/carinderia/soup/pares.jpg'),
          price: 150,
          description: 'A cup used for drinking coffee.',
        },
      ],
    },
    6: {
      products: [
        {
          productId: 23,
          name: 'Sasas',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/snacks/sasas.png'),
          price: 2,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 24,
          name: 'Oishi Prawn Crackers',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/snacks/oishi_prawn_crackers.jpg'),
          price: 10,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 25,
          name: 'Oishi Crispy Patata',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/snacks/oishi_crispy_patata.jpg'),
          price: 10,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
      ],
    },
    7: {
      products: [
        {
          productId: 26,
          name: 'Tide',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/non_food/tide.jpg'),
          price: 15,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 27,
          name: 'Ariel',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/non_food/ariel.jpg'),
          price: 15,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 28,
          name: 'Pride',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/non_food/pride.jpg'),
          price: 15,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
      ],
    },
    8: {
      products: [
        {
          productId: 29,
          name: 'Panda Classique Ballpen 0.7mm',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/pens/panda.jpg'),
          price: 15,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 30,
          name: 'Pilot Rollerball Pen G-TEC-C4 0.4mm Black',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/pens/gtec.jpg'),
          price: 15,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 31,
          name: 'FABER CASTELL BALLPOINT PEN RX5 RETRACTABLE BLACK',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/pens/faber.jpg'),
          price: 15,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
      ],
    },
    9: {
      products: [
        {
          productId: 29,
          name: 'Bond Paper',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/papers/bond_paper.jpg'),
          price: 15,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 30,
          name: 'Craft Paper',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/papers/craft_paper.jpg'),
          price: 15,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 31,
          name: 'Manila Paper',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/papers/manila_paper.jpg'),
          price: 15,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
      ],
    },
    10: {
      products: [
        {
          productId: 32,
          name: 'Maya',
          image: require('../assets/images/onboarding/stock_categories/e_loading/e_wallet/maya.png'),
          price: 15,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 33,
          name: 'Gcash',
          image: require('../assets/images/onboarding/stock_categories/e_loading/e_wallet/gcash.webp'),
          price: 15,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
      ],
    },
    11: {
      products: [
        {
          productId: 34,
          name: 'Globe Go 50',
          image: require('../assets/images/onboarding/stock_categories/e_loading/prepaid/go_50.jpg'),
          price: 50,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 35,
          name: 'Giga Video+ 149',
          image: require('../assets/images/onboarding/stock_categories/e_loading/prepaid/giga_video_149.jpg'),
          price: 149,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
      ],
    },
    12: {
      products: [
        {
          productId: 36,
          name: 'Size A4',
          image: require('../assets/images/onboarding/stock_categories/printing/a4.jpg'),
          price: 5,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 37,
          name: 'Size A3',
          image: require('../assets/images/onboarding/stock_categories/printing/a3.jpg'),
          price: 7,
          description: 'A cup used for drinking coffee.',
        },
      ],
    },
    13: {
      products: [
        {
          productId: 38,
          name: 'Cheese Ensaymada',
          image: require('../assets/images/onboarding/stock_categories/bread_pastry/bread/cheese_ensaymada.png'),
          price: 15,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 39,
          name: 'Monay',
          image: require('../assets/images/onboarding/stock_categories/bread_pastry/bread/monay.jpg'),
          price: 10,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 40,
          name: 'Pandesal',
          image: require('../assets/images/onboarding/stock_categories/bread_pastry/bread/pandesal.jpg'),
          price: 5,
          description: 'A cup used for drinking coffee.',
        },
      ],
    },
    14: {
      products: [
        {
          productId: 41,
          name: 'Bibingka',
          image: require('../assets/images/onboarding/stock_categories/bread_pastry/pastry/bibingka.jpg'),
          price: 20,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 42,
          name: 'Puto Bumbong',
          image: require('../assets/images/onboarding/stock_categories/bread_pastry/pastry/puto_bumbong.jpg'),
          price: 10,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 43,
          name: 'Ube Hopia',
          image: require('../assets/images/onboarding/stock_categories/bread_pastry/pastry/ube_hopia.jpg'),
          price: 5,
          description: 'A cup used for drinking coffee.',
        },
      ],
    },
  };
};
