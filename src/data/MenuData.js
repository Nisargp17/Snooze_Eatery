import img2 from "/src/assets/Menu-img-6.jpg";
import img3 from "/src/assets/Menu-img-7.jpg";
import img4 from "/src/assets/Menu-img-8.jpg";
import img5 from "/src/assets/Menu-img-9.jpg";

export const appetizers = [
  {
    name: "Bruschetta",
    description: "Grilled bread with tomatoes, garlic, and basil.",
    price: 600,
  },
  {
    name: "Stuffed Bell Peppers",
    description: "Mini peppers filled with spiced rice and herbs.",
    price: 640,
  },
  {
    name: "Veg Spring Rolls",
    description: "Crispy rolls stuffed with cabbage and carrots.",
    price: 520,
  },
  {
    name: "Paneer Tikka",
    description: "Marinated paneer grilled to perfection.",
    price: 720,
  },
  {
    name: "Caprese Skewers",
    description: "Tomatoes, mozzarella & basil with balsamic.",
    price: 560,
  },
  {
    name: "Stuffed Tandoori Mushrooms",
    description:
      "Juicy mushrooms stuffed with herbs and cheese, grilled in tandoor.",
    price: 260,
    tag: "New",
  },
];

export const mainCourse = [
  {
    name: "Vegetable Lasagna",
    description: "Layers of pasta with veggies and cheese.",
    price: 1040,
  },
  {
    name: "Palak Paneer",
    description: "Creamy spinach curry with paneer cubes.",
    price: 1000,
  },
  {
    name: "Vegetable Stir Fry",
    description: "Seasonal vegetables sautéed in soy sauce.",
    price: 880,
  },
  {
    name: "Chana Masala",
    description: "Chickpea curry served with rice or naan.",
    price: 920,
  },
  {
    name: "Thai Green Curry",
    description: "Coconut-based curry with veggies and tofu.",
    price: 1080,
  },
  {
    name: "Truffle Butter Khichdi",
    description:
      "A luxurious twist on the classic Indian comfort food with white truffle oil.",
    price: 320,
    tag: "Chef's Pick",
  },
  {
    name: "Zucchini Kofta Curry",
    description: "Soft zucchini dumplings served in rich Mughlai-style curry.",
    price: 290,
  },
  {
    name: "Paneer Steak with Herb Rice",
    description:
      "Grilled paneer slabs served with garlic herb rice and sautéed greens.",
    price: 340,
    tag: "Hot",
  },
];

export const desserts = [
  {
    name: "Lava Cake",
    description: "Molten chocolate cake with vanilla ice cream.",
    price: 520,
  },
  {
    name: "Gulab Jamun",
    description: "Milk balls soaked in cardamom syrup.",
    price: 400,
  },
  {
    name: "Tiramisu",
    description: "Coffee-flavored layered dessert.",
    price: 560,
  },
  {
    name: "Fruit Custard",
    description: "Mixed fruits in creamy custard.",
    price: 440,
  },
  {
    name: "Mango Mousse",
    description: "Light mango-flavored mousse.",
    price: 480,
  },
];

export const cocktails = [
  {
    name: "Virgin Mojito",
    description: "Mint, lime, sugar, soda – classic and cool.",
    price: 440,
  },
  {
    name: "Cucumber Cooler",
    description: "Refreshing cucumber with tonic and lime.",
    price: 400,
  },
  {
    name: "Strawberry Lemonade",
    description: "Strawberry puree with lemon and mint.",
    price: 440,
  },
  {
    name: "Minty Melon",
    description: "Watermelon juice with mint and lime.",
    price: 420,
  },
  {
    name: "Citrus Punch",
    description: "Blend of orange, lime, and soda.",
    price: 460,
  },
];

export const menuSections = [
  {
    title: "Appetizer",
    image: img2,
    items: appetizers,
    reverse: false,
  },
  {
    title: "Main Course",
    image: img3,
    items: mainCourse,
    reverse: true,
  },
  {
    title: "Dessert",
    image: img4,
    items: desserts,
    reverse: false,
  },
  {
    title: "Cocktail",
    image: img5,
    items: cocktails,
    reverse: true,
  },
];

export const vegMenu = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    description: "Cottage cheese cubes cooked in rich tomato gravy.",
    price: 220,
    image: "https://source.unsplash.com/400x300/?paneer",
  },
  {
    id: 2,
    name: "Veg Biryani",
    description: "Fragrant basmati rice with assorted vegetables and spices.",
    price: 180,
    image: "https://source.unsplash.com/400x300/?biryani",
  },
  {
    id: 3,
    name: "Aloo Gobi",
    description: "Spiced potatoes and cauliflower sautéed with onions.",
    price: 150,
    image: "https://source.unsplash.com/400x300/?aloo-gobi",
  },
  {
    id: 4,
    name: "Dal Tadka",
    description: "Yellow lentils tempered with ghee and spices.",
    price: 130,
    image: "https://source.unsplash.com/400x300/?dal",
  },
  {
    id: 5,
    name: "Chole Bhature",
    description: "Spicy chickpeas served with fried bread.",
    price: 170,
    image: "https://source.unsplash.com/400x300/?chole",
  },
  {
    id: 6,
    name: "Palak Paneer",
    description: "Spinach puree cooked with paneer and spices.",
    price: 200,
    image: "https://source.unsplash.com/400x300/?palak-paneer",
  },
  {
    id: 7,
    name: "Vegetable Pulao",
    description: "Steamed rice with sautéed vegetables and mild spices.",
    price: 160,
    image: "https://source.unsplash.com/400x300/?vegetable-pulao",
  },
  {
    id: 8,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced mashed potatoes.",
    price: 100,
    image: "https://source.unsplash.com/400x300/?dosa",
  },
  {
    id: 9,
    name: "Pav Bhaji",
    description: "Mashed vegetables cooked in butter served with toasted buns.",
    price: 120,
    image: "https://source.unsplash.com/400x300/?pav-bhaji",
  },
  {
    id: 10,
    name: "Rajma Chawal",
    description: "Kidney beans in a thick gravy served with steamed rice.",
    price: 150,
    image: "https://source.unsplash.com/400x300/?rajma",
  },
  {
    id: 11,
    name: "Matar Paneer",
    description: "Green peas and paneer cooked in onion-tomato gravy.",
    price: 190,
    image: "https://source.unsplash.com/400x300/?matar-paneer",
  },
  {
    id: 12,
    name: "Bhindi Masala",
    description: "Spiced okra sautéed with onions and tomatoes.",
    price: 140,
    image: "https://source.unsplash.com/400x300/?bhindi",
  },
];
