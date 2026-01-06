import Camera1 from "../../assets/images/camera1.png"; 
import Camera2 from "../../assets/images/camera2.png";
import Drone1 from "../../assets/images/drone1.png"; 
import Drone2 from "../../assets/images/drone2.png";
import Film1 from "../../assets/images/film1.png"; 
import Phone1 from "../../assets/images/phone1.png";
import Phone2 from "../../assets/images/phone2.png"; 
import Laptop1 from "../../assets/images/laptop1.png";
import Headphones1 from "../../assets/images/headphones1.png"; 
import Jacket1 from "../../assets/images/jacket1.png";
import Dress1 from "../../assets/images/dress1.png"; 
import Shoes1 from "../../assets/images/shoes1.png";
import Bag1 from "../../assets/images/bag1.png"; 
import Clock1 from "../../assets/images/clock1.png";
import Painting1 from "../../assets/images/painting1.png"; 
import Coins1 from "../../assets/images/coin1.png";
import Bundle1 from "../../assets/images/bundle1.png"; 
import Battery1 from "../../assets/images/battery1.png";
import Seats1 from "../../assets/images/seats1.png"; 
import Table1 from "../../assets/images/table1.png";
import Vase1 from "../../assets/images/vase1.png"; 
import Cookware1 from "../../assets/images/cookware1.png";
import Mixer1 from "../../assets/images/mixer1.png"; 
import Dumbbells1 from "../../assets/images/dumbbells1.png";
import Tent1 from "../../assets/images/tent1.png"; 
import Guitar1 from "../../assets/images/guitar1.png";
import Piano1 from "../../assets/images/piano1.png"; 
import Books1 from "../../assets/images/book1.png";
import Books2 from "../../assets/images/book2.png"; 
import DVDs1 from "../../assets/images/dvds1.png";
import Watch1 from "../../assets/images/watch1.png"; 
import Coat1 from "../../assets/images/coat1.png";
import Tools1 from "../../assets/images/tools.png"; 
import Dinnerware1 from "../../assets/images/dinnerware1.png";
import Ball1 from "../../assets/images/balls.png"; 
import Mic1 from "../../assets/images/mics1.png";
import Audio1 from "../../assets/images/audio1.png"; 
import ClothingBulk1 from "../../assets/images/clothing-bulks1.png";  

