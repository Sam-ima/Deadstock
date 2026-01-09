// src/data/products.js
import Camera1 from "../../assets/images/camera1.png"; 
import Camera2 from "../../assets/images/camera2.png";
import Camera3 from "../../assets/images/camera1.png";
import Drone1 from "../../assets/images/drone1.png"; 
import Drone2 from "../../assets/images/drone2.png";
import Drone3 from "../../assets/images/drone1.png";
import Film1 from "../../assets/images/film1.png"; 
import Phone1 from "../../assets/images/phone1.png";
import Phone2 from "../../assets/images/phone2.png"; 
import Phone3 from "../../assets/images/phone1.png";
import Laptop1 from "../../assets/images/laptop1.png";
import Laptop2 from "../../assets/images/camera2.png";
import Headphones1 from "../../assets/images/headphones1.png"; 
import Headphones2 from "../../assets/images/headphones1.png";
import Jacket1 from "../../assets/images/jacket1.png";
import Jacket2 from "../../assets/images/coat1.png";
import Dress1 from "../../assets/images/dress1.png"; 
import Dress2 from "../../assets/images/dress1.png";
import Shoes1 from "../../assets/images/shoes1.png";
import Shoes2 from "../../assets/images/shoes1.png";
import Bag1 from "../../assets/images/bag1.png"; 
import Bag2 from "../../assets/images/bag1.png";
import Clock1 from "../../assets/images/clock1.png";
import Clock2 from "../../assets/images/clock1.png";
import Painting1 from "../../assets/images/painting1.png"; 
import Painting2 from "../../assets/images/painting1.png";
import Coins1 from "../../assets/images/coin1.png";
import Coins2 from "../../assets/images/coin1.png";
import Bundle1 from "../../assets/images/bundle1.png"; 
import Bundle2 from "../../assets/images/bundle1.png";
import Battery1 from "../../assets/images/battery1.png";
import Battery2 from "../../assets/images/battery1.png";
import Seats1 from "../../assets/images/seats1.png"; 
import Seats2 from "../../assets/images/seats1.png";
import Table1 from "../../assets/images/table1.png";
import Table2 from "../../assets/images/table1.png";
import Vase1 from "../../assets/images/vase1.png"; 
import Vase2 from "../../assets/images/vase1.png";
import Cookware1 from "../../assets/images/cookware1.png";
import Cookware2 from "../../assets/images/cookware1.png";
import Mixer1 from "../../assets/images/mixer1.png"; 
import Mixer2 from "../../assets/images/mixer1.png";
import Dumbbells1 from "../../assets/images/dumbbells1.png";
import Dumbbells2 from "../../assets/images/dumbbells1.png";
import Tent1 from "../../assets/images/tent1.png"; 
import Tent2 from "../../assets/images/tent1.png";
import Guitar1 from "../../assets/images/guitar1.png";
import Guitar2 from "../../assets/images/guitar1.png";
import Piano1 from "../../assets/images/piano1.png"; 
import Piano2 from "../../assets/images/piano1.png";
import Books1 from "../../assets/images/book1.png";
import Books2 from "../../assets/images/book2.png"; 
import Books3 from "../../assets/images/book1.png";
import DVDs1 from "../../assets/images/dvds1.png";
import DVDs2 from "../../assets/images/dvds1.png";
import Watch1 from "../../assets/images/watch1.png"; 
import Watch2 from "../../assets/images/watch1.png";
import Coat1 from "../../assets/images/coat1.png";
import Tools1 from "../../assets/images/tools.png"; 
import Tools2 from "../../assets/images/tools.png";
import Dinnerware1 from "../../assets/images/dinnerware1.png";
import Dinnerware2 from "../../assets/images/dinnerware1.png";
import Ball1 from "../../assets/images/balls.png"; 
import Ball2 from "../../assets/images/balls.png";
import Mic1 from "../../assets/images/mics1.png";
import Mic2 from "../../assets/images/mics1.png";
import Audio1 from "../../assets/images/audio1.png"; 
import Audio2 from "../../assets/images/audio1.png";
import ClothingBulk1 from "../../assets/images/clothing-bulks1.png";  
import ClothingBulk2 from "../../assets/images/clothing-bulks1.png";

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
    sold: 12,
    rating: 4.5,
    reviews: 128,
    moq: 2,
    bulkPrice: 675,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Camera1, Camera2, Camera3],
    description: 'Professional-grade DSLR camera with 32.5MP sensor, 4K video recording, and advanced autofocus system. Perfect for both photography enthusiasts and professional photographers.',
    specifications: {
      brand: 'Canon',
      sensor: '32.5MP APS-C CMOS',
      video: '4K UHD at 30fps',
      moq: '2 units minimum for bulk pricing',
      bulkDiscount: '10% discount for orders of 2+ units',
      warranty: '1 Year',
      b2bRequirement: 'B2B verification required for bulk orders'
    },
    features: [
      '32.5MP APS-C CMOS Sensor',
      '45-point All Cross-type AF System',
      '4K UHD Video Recording',
      '10 fps Continuous Shooting',
      'Bulk discount available: 10% off for 2+ units',
      'Weather-sealed Body'
    ]
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
    sold: 8,
    rating: 4.7,
    reviews: 256,
    moq: 2,
    bulkPrice: 1620,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Camera2, Camera1, Camera3],
    description: 'Full-frame mirrorless camera with 24.2MP BSI sensor, 693-point AF system, and 5-axis in-body stabilization. A versatile camera for all photography needs.',
    specifications: {
      brand: 'Sony',
      sensor: '24.2MP Full-frame BSI CMOS',
      video: '4K HDR at 30fps',
      moq: '2 units minimum for bulk pricing',
      bulkDiscount: '10% discount for B2B orders',
      stabilization: '5-axis In-body',
      warranty: '2 Years'
    },
    features: [
      '24.2MP Full-frame BSI CMOS Sensor',
      '693-point Phase Detection AF',
      '5-axis In-body Stabilization',
      'Bulk purchase: 10% off for 2+ units',
      '10 fps Continuous Shooting',
      'Dust and Moisture Resistant'
    ]
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
    sold: 15,
    rating: 4.3,
    reviews: 89,
    moq: 3,
    bulkPrice: 558,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Drone1, Drone2, Drone3],
    description: 'Ultra-light foldable drone with 4K camera, 38 minutes flight time, and advanced safety features. Perfect for travel and aerial photography.',
    specifications: {
      brand: 'DJI',
      weight: 'Under 249g',
      camera: '4K/30fps',
      moq: '3 units for bulk pricing',
      bulkSavings: 'Save 10% on orders of 3+',
      flightTime: '38 minutes',
      warranty: '1 Year'
    },
    features: [
      'Under 249g (No Registration Required)',
      '4K/30fps HDR Video',
      '38 Minutes Max Flight Time',
      'Tri-directional Obstacle Sensing',
      'B2B pricing: 10% off for 3+ units',
      'QuickShot Modes'
    ]
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
    sold: 6,
    rating: 4.8,
    reviews: 156,
    moq: 2,
    bulkPrice: 855,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Drone2, Drone1, Drone3],
    description: 'Advanced drone with 1-inch CMOS sensor, 5.4K video, and omnidirectional obstacle sensing. Professional aerial imaging capabilities.',
    specifications: {
      brand: 'DJI',
      sensor: '1-inch CMOS',
      video: '5.4K/30fps, 4K/60fps',
      moq: '2 units minimum',
      bulkDiscount: '10% for B2B verified accounts',
      flightTime: '31 minutes',
      warranty: '1 Year'
    },
    features: [
      '1-inch 20MP CMOS Sensor',
      '5.4K/30fps Video',
      'MasterShots Automated Cinematic Shots',
      'FocusTrack Subject Tracking',
      'B2B pricing available for 2+ units',
      'APAS 4.0 Obstacle Avoidance'
    ]
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
    sold: 3,
    rating: 4.2,
    reviews: 45,
    moq: 1,
    bulkPrice: null,
    bulkDiscount: 0,
    requiresB2BVerification: false,
    images: [Film1, Camera1],
    description: 'Classic film camera with manual controls, perfect for photography enthusiasts who appreciate analog photography.',
    specifications: {
      brand: 'Vintage',
      format: '35mm Film',
      moq: '1 unit (retail only)',
      bulkNote: 'No bulk pricing available',
      lens: 'Fixed 50mm f/1.8',
      condition: 'Vintage - Fully Functional'
    },
    features: [
      'Manual Focus and Exposure',
      'Mechanical Shutter',
      'Built-in Light Meter',
      'Collector item - single unit sales only',
      'Classic Design',
      'Fully Tested and Working'
    ]
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
    sold: 25,
    rating: 4.6,
    reviews: 342,
    moq: 3,
    bulkPrice: 899,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Phone1, Phone2, Phone3],
    description: 'Premium smartphone with Dynamic Island, 48MP camera, and A16 Bionic chip. Experience cutting-edge technology and seamless performance.',
    specifications: {
      brand: 'Apple',
      screen: '6.1" Super Retina XDR',
      moq: '3 units for bulk discount',
      bulkDiscount: '10% off for B2B orders',
      processor: 'A16 Bionic',
      storage: '128GB',
      warranty: '1 Year'
    },
    features: [
      'Dynamic Island for notifications',
      '48MP Main Camera with Photonic Engine',
      'Always-On Display',
      'B2B pricing: $899/unit for 3+ units',
      'Emergency SOS via Satellite',
      'IP68 Water Resistance'
    ]
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
    sold: 18,
    rating: 4.5,
    reviews: 289,
    moq: 3,
    bulkPrice: 765,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Phone2, Phone1, Phone3],
    description: 'Powerful Android smartphone with Snapdragon 8 Gen 2, 50MP camera, and stunning AMOLED display. Flagship performance in a compact design.',
    specifications: {
      brand: 'Samsung',
      screen: '6.1" Dynamic AMOLED 2X',
      moq: '3 units minimum',
      bulkSavings: 'Save $85 per unit for bulk orders',
      processor: 'Snapdragon 8 Gen 2',
      storage: '256GB',
      warranty: '2 Years'
    },
    features: [
      'Snapdragon 8 Gen 2 Mobile Platform',
      '50MP Adaptive Pixel Sensor',
      'Nightography for low-light photos',
      'Bulk discount: 10% for 3+ units',
      'IP68 Water and Dust Resistance',
      'One UI 5.1 with Android 13'
    ]
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
    sold: 10,
    rating: 4.9,
    reviews: 178,
    moq: 2,
    bulkPrice: 1350,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Laptop1, Laptop2],
    description: 'Professional laptop with Apple M2 chip, Liquid Retina XDR display, and all-day battery life. Ultimate productivity machine for creatives.',
    specifications: {
      brand: 'Apple',
      screen: '14.2" Liquid Retina XDR',
      moq: '2 units for B2B pricing',
      bulkDiscount: '10% discount for verified businesses',
      processor: 'Apple M2 Pro',
      memory: '16GB Unified Memory',
      warranty: '1 Year'
    },
    features: [
      'Apple M2 Pro chip',
      'Liquid Retina XDR display',
      'Up to 18 hours battery life',
      'B2B pricing: $1350/unit for 2+ units',
      'Six-speaker sound system',
      'Three Thunderbolt 4 ports'
    ]
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
    sold: 35,
    rating: 4.8,
    reviews: 421,
    moq: 5,
    bulkPrice: 288,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Headphones1, Headphones2],
    description: 'Premium noise-canceling headphones with industry-leading noise cancellation, exceptional sound quality, and comfortable all-day wear.',
    specifications: {
      brand: 'Sony',
      type: 'Over-ear Wireless',
      moq: '5 units for bulk pricing',
      bulkSavings: 'Save $32 per unit',
      battery: '30 hours with ANC',
      connectivity: 'Bluetooth 5.2',
      warranty: '2 Years'
    },
    features: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      'Auto Noise Canceling Optimizer',
      'Bulk order discount: 10% for 5+ units',
      'Quick Attention mode',
      'Wear detection'
    ]
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
    sold: 28,
    rating: 4.3,
    reviews: 67,
    moq: 5,
    bulkPrice: 108,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Jacket1, Jacket2],
    description: 'Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.Classic genuine leather jacket with premium finish, perfect for all seasons. Durable, stylish, and timeless fashion piece.',
    specifications: {
      material: '100% Genuine Leather',
      moq: '5 units for wholesale pricing',
      bulkDiscount: '10% for orders of 5+',
      color: 'Black',
      sizes: 'S, M, L, XL',
      care: 'Professional cleaning only'
    },
    features: [
      '100% genuine leather construction',
      'Classic biker style',
      'Zippered pockets',
      'Wholesale pricing available for 5+ units',
      'Soft cotton lining',
      'Heavy-duty zippers'
    ]
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
    sold: 42,
    rating: 4.4,
    reviews: 93,
    moq: 10,
    bulkPrice: 40.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Dress1, Dress2],
    description: 'Elegant summer dress with floral pattern, lightweight fabric, and comfortable fit. Perfect for warm weather and special occasions.',
    specifications: {
      material: '100% Cotton',
      moq: '10 units for bulk orders',
      bulkSavings: '10% discount for B2B',
      color: 'Floral Pattern',
      sizes: 'XS, S, M, L',
      care: 'Machine washable'
    },
    features: [
      '100% breathable cotton',
      'Floral print pattern',
      'Adjustable waist tie',
      'Bulk pricing: $40.5/unit for 10+',
      'Lightweight and airy',
      'Easy care fabric'
    ]
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
    sold: 38,
    rating: 4.2,
    reviews: 124,
    moq: 6,
    bulkPrice: 58.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Shoes1, Shoes2],
    description: 'High-performance running shoes with advanced cushioning technology, breathable mesh upper, and durable rubber outsole.',
    specifications: {
      brand: 'RunningPro',
      moq: '6 pairs minimum',
      bulkDiscount: '10% for verified businesses',
      type: 'Running Shoes',
      sizes: 'US 7-12',
      weight: '280g per shoe'
    },
    features: [
      'Advanced cushioning system',
      'Breathable mesh upper',
      'Shock-absorbing midsole',
      'B2B pricing: $58.5/pair for 6+',
      'Removable insole',
      'Reflective details for safety'
    ]
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
    sold: 15,
    rating: 4.5,
    reviews: 56,
    moq: 5,
    bulkPrice: 76.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Bag1, Bag2],
    description: 'Elegant leather handbag with multiple compartments, secure closure, and timeless design. Perfect for everyday use or special occasions.',
    specifications: {
      material: 'Genuine Leather',
      moq: '5 units for wholesale',
      bulkDiscount: '10% off bulk orders',
      color: 'Brown',
      dimensions: '12" x 9" x 5"',
      closure: 'Magnetic snap'
    },
    features: [
      'Genuine leather exterior',
      'Multiple interior compartments',
      'Adjustable shoulder strap',
      'Wholesale pricing for 5+ units',
      'Protective feet at bottom',
      'Lightweight design'
    ]
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
    sold: 2,
    rating: 4.7,
    reviews: 23,
    moq: 1,
    bulkPrice: null,
    bulkDiscount: 0,
    requiresB2BVerification: false,
    images: [Clock1, Clock2],
    description: 'Exquisite vintage mantel clock from early 20th century, featuring brass details, pendulum movement, and hand-carved wooden case.',
    specifications: {
      era: 'Early 20th Century',
      moq: '1 unit (unique item)',
      bulkNote: 'No bulk pricing - collector item',
      material: 'Wood and Brass',
      condition: 'Excellent Working Condition',
      age: '100+ years'
    },
    features: [
      'Hand-carved wooden case',
      'Brass pendulum and weights',
      'Westminster chimes',
      'Unique collector piece',
      'Ornate glass door',
      'Historical documentation included'
    ]
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
    sold: 1,
    rating: 4.9,
    reviews: 15,
    moq: 1,
    bulkPrice: null,
    bulkDiscount: 0,
    requiresB2BVerification: false,
    images: [Painting1, Painting2],
    description: 'Contemporary abstract painting by emerging artist, featuring bold colors, textured surface, and unique composition.',
    specifications: {
      artist: 'Alexandra Chen',
      moq: '1 piece (original artwork)',
      bulkNote: 'Single unit only - original art',
      medium: 'Acrylic on Canvas',
      dimensions: '36" x 48"',
      authenticity: 'Certificate included'
    },
    features: [
      'Original acrylic painting',
      'Heavy body texture',
      'Gallery wrapped edges',
      'One-of-a-kind artwork',
      'UV protective varnish',
      'Signed by artist'
    ]
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
    sold: 3,
    rating: 4.6,
    reviews: 31,
    moq: 1,
    bulkPrice: null,
    bulkDiscount: 0,
    requiresB2BVerification: false,
    images: [Coins1, Coins2],
    description: 'Rare collection of silver coins from different eras, including ancient Roman, medieval European, and early American coins.',
    specifications: {
      material: 'Silver',
      moq: '1 set (complete collection)',
      bulkNote: 'Collection sold as complete set',
      era: 'Various (Ancient to 19th Century)',
      coins: '15 pieces',
      certification: 'NGC/PCGS where applicable'
    },
    features: [
      '15 rare silver coins',
      'Spanning multiple centuries',
      'Professional grading',
      'Complete collection only',
      'Display case included',
      'Investment grade quality'
    ]
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
    sold: 2,
    rating: 4.0,
    reviews: 12,
    moq: 1,
    bulkPrice: 2250,
    bulkDiscount: 10,
    requiresB2BVerification: false,
    images: [Bundle1, Bundle2],
    description: 'Bulk lot of mixed electronics including smartphones, tablets, and accessories. Perfect for resellers, repair shops, or parts harvesting.',
    specifications: {
      items: '25+ mixed electronics',
      moq: '1 bundle',
      bulkDiscount: '10% for clearance stock',
      condition: 'Mixed (New to Used)',
      types: 'Smartphones, Tablets, Accessories',
      packaging: 'Original where available'
    },
    features: [
      'Mixed condition electronics',
      '25+ items in lot',
      'Smartphones and tablets',
      'Clearance pricing: 10% off',
      'Bulk pricing advantage',
      'Reseller opportunity'
    ]
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
    sold: 32,
    rating: 4.3,
    reviews: 89,
    moq: 10,
    bulkPrice: 108,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Battery1, Battery2],
    description: 'High-performance car battery with enhanced cranking power, long service life, and maintenance-free design. Compatible with most vehicles.',
    specifications: {
      brand: 'PowerStart',
      moq: '10 units for wholesale',
      bulkSavings: 'Save 10% on bulk orders',
      type: 'Lead-Acid',
      voltage: '12V',
      warranty: '3 Years'
    },
    features: [
      'Enhanced Flooded Technology',
      '650 Cold Cranking Amps',
      'Spill-proof design',
      'Wholesale pricing for 10+ units',
      'Maintenance-free',
      'Universal fit'
    ]
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
    sold: 18,
    rating: 4.2,
    reviews: 47,
    moq: 10,
    bulkPrice: 67.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Seats1, Seats2],
    description: 'Premium neoprene car seat covers offering protection, comfort, and style. Universal fit for most car models.',
    specifications: {
      material: 'Neoprene',
      moq: '10 sets minimum',
      bulkDiscount: '10% for B2B verified',
      color: 'Black/Red',
      fit: 'Universal (Front seats)',
      care: 'Machine washable'
    },
    features: [
      'Water and stain resistant',
      'Breathable neoprene material',
      'Non-slip backing',
      'B2B pricing: $67.5/set for 10+',
      'Side pocket storage',
      'Machine washable'
    ]
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
    sold: 6,
    rating: 4.7,
    reviews: 64,
    moq: 2,
    bulkPrice: 315,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Table1, Table2],
    description: 'Solid wood dining table with rustic finish, extending feature, and sturdy construction. Seats 6-8 people comfortably.',
    specifications: {
      material: 'Solid Oak',
      moq: '2 units for bulk pricing',
      bulkSavings: '10% discount for businesses',
      dimensions: '72" x 36" x 30"',
      seating: '6-8 people',
      assembly: 'Required'
    },
    features: [
      'Solid oak construction',
      'Extendable design',
      'Rustic distressed finish',
      'Wholesale pricing for 2+ units',
      'Easy assembly',
      'Weight capacity: 300 lbs'
    ]
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
    sold: 25,
    rating: 4.4,
    reviews: 38,
    moq: 12,
    bulkPrice: 40.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Vase1, Vase2],
    description: 'Handcrafted ceramic vase with intricate patterns and glossy finish. Perfect for floral arrangements or standalone decoration.',
    specifications: {
      material: 'Ceramic',
      moq: '12 units for wholesale',
      bulkDiscount: '10% off bulk orders',
      height: '15 inches',
      color: 'Blue/White Pattern',
      handmade: 'Yes'
    },
    features: [
      'Handcrafted ceramic',
      'Intricate hand-painted pattern',
      'Glossy durable finish',
      'B2B pricing: $40.5/unit for 12+',
      'Waterproof interior',
      'Unique design piece'
    ]
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
    sold: 12,
    rating: 4.5,
    reviews: 92,
    moq: 5,
    bulkPrice: 162,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Cookware1, Cookware2],
    description: 'Complete non-stick cookware set including pots, pans, and utensils. PFOA-free coating and durable construction.',
    specifications: {
      pieces: '10-piece set',
      moq: '5 sets minimum',
      bulkSavings: 'Save $18 per set',
      material: 'Aluminum with ceramic coating',
      coating: 'PFOA-free non-stick',
      dishwasher: 'Dishwasher safe'
    },
    features: [
      '10-piece complete set',
      'PFOA-free ceramic coating',
      'Even heat distribution',
      'Wholesale pricing for 5+ sets',
      'Induction compatible',
      'Oven safe to 450°F'
    ]
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
    sold: 9,
    rating: 4.8,
    reviews: 156,
    moq: 3,
    bulkPrice: 198,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Mixer1, Mixer2],
    description: 'Professional stand mixer with multiple speed settings, dough hook, whisk, and paddle attachments. Perfect for baking enthusiasts.',
    specifications: {
      power: '500W motor',
      moq: '3 units for bulk orders',
      bulkDiscount: '10% for verified businesses',
      speed: '10 settings',
      capacity: '5-quart bowl',
      warranty: '5 Years'
    },
    features: [
      '500W powerful motor',
      '10 speed settings',
      '5-quart stainless steel bowl',
      'B2B pricing: $198/unit for 3+',
      'Planetary mixing action',
      'Includes 3 attachments'
    ]
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
    sold: 16,
    rating: 4.4,
    reviews: 73,
    moq: 5,
    bulkPrice: 162,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Dumbbells1, Dumbbells2],
    description: 'Space-saving adjustable dumbbell set with quick-change weight system. Replace multiple dumbbells with one compact unit.',
    specifications: {
      weight: '5-50 lbs per dumbbell',
      moq: '5 sets for wholesale',
      bulkSavings: '10% discount for gyms',
      increments: '2.5 lbs',
      grip: 'Textured rubber',
      warranty: '2 Years'
    },
    features: [
      '5-50 lbs per dumbbell',
      'Quick dial weight selection',
      'Textured rubber grip',
      'Gym/wholesale pricing for 5+',
      'Compact storage design',
      'Durable steel construction'
    ]
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
    sold: 11,
    rating: 4.6,
    reviews: 88,
    moq: 4,
    bulkPrice: 135,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Tent1, Tent2],
    description: '4-person dome tent with waterproof rainfly, ventilation windows, and easy setup. Perfect for family camping trips.',
    specifications: {
      capacity: '4 persons',
      moq: '4 tents minimum',
      bulkDiscount: '10% for outdoor retailers',
      dimensions: '96" x 84" x 54"',
      season: '3-season',
      waterproof: '2000mm'
    },
    features: [
      'Sleeps 4 comfortably',
      'Waterproof rainfly',
      'Large mesh windows',
      'Wholesale pricing for 4+ tents',
      'Gear loft and pockets',
      'Carry bag included'
    ]
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
    sold: 7,
    rating: 4.7,
    reviews: 124,
    moq: 2,
    bulkPrice: 270,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Guitar1, Guitar2],
    description: 'Full-size dreadnought acoustic guitar with solid spruce top, mahogany back and sides, and excellent projection.',
    specifications: {
      type: 'Dreadnought',
      moq: '2 guitars for bulk pricing',
      bulkSavings: 'Save 10% per guitar',
      top: 'Solid Spruce',
      back: 'Mahogany',
      fretboard: 'Rosewood'
    },
    features: [
      'Solid spruce top',
      'Mahogany back and sides',
      'Rosewood fretboard',
      'B2B pricing: $270/guitar for 2+',
      'Gloss finish',
      'Includes gig bag'
    ]
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
    sold: 4,
    rating: 4.9,
    reviews: 67,
    moq: 2,
    bulkPrice: 540,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Piano1, Piano2],
    description: '88-key weighted digital piano with hammer action keys, multiple voices, and built-in speakers. Feels and sounds like a real piano.',
    specifications: {
      keys: '88 weighted hammer action',
      moq: '2 units for schools/studios',
      bulkDiscount: '10% for music institutions',
      voices: '20 different tones',
      polyphony: '64 notes',
      power: 'AC adapter'
    },
    features: [
      '88 weighted hammer-action keys',
      '20 high-quality voices',
      '64-note polyphony',
      'Institutional pricing for 2+ units',
      'Recording function',
      'Includes sustain pedal'
    ]
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
    sold: 48,
    rating: 4.5,
    reviews: 189,
    moq: 10,
    bulkPrice: 31.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Books1, Books2, Books3],
    description: 'Collection of 5 bestselling novels from award-winning authors, beautifully boxed set for collectors and readers.',
    specifications: {
      books: '5 hardcover novels',
      moq: '10 sets for bookstores',
      bulkSavings: '10% discount for retailers',
      authors: 'Various',
      genre: 'Literary Fiction',
      box: 'Presentation box'
    },
    features: [
      '5 bestselling novels',
      'Hardcover editions',
      'Matching dust jackets',
      'Bookstore pricing for 10+ sets',
      'Author biographies',
      'Reading guide included'
    ]
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
    sold: 15,
    rating: 4.6,
    reviews: 42,
    moq: 5,
    bulkPrice: 76.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Books2, Books1],
    description: 'Comprehensive world history encyclopedia covering ancient civilizations to modern times, with illustrations, maps, and timelines.',
    specifications: {
      volumes: '4 volume set',
      moq: '5 sets for educational bulk',
      bulkDiscount: '10% for schools/libraries',
      pages: '2000+ pages total',
      maps: '200 detailed maps',
      binding: 'Premium hardcover'
    },
    features: [
      '4-volume comprehensive set',
      'Full-color illustrations',
      'Detailed historical maps',
      'Educational pricing for 5+ sets',
      'Biographical entries',
      'Scholarly yet accessible'
    ]
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
    sold: 21,
    rating: 4.7,
    reviews: 78,
    moq: 8,
    bulkPrice: 54,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [DVDs1, DVDs2],
    description: 'Collector\'s edition of 10 classic films from Hollywood\'s Golden Age, beautifully packaged with bonus features.',
    specifications: {
      movies: '10 classic films',
      moq: '8 collections for retailers',
      bulkSavings: '10% off bulk orders',
      format: 'Blu-ray + Digital',
      runtime: 'Approx. 20 hours',
      region: 'Region free'
    },
    features: [
      '10 restored classic films',
      'High-definition transfers',
      'Director commentaries',
      'Retailer pricing for 8+ collections',
      'Collector\'s packaging',
      'Digital copies included'
    ]
  },
  
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
    sold: 28,
    rating: 4.6,
    reviews: 234,
    moq: 5,
    bulkPrice: 288,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Watch1, Watch2],
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and smartphone connectivity. Always-on retina display.',
    specifications: {
      brand: 'TechWear',
      moq: '5 units for bulk pricing',
      bulkDiscount: '10% for corporate orders',
      display: 'Always-on Retina',
      battery: '18-hour life',
      water: '50m water resistant'
    },
    features: [
      'Always-on retina display',
      'Advanced health sensors',
      'Fitness tracking',
      'Corporate pricing for 5+ units',
      'Customizable watch faces',
      'Fast charging'
    ]
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
    sold: 32,
    rating: 4.3,
    reviews: 56,
    moq: 8,
    bulkPrice: 85.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Coat1, Jacket1],
    description: 'Heavy-duty winter coat with thermal insulation, waterproof exterior, and multiple pockets. Perfect for extreme cold weather.',
    specifications: {
      material: 'Polyester/Nylon blend',
      moq: '8 units for wholesale',
      bulkSavings: '10% discount for retailers',
      insulation: 'Thermal synthetic',
      waterproof: '5000mm rating',
      sizes: 'S, M, L, XL, XXL'
    },
    features: [
      'Thermal insulation',
      'Waterproof and windproof',
      'Multiple pockets',
      'Retailer pricing for 8+ units',
      'Adjustable cuffs',
      'Durable zippers'
    ]
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
    sold: 18,
    rating: 4.4,
    reviews: 39,
    moq: 8,
    bulkPrice: 58.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Tools1, Tools2],
    description: 'Complete garden tool set with ergonomic handles, rust-resistant steel, and storage case. Everything needed for gardening.',
    specifications: {
      pieces: '8-piece set',
      moq: '8 sets for garden centers',
      bulkDiscount: '10% for bulk orders',
      material: 'Stainless steel heads',
      handles: 'Ergonomic rubber',
      warranty: 'Lifetime'
    },
    features: [
      '8 essential garden tools',
      'Stainless steel heads',
      'Ergonomic rubber grips',
      'Garden center pricing for 8+',
      'Storage case included',
      'Hanging holes for storage'
    ]
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
    sold: 11,
    rating: 4.5,
    reviews: 67,
    moq: 6,
    bulkPrice: 108,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Dinnerware1, Dinnerware2],
    description: '16-piece ceramic dinner set with elegant design, dishwasher safe, and microwave safe. Service for 4 people.',
    specifications: {
      pieces: '16-piece set',
      moq: '6 sets for restaurant/hotel',
      bulkSavings: '10% for hospitality industry',
      material: 'High-fired ceramic',
      service: 'For 4 people',
      dishwasher: 'Safe'
    },
    features: [
      'Service for 4',
      'Elegant minimalist design',
      'Chip-resistant',
      'Hospitality pricing for 6+ sets',
      'Easy to clean',
      'Lead-free glaze'
    ]
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
    sold: 35,
    rating: 4.3,
    reviews: 45,
    moq: 12,
    bulkPrice: 31.5,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Ball1, Ball2],
    description: 'Official size and weight basketball with deep channel design, composite leather cover, and consistent bounce.',
    specifications: {
      size: 'Official Size 7',
      moq: '12 balls for schools/teams',
      bulkDiscount: '10% for team orders',
      weight: '22 oz',
      material: 'Composite leather',
      indoor: 'Indoor/outdoor'
    },
    features: [
      'Official size and weight',
      'Composite leather cover',
      'Deep channel design',
      'Team/school pricing for 12+',
      'Moisture-wicking surface',
      'Official NBA style'
    ]
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
    sold: 13,
    rating: 4.7,
    reviews: 89,
    moq: 4,
    bulkPrice: 162,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Mic1, Mic2],
    description: 'Professional condenser microphone with cardioid pattern, low-noise circuitry, and included shock mount. Perfect for vocals and instruments.',
    specifications: {
      type: 'Condenser',
      moq: '4 units for studios',
      bulkSavings: '10% for recording studios',
      pattern: 'Cardioid',
      frequency: '20Hz - 20kHz',
      connector: 'XLR'
    },
    features: [
      'Cardioid polar pattern',
      'Low self-noise',
      'Shock mount included',
      'Studio pricing for 4+ units',
      'Durable metal construction',
      'Studio-quality sound'
    ]
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
    sold: 7,
    rating: 4.6,
    reviews: 124,
    moq: 3,
    bulkPrice: 315,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [Audio1, Audio2],
    description: 'Complete car audio upgrade system with touchscreen head unit, speakers, subwoofer, and amplifier. Professional sound quality.',
    specifications: {
      headUnit: '7" Touchscreen',
      moq: '3 systems for installers',
      bulkDiscount: '10% for auto shops',
      speakers: '4 component speakers',
      subwoofer: '10" powered',
      installation: 'Professional recommended'
    },
    features: [
      '7" touchscreen display',
      'Bluetooth connectivity',
      'Built-in navigation',
      'Installation shop pricing for 3+',
      '10" powered subwoofer',
      'Easy smartphone integration'
    ]
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
    sold: 3,
    rating: 4.1,
    reviews: 8,
    moq: 1,
    bulkPrice: 1080,
    bulkDiscount: 10,
    requiresB2BVerification: true,
    images: [ClothingBulk1, ClothingBulk2],
    description: 'Bulk lot of mixed clothing items including shirts, pants, and accessories. Perfect for resellers, vintage shops, or online sellers.',
    specifications: {
      items: '50+ mixed clothing',
      moq: '1 pack (wholesale item)',
      bulkDiscount: '10% for resellers',
      types: 'Shirts, Pants, Accessories',
      sizes: 'Mixed (S-XXL)',
      packaging: 'Bulk packed'
    },
    features: [
      '50+ clothing items',
      'Mixed styles and sizes',
      'Reseller pricing: 10% off',
      'Bulk pricing advantage',
      'Inventory for shops',
      'Quick turnaround'
    ]
  },
];

export default products;