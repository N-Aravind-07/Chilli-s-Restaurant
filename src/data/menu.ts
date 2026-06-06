export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isVeg: boolean;
  rating: number;
  ratingCount: number;
  description: string;
  image: string;
  isPopular?: boolean;
  isTrending?: boolean;
}

// Curated high quality food photography URLs from Unsplash (unrestricted public URLs)
const IMAGES = {
  biryani_special: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
  biryani_wings: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
  biryani_paneer: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
  fried_rice: "https://images.unsplash.com/photo-1603133872878-685f58882791?w=600&auto=format&fit=crop&q=80",
  butter_chicken: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
  kadai_chicken: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
  chicken_65: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=80",
  paneer_tikka: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80",
  tandoori_chicken: "https://images.unsplash.com/photo-1617692855673-c86ce3b3726f?w=600&auto=format&fit=crop&q=80",
  soup: "https://images.unsplash.com/photo-1547592165-e1d17fed6005?w=600&auto=format&fit=crop&q=80",
  curd_rice: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80",
  veg_curry: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
  mushroom: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
  starter: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
  placeholder: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80"
};

export const MENU_ITEMS: MenuItem[] = [
  // --- Popular Highlights / Special ---
  {
    id: "sp-wings-biryani",
    name: "Chicken Wings Biryani",
    price: 310,
    category: "Biryani",
    isVeg: false,
    rating: 4.8,
    ratingCount: 245,
    description: "Flavourful basmati rice slow-cooked with aromatic spices and topped with deep-fried spiced chicken wings. A signature dish of Chilli's.",
    image: IMAGES.biryani_wings,
    isPopular: true,
    isTrending: true
  },
  {
    id: "sp-chicken-biryani",
    name: "Special Chicken Biryani",
    price: 290,
    category: "Biryani",
    isVeg: false,
    rating: 4.9,
    ratingCount: 512,
    description: "A luxury blend of long-grain basmati rice, tender chicken, and secret home-ground masalas. Served with raita and salan.",
    image: IMAGES.biryani_special,
    isPopular: true,
    isTrending: true
  },
  {
    id: "paneer-biryani-sp",
    name: "Paneer Biryani",
    price: 220,
    category: "Biryani",
    isVeg: true,
    rating: 4.6,
    ratingCount: 128,
    description: "Premium chunks of fresh cottage cheese marinated in herbs and tandoori spices, cooked layered with fragrant rice.",
    image: IMAGES.biryani_paneer,
    isPopular: true
  },

  // --- Fried Rice Non Veg Items ---
  {
    id: "43",
    name: "Egg Fried Rice",
    price: 150,
    category: "Fried Rice",
    isVeg: false,
    rating: 4.4,
    ratingCount: 94,
    description: "Classic Chinese wok-fried rice tossed with eggs, crunchy greens, scallions, and light soy sauce.",
    image: IMAGES.fried_rice
  },
  {
    id: "44",
    name: "Chicken Fried Rice",
    price: 210,
    category: "Fried Rice",
    isVeg: false,
    rating: 4.5,
    ratingCount: 180,
    description: "Stir-fried long-grain rice tossed with seasoned chicken shreds, eggs, fresh vegetables, and dark soy.",
    image: IMAGES.fried_rice
  },
  {
    id: "45",
    name: "S.P. Chicken Fried Rice",
    price: 240,
    category: "Fried Rice",
    isVeg: false,
    rating: 4.7,
    ratingCount: 160,
    description: "House special wok-tossed rice with extra chunks of marinated spiced chicken, scrambled egg, and spicy schezwan touch.",
    image: IMAGES.fried_rice,
    isPopular: true
  },
  {
    id: "46",
    name: "S.P. Wings Fried Rice",
    price: 330,
    category: "Fried Rice",
    isVeg: false,
    rating: 4.8,
    ratingCount: 95,
    description: "A combination of our house chicken fried rice served with crispy golden chicken wings on the side.",
    image: IMAGES.fried_rice,
    isTrending: true
  },

  // --- Non Veg Curries & Fries ---
  {
    id: "47",
    name: "Chicken Curry (Bones)",
    price: 150,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.3,
    ratingCount: 88,
    description: "Traditional Andhra-style spicy chicken curry cooked with bone, fresh coconut, and caramelized onions.",
    image: IMAGES.kadai_chicken
  },
  {
    id: "48",
    name: "Chicken Fry (Bones)",
    price: 170,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.4,
    ratingCount: 72,
    description: "Deep-fried chicken pieces with bone, seasoned with fresh curry leaves, green chillies, and local Andhra spices.",
    image: IMAGES.starter
  },
  {
    id: "49",
    name: "Chicken Roast",
    price: 190,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.6,
    ratingCount: 110,
    description: "Dry roasted chicken with onion-tomato gravy, loaded with freshly ground black pepper and curry leaves.",
    image: IMAGES.starter,
    isPopular: true
  },
  {
    id: "50",
    name: "Chicken Curry (Boneless)",
    price: 160,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.5,
    ratingCount: 140,
    description: "Juicy, tender boneless chicken breast chunks cooked in a rich, mildly spiced onion-tomato curry base.",
    image: IMAGES.kadai_chicken
  },
  {
    id: "51",
    name: "Chicken Fry (Boneless)",
    price: 170,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.5,
    ratingCount: 85,
    description: "Boneless chicken marinated in yogurt and home spices, fried to a golden brown with curry leaves.",
    image: IMAGES.starter
  },
  {
    id: "52",
    name: "Butter Chicken",
    price: 170,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.7,
    ratingCount: 320,
    description: "World-class tandoori-grilled chicken pieces simmered in a silky, rich, buttery tomato cream gravy.",
    image: IMAGES.butter_chicken,
    isPopular: true
  },
  {
    id: "53",
    name: "Kadai Chicken",
    price: 180,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.5,
    ratingCount: 115,
    description: "Cottage-style chicken curry cooked in a wok (kadai) with bell peppers, onions, tomatoes, and freshly crushed coriander.",
    image: IMAGES.kadai_chicken
  },
  {
    id: "54",
    name: "Mogalai Chicken",
    price: 180,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.6,
    ratingCount: 130,
    description: "A royal recipe featuring cashew nut paste, boiled eggs, and a rich, creamy, yellow-tinged chicken gravy.",
    image: IMAGES.butter_chicken
  },
  {
    id: "55",
    name: "Fried Wings Curry",
    price: 180,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.5,
    ratingCount: 76,
    description: "Delicious fried chicken wings submerged in a spicy, thick masala curry gravy.",
    image: IMAGES.kadai_chicken
  },
  {
    id: "56",
    name: "Wings Fry",
    price: 210,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.6,
    ratingCount: 140,
    description: "Perfectly seasoned, crispy fried chicken wings coated in a special spice dry rub.",
    image: IMAGES.starter,
    isTrending: true
  },
  {
    id: "57",
    name: "Wings Roast",
    price: 210,
    category: "Non-Veg Curries",
    isVeg: false,
    rating: 4.7,
    ratingCount: 154,
    description: "Juicy chicken wings roasted on slow heat with butter, green chillies, and curry leaf seasoning.",
    image: IMAGES.starter
  },
  {
    id: "64",
    name: "Chicken 65",
    price: 170,
    category: "Starters",
    isVeg: false,
    rating: 4.8,
    ratingCount: 420,
    description: "A legendary South Indian deep-fried chicken appetizer, flavored with red chillies, curry leaves, and yogurt.",
    image: IMAGES.chicken_65,
    isPopular: true
  },
  {
    id: "65",
    name: "Chilli Chicken",
    price: 170,
    category: "Chinese",
    isVeg: false,
    rating: 4.5,
    ratingCount: 210,
    description: "Wok-tossed battered chicken cubes with dynamic bell peppers, onions, garlic, and hot green chillies in soy sauce.",
    image: IMAGES.placeholder
  },
  {
    id: "66",
    name: "Chicken Manchuria",
    price: 170,
    category: "Chinese",
    isVeg: false,
    rating: 4.4,
    ratingCount: 198,
    description: "Crispy chicken balls coated in a tangy, thick, sweet and sour Manchurian gravy.",
    image: IMAGES.placeholder
  },
  {
    id: "67",
    name: "Chicken 85",
    price: 220,
    category: "Starters",
    isVeg: false,
    rating: 4.7,
    ratingCount: 94,
    description: "Chilli's signature starter: spicy battered chicken roasted with cashew nuts, curry leaves, and a special house cream sauce.",
    image: IMAGES.starter,
    isTrending: true
  },
  {
    id: "68",
    name: "Pepper Chicken",
    price: 220,
    category: "Starters",
    isVeg: false,
    rating: 4.6,
    ratingCount: 150,
    description: "Stir-fried boneless chicken seasoned with plenty of freshly ground black pepper, garlic, and sliced green chillies.",
    image: IMAGES.starter
  },
  {
    id: "69",
    name: "Cashew nut Chicken",
    price: 220,
    category: "Starters",
    isVeg: false,
    rating: 4.7,
    ratingCount: 112,
    description: "Tender chicken bits roasted along with roasted cashews in a rich dry-masala paste.",
    image: IMAGES.starter
  },
  {
    id: "70",
    name: "RR Chicken",
    price: 190,
    category: "Starters",
    isVeg: false,
    rating: 4.6,
    ratingCount: 135,
    description: "An authentic, spicy dry chicken starter tossed with Guntur red chillies, curry leaves, and ghee.",
    image: IMAGES.chicken_65,
    isPopular: true
  },
  {
    id: "71",
    name: "Chicken 555",
    price: 220,
    category: "Starters",
    isVeg: false,
    rating: 4.7,
    ratingCount: 104,
    description: "Fried chicken strips tossed in a sweet-spicy garlic sauce and topped with shredded spring onions and cashews.",
    image: IMAGES.starter
  },
  {
    id: "72",
    name: "Joint Fry",
    price: 130,
    category: "Starters",
    isVeg: false,
    rating: 4.5,
    ratingCount: 178,
    description: "Deep fried chicken leg joint marinated in home spices. Crispy on the outside, juicy inside.",
    image: IMAGES.tandoori_chicken
  },
  {
    id: "73",
    name: "Joint Roast",
    price: 130,
    category: "Starters",
    isVeg: false,
    rating: 4.6,
    ratingCount: 140,
    description: "Chicken leg joint roasted slowly on charcoal with ghee and spicy red masala marinade.",
    image: IMAGES.tandoori_chicken
  },

  // --- Tandoori Non-Veg ---
  {
    id: "80",
    name: "Chicken Tikka",
    price: 240,
    category: "Tandoori",
    isVeg: false,
    rating: 4.7,
    ratingCount: 230,
    description: "Boneless chicken cubes marinated in tandoori yogurt spice paste and cooked to perfection on skewers in a clay tandoor.",
    image: IMAGES.tandoori_chicken,
    isPopular: true
  },
  {
    id: "81",
    name: "Malai Tikka",
    price: 250,
    category: "Tandoori",
    isVeg: false,
    rating: 4.8,
    ratingCount: 190,
    description: "Mouth-melting chicken cubes marinated in cashew paste, cream, cheese, and cardamom before roasting.",
    image: IMAGES.tandoori_chicken,
    isPopular: true
  },
  {
    id: "86",
    name: "Tandoori Full",
    price: 450,
    category: "Tandoori",
    isVeg: false,
    rating: 4.8,
    ratingCount: 380,
    description: "Whole skinless chicken marinated in seasoned yogurt marinade and roasted over glowing charcoal. Fit for a family feast.",
    image: IMAGES.tandoori_chicken
  },
  {
    id: "87",
    name: "Tandoori Half",
    price: 250,
    category: "Tandoori",
    isVeg: false,
    rating: 4.7,
    ratingCount: 240,
    description: "Half chicken prepared in traditional tandoori marinade, roasted till smoky and tender.",
    image: IMAGES.tandoori_chicken
  },

  // --- Tandoori Veg ---
  {
    id: "88",
    name: "Paneer Tikka",
    price: 200,
    category: "Tandoori",
    isVeg: true,
    rating: 4.6,
    ratingCount: 180,
    description: "Fresh cubes of cottage cheese, capsicum, and onions marinated in charcoal tikka spices and grilled in clay tandoor.",
    image: IMAGES.paneer_tikka
  },

  // --- Veg Items (Rice & Biryani) ---
  {
    id: "89",
    name: "White Rice",
    price: 40,
    category: "Rice Items",
    isVeg: true,
    rating: 4.2,
    ratingCount: 60,
    description: "Steaming hot, fluffy long-grain basmati rice.",
    image: IMAGES.curd_rice
  },
  {
    id: "90",
    name: "Veg Fried Rice",
    price: 150,
    category: "Fried Rice",
    isVeg: true,
    rating: 4.3,
    ratingCount: 110,
    description: "Fluffy basmati rice tossed with fresh carrots, beans, peas, and light spring onion seasoning.",
    image: IMAGES.fried_rice
  },
  {
    id: "94",
    name: "Paneer Fried Rice",
    price: 190,
    category: "Fried Rice",
    isVeg: true,
    rating: 4.6,
    ratingCount: 140,
    description: "Wok-tossed rice with spiced cubes of fresh paneer, bell peppers, and scallions.",
    image: IMAGES.fried_rice
  },
  {
    id: "97",
    name: "Paneer Biryani",
    price: 220,
    category: "Biryani",
    isVeg: true,
    rating: 4.6,
    ratingCount: 165,
    description: "Layers of aromatic basmati rice cooked with fresh paneer tikka masala and slow dum process.",
    image: IMAGES.biryani_paneer
  },
  {
    id: "99",
    name: "Mushroom Biryani",
    price: 220,
    category: "Biryani",
    isVeg: true,
    rating: 4.5,
    ratingCount: 98,
    description: "Dum-cooked basmati rice with spiced fresh button mushrooms and mint leaves.",
    image: IMAGES.biryani_paneer
  },
  {
    id: "100",
    name: "Curd Rice",
    price: 70,
    category: "Rice Items",
    isVeg: true,
    rating: 4.7,
    ratingCount: 290,
    description: "Traditional cooling curd rice tempered with mustard seeds, curry leaves, and dry chillies. Andhra comfort food.",
    image: IMAGES.curd_rice,
    isPopular: true
  },

  // --- Veg Curries ---
  {
    id: "102",
    name: "Palak Paneer",
    price: 110,
    category: "Veg Curries",
    isVeg: true,
    rating: 4.5,
    ratingCount: 190,
    description: "Fresh cottage cheese cubes cooked in a vibrant, spiced smooth spinach gravy.",
    image: IMAGES.veg_curry
  },
  {
    id: "103",
    name: "Kaju Paneer",
    price: 200,
    category: "Veg Curries",
    isVeg: true,
    rating: 4.7,
    ratingCount: 220,
    description: "Rich and creamy curry made with cashew nuts and fresh paneer cubes in onion-tomato gravy.",
    image: IMAGES.veg_curry,
    isPopular: true
  },
  {
    id: "106",
    name: "Cashew nut Curry",
    price: 160,
    category: "Veg Curries",
    isVeg: true,
    rating: 4.6,
    ratingCount: 140,
    description: "Creamy cashew gravy cooked with fresh cream, mild spices, and ghee.",
    image: IMAGES.veg_curry
  },
  {
    id: "108",
    name: "Mixed Veg Curry",
    price: 110,
    category: "Veg Curries",
    isVeg: true,
    rating: 4.3,
    ratingCount: 95,
    description: "Seasonal fresh vegetables cooked in an authentic onion-tomato-coconut base.",
    image: IMAGES.veg_curry
  },
  {
    id: "111",
    name: "Malai Koftha",
    price: 190,
    category: "Veg Curries",
    isVeg: true,
    rating: 4.7,
    ratingCount: 160,
    description: "Deep fried paneer-potato balls served in a sweet, silky cashew cream gravy.",
    image: IMAGES.veg_curry,
    isPopular: true
  },
  {
    id: "112",
    name: "Mushroom Curry",
    price: 170,
    category: "Veg Curries",
    isVeg: true,
    rating: 4.4,
    ratingCount: 88,
    description: "Button mushrooms cooked with caramelized onions, tomatoes, and home spices.",
    image: IMAGES.mushroom
  },

  // --- Veg Soups ---
  {
    id: "119",
    name: "Sweet Corn Soup",
    price: 80,
    category: "Soups",
    isVeg: true,
    rating: 4.5,
    ratingCount: 130,
    description: "Comforting, warm soup cooked with fresh sweet corn kernels and minced vegetables.",
    image: IMAGES.soup
  },
  {
    id: "122",
    name: "Veg Manchow Soup",
    price: 90,
    category: "Soups",
    isVeg: true,
    rating: 4.6,
    ratingCount: 145,
    description: "Spicy dark soy vegetable soup topped with a handful of crispy fried noodles.",
    image: IMAGES.soup
  }
];
