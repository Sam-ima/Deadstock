const products = Array.from({ length: 100 }).map((_, i) => {
  const categories = [
    'electronics',
    'furniture',
    'fashion',
    'home-garden',
    'collectibles',
    'books',
  ];

  const category = categories[i % categories.length];

  return {
    id: i + 1,
    name: `${category} item ${i + 1}`,
    price: (Math.random() * 500 + 20).toFixed(2),
    category,
    image: `https://picsum.photos/seed/${i}/300/300`,
  };
});

export default products;
