const items = [
  {
    id: 1,
    name: 'Coffee',
    price: 3.50,
    popularity: 85,                  // percentage or score
    description: 'Freshly brewed coffee served hot.',
    ingredients: ['Water', 'Coffee beans'],
    image: 'https://via.placeholder.com/150?text=Coffee',
    allergyRisks: [],
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 5
  },
  {
    id: 2,
    name: 'Tea',
    price: 2.50,
    popularity: 70,
    description: 'A soothing blend of tea leaves.',
    ingredients: ['Water', 'Tea leaves'],
    image: 'https://via.placeholder.com/150?text=Tea',
    allergyRisks: [],
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 0
  },
  {
    id: 3,
    name: 'Sandwich',
    price: 7.00,
    popularity: 60,
    description: 'Delicious sandwich with your choice of fillings.',
    ingredients: ['Bread', 'Lettuce', 'Tomato', 'Cheese', 'Meat'],
    image: 'https://via.placeholder.com/150?text=Sandwich',
    allergyRisks: ['gluten', 'dairy'],
    dietary: ['vegetarian'],
    calories: 450
  },
  {
    id: 4,
    name: 'Burger',
    price: 8.50,
    popularity: 90,
    description: 'Juicy beef burger served with fries.',
    ingredients: ['Bun', 'Beef patty', 'Lettuce', 'Tomato', 'Cheese'],
    image: 'https://via.placeholder.com/150?text=Burger',
    allergyRisks: ['gluten', 'dairy'],
    dietary: [],
    calories: 650
  },
];

export default items;