const products = [
  // Electronics - Cameras
  {
    id: 'p1',
    name: 'Canon EOS 90D',
    slug: 'canon-eos-90d',
    categorySlug: 'electronics',
    subcategoryId: 'sub_camera',
    price: 750,
    basePrice: 900,
    stock: 3,
    condition: 'Excellent',
    rating: 4.5,
    reviews: 128,
    image: Camera1,
  },
  {
    id: 'p2',
    name: 'Sony Alpha A7 III',
    slug: 'sony-alpha-a7-iii',
    categorySlug: 'electronics',
    subcategoryId: 'sub_camera',
    price: 1800,
    basePrice: 2000,
    stock: 5,
    condition: 'Like New',
    rating: 4.7,
    reviews: 256,
    image: Camera2,
  },
  
  // Electronics - Drones
  {
    id: 'p3',
    name: 'DJI Mini 3',
    slug: 'dji-mini-3',
    categorySlug: 'electronics',
    subcategoryId: 'sub_drone',
    price: 620,
    basePrice: 800,
    stock: 5,
    condition: 'Good',
    rating: 4.3,
    reviews: 89,
    image: Drone1,
  },
  {
    id: 'p4',
    name: 'DJI Air 2S',
    slug: 'dji-air-2s',
    categorySlug: 'electronics',
    subcategoryId: 'sub_drone',
    price: 950,
    basePrice: 1200,
    stock: 2,
    condition: 'Excellent',
    rating: 4.8,
    reviews: 156,
    image: Drone2,
  },
  
  // Electronics - Film Photography
  {
    id: 'p5',
    name: 'Film Photography Camera',
    slug: 'film-photography-camera',
    categorySlug: 'electronics',
    subcategoryId: 'sub_film',
    price: 250,
    basePrice: 350,
    stock: 5,
    condition: 'Vintage',
    rating: 4.2,
    reviews: 45,
    image: Film1,
  },
  
  // Electronics - Smartphones
  {
    id: 'p6',
    name: 'iPhone 14 Pro',
    slug: 'iphone-14-pro',
    categorySlug: 'electronics',
    subcategoryId: 'sub_smartphone',
    price: 999,
    basePrice: 1200,
    stock: 8,
    condition: 'New',
    rating: 4.6,
    reviews: 342,
    image: Phone1,
  },
  {
    id: 'p7',
    name: 'Samsung Galaxy S23',
    slug: 'samsung-galaxy-s23',
    categorySlug: 'electronics',
    subcategoryId: 'sub_smartphone',
    price: 850,
    basePrice: 1000,
    stock: 6,
    condition: 'Excellent',
    rating: 4.5,
    reviews: 289,
    image: Phone2,
  },
  
  // Electronics - Laptops
  {
    id: 'p8',
    name: 'MacBook Pro M2',
    slug: 'macbook-pro-m2',
    categorySlug: 'electronics',
    subcategoryId: 'sub_laptop',
    price: 1500,
    basePrice: 1800,
    stock: 4,
    condition: 'Like New',
    rating: 4.9,
    reviews: 178,
    image: Laptop1,
  },
  
  // Electronics - Audio Equipment
  {
    id: 'p9',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    categorySlug: 'electronics',
    subcategoryId: 'sub_audio',
    price: 320,
    basePrice: 400,
    stock: 10,
    condition: 'New',
    rating: 4.8,
    reviews: 421,
    image: Headphones1,
  },
  
  // Fashion - Men's Clothing
  {
    id: 'p10',
    name: 'Leather Jacket',
    slug: 'leather-jacket',
    categorySlug: 'fashion',
    subcategoryId: 'sub_men_clothing',
    price: 120,
    basePrice: 180,
    stock: 15,
    condition: 'Good',
    rating: 4.3,
    reviews: 67,
    image: Jacket1,
  },
  
  // Fashion - Women's Clothing
  {
    id: 'p11',
    name: 'Summer Dress',
    slug: 'summer-dress',
    categorySlug: 'fashion',
    subcategoryId: 'sub_women_clothing',
    price: 45,
    basePrice: 70,
    stock: 25,
    condition: 'New',
    rating: 4.4,
    reviews: 93,
    image: Dress1,
  },
  
  // Fashion - Footwear
  {
    id: 'p12',
    name: 'Running Shoes',
    slug: 'running-shoes',
    categorySlug: 'fashion',
    subcategoryId: 'sub_shoes',
    price: 65,
    basePrice: 100,
    stock: 20,
    condition: 'Good',
    rating: 4.2,
    reviews: 124,
    image: Shoes1,
  },
  
  // Fashion - Accessories
  {
    id: 'p13',
    name: 'Leather Handbag',
    slug: 'leather-handbag',
    categorySlug: 'fashion',
    subcategoryId: 'sub_accessories_fashion',
    price: 85,
    basePrice: 130,
    stock: 8,
    condition: 'Excellent',
    rating: 4.5,
    reviews: 56,
    image: Bag1,
  },
  
  // Collectibles - Antiques
  {
    id: 'p14',
    name: 'Vintage Clock',
    slug: 'vintage-clock',
    categorySlug: 'collectibles',
    subcategoryId: 'sub_antiques',
    price: 450,
    basePrice: 600,
    stock: 1,
    condition: 'Antique',
    rating: 4.7,
    reviews: 23,
    image: Clock1,
  },
  
  // Collectibles - Art Pieces
  {
    id: 'p15',
    name: 'Modern Painting',
    slug: 'modern-painting',
    categorySlug: 'collectibles',
    subcategoryId: 'sub_art',
    price: 1200,
    basePrice: 1500,
    stock: 1,
    condition: 'Excellent',
    rating: 4.9,
    reviews: 15,
    image: Painting1,
  },
  
  // Collectibles - Coins & Stamps
  {
    id: 'p16',
    name: 'Silver Coin Collection',
    slug: 'silver-coin-collection',
    categorySlug: 'collectibles',
    subcategoryId: 'sub_coins',
    price: 800,
    basePrice: 1000,
    stock: 2,
    condition: 'Collectible',
    rating: 4.6,
    reviews: 31,
    image: Coins1,
  },
  
  // Wholesale - Clearance Stock
  {
    id: 'p17',
    name: 'Mixed Electronics Bundle',
    slug: 'mixed-electronics-bundle',
    categorySlug: 'wholesale',
    subcategoryId: 'sub_clearance',
    price: 2500,
    basePrice: 3500,
    stock: 3,
    condition: 'Mixed',
    rating: 4.0,
    reviews: 12,
    image: Bundle1,
  },
  
  // Automotive - Car Parts
  {
    id: 'p18',
    name: 'Car Battery',
    slug: 'car-battery',
    categorySlug: 'automotive',
    subcategoryId: 'sub_car_parts',
    price: 120,
    basePrice: 160,
    stock: 18,
    condition: 'New',
    rating: 4.3,
    reviews: 89,
    image: Battery1,
  },
  
  // Automotive - Car Accessories
  {
    id: 'p19',
    name: 'Car Seat Covers',
    slug: 'car-seat-covers',
    categorySlug: 'automotive',
    subcategoryId: 'sub_car_accessories',
    price: 75,
    basePrice: 120,
    stock: 12,
    condition: 'New',
    rating: 4.2,
    reviews: 47,
    image: Seats1,
  },
  
  // Home & Garden - Furniture
  {
    id: 'p20',
    name: 'Wooden Dining Table',
    slug: 'wooden-dining-table',
    categorySlug: 'home-garden',
    subcategoryId: 'sub_furniture',
    price: 350,
    basePrice: 500,
    stock: 4,
    condition: 'Excellent',
    rating: 4.7,
    reviews: 64,
    image: Table1,
  },
  
  // Home & Garden - Home Decor
  {
    id: 'p21',
    name: 'Decorative Vase',
    slug: 'decorative-vase',
    categorySlug: 'home-garden',
    subcategoryId: 'sub_decor',
    price: 45,
    basePrice: 70,
    stock: 15,
    condition: 'New',
    rating: 4.4,
    reviews: 38,
    image: Vase1,
  },
  
  // Kitchen - Cookware
  {
    id: 'p22',
    name: 'Non-stick Cookware Set',
    slug: 'non-stick-cookware-set',
    categorySlug: 'kitchen',
    subcategoryId: 'sub_cookware',
    price: 180,
    basePrice: 250,
    stock: 7,
    condition: 'New',
    rating: 4.5,
    reviews: 92,
    image: Cookware1,
  },
  
  // Kitchen - Appliances
  {
    id: 'p23',
    name: 'Stand Mixer',
    slug: 'stand-mixer',
    categorySlug: 'kitchen',
    subcategoryId: 'sub_appliances',
    price: 220,
    basePrice: 300,
    stock: 5,
    condition: 'Like New',
    rating: 4.8,
    reviews: 156,
    image: Mixer1,
  },
  
  // Sports - Fitness Equipment
  {
    id: 'p24',
    name: 'Adjustable Dumbbells',
    slug: 'adjustable-dumbbells',
    categorySlug: 'sports',
    subcategoryId: 'sub_fitness',
    price: 180,
    basePrice: 250,
    stock: 9,
    condition: 'Good',
    rating: 4.4,
    reviews: 73,
    image: Dumbbells1,
  },
  
  // Sports - Outdoor Sports
  {
    id: 'p25',
    name: 'Camping Tent',
    slug: 'camping-tent',
    categorySlug: 'sports',
    subcategoryId: 'sub_outdoor',
    price: 150,
    basePrice: 220,
    stock: 6,
    condition: 'Excellent',
    rating: 4.6,
    reviews: 88,
    image: Tent1,
  },
  
  // Music - Guitars
  {
    id: 'p26',
    name: 'Acoustic Guitar',
    slug: 'acoustic-guitar',
    categorySlug: 'music',
    subcategoryId: 'sub_guitars',
    price: 300,
    basePrice: 450,
    stock: 3,
    condition: 'Excellent',
    rating: 4.7,
    reviews: 124,
    image: Guitar1,
  },
  
  // Music - Keyboards
  {
    id: 'p27',
    name: 'Digital Piano',
    slug: 'digital-piano',
    categorySlug: 'music',
    subcategoryId: 'sub_keyboards',
    price: 600,
    basePrice: 800,
    stock: 2,
    condition: 'Like New',
    rating: 4.9,
    reviews: 67,
    image: Piano1,
  },
  
  // Books - Fiction
  {
    id: 'p28',
    name: 'Novel Collection Set',
    slug: 'novel-collection-set',
    categorySlug: 'books',
    subcategoryId: 'sub_fiction',
    price: 35,
    basePrice: 50,
    stock: 25,
    condition: 'New',
    rating: 4.5,
    reviews: 189,
    image: Books1,
  },
  
  // Books - Non-Fiction
  {
    id: 'p29',
    name: 'History Encyclopedia',
    slug: 'history-encyclopedia',
    categorySlug: 'books',
    subcategoryId: 'sub_nonfiction',
    price: 85,
    basePrice: 120,
    stock: 8,
    condition: 'Good',
    rating: 4.6,
    reviews: 42,
    image: Books2,
  },
  
  // Books - Media
  {
    id: 'p30',
    name: 'Classic Movie Collection',
    slug: 'classic-movie-collection',
    categorySlug: 'books',
    subcategoryId: 'sub_media',
    price: 60,
    basePrice: 90,
    stock: 12,
    condition: 'New',
    rating: 4.7,
    reviews: 78,
    image: DVDs1,
  },
  
  // Additional products for variety
  
  // Electronics - More Products
  {
    id: 'p31',
    name: 'Smart Watch Series 8',
    slug: 'smart-watch-series-8',
    categorySlug: 'electronics',
    subcategoryId: 'sub_smartphone',
    price: 320,
    basePrice: 400,
    stock: 15,
    condition: 'New',
    rating: 4.6,
    reviews: 234,
    image: Watch1,
  },
  
  // Fashion - More Products
  {
    id: 'p32',
    name: 'Winter Coat',
    slug: 'winter-coat',
    categorySlug: 'fashion',
    subcategoryId: 'sub_men_clothing',
    price: 95,
    basePrice: 150,
    stock: 18,
    condition: 'Good',
    rating: 4.3,
    reviews: 56,
    image: Coat1,
  },
  
  // Home & Garden - More Products
  {
    id: 'p33',
    name: 'Garden Tool Set',
    slug: 'garden-tool-set',
    categorySlug: 'home-garden',
    subcategoryId: 'sub_garden',
    price: 65,
    basePrice: 100,
    stock: 10,
    condition: 'New',
    rating: 4.4,
    reviews: 39,
    image: Tools1,
  },
  
  // Kitchen - More Products
  {
    id: 'p34',
    name: 'Ceramic Dinner Set',
    slug: 'ceramic-dinner-set',
    categorySlug: 'kitchen',
    subcategoryId: 'sub_dining',
    price: 120,
    basePrice: 180,
    stock: 6,
    condition: 'New',
    rating: 4.5,
    reviews: 67,
    image: Dinnerware1,
  },
  
  // Sports - More Products
  {
    id: 'p35',
    name: 'Basketball',
    slug: 'basketball',
    categorySlug: 'sports',
    subcategoryId: 'sub_team_sports',
    price: 35,
    basePrice: 50,
    stock: 20,
    condition: 'New',
    rating: 4.3,
    reviews: 45,
    image: Ball1,
  },
  
  // Music - More Products
  {
    id: 'p36',
    name: 'Studio Microphone',
    slug: 'studio-microphone',
    categorySlug: 'music',
    subcategoryId: 'sub_audio_gear',
    price: 180,
    basePrice: 250,
    stock: 7,
    condition: 'Excellent',
    rating: 4.7,
    reviews: 89,
    image: Mic1,
  },
  
  // Automotive - More Products
  {
    id: 'p37',
    name: 'Car Audio System',
    slug: 'car-audio-system',
    categorySlug: 'automotive',
    subcategoryId: 'sub_car_accessories',
    price: 350,
    basePrice: 500,
    stock: 4,
    condition: 'New',
    rating: 4.6,
    reviews: 124,
    image: Audio1,
  },
  
  // Wholesale - More Products
  {
    id: 'p38',
    name: 'Clothing Bulk Pack',
    slug: 'clothing-bulk-pack',
    categorySlug: 'wholesale',
    subcategoryId: 'sub_clearance',
    price: 1200,
    basePrice: 2000,
    stock: 2,
    condition: 'Mixed',
    rating: 4.1,
    reviews: 8,
    image: ClothingBulk1,
  },
];

export default products;
