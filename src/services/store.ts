import { MenuItem, MENU_ITEMS } from '../data/menu';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  addresses: string[];
  wishlist: string[];
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Placed' | 'Preparing' | 'Cooking' | 'Out For Delivery' | 'Delivered';
  createdAt: string;
  address: string;
  landmark?: string;
  instructions?: string;
  paymentMethod: 'COD' | 'UPI' | 'Card';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrder: number;
  description: string;
}

// Default system coupons
const DEFAULT_COUPONS: Coupon[] = [
  { code: 'CHILLI10', discountPercent: 10, minOrder: 300, description: 'Get 10% off on orders above ₹300' },
  { code: 'WELCOME20', discountPercent: 20, minOrder: 500, description: 'Special 20% off on luxury platters above ₹500' },
  { code: 'BAPATLAFREE', discountPercent: 15, minOrder: 200, description: '15% discount for local Bapatla residents' }
];

// Initial mock orders to make dashboard analytics rich right away
const INITIAL_ORDERS: Order[] = [
  {
    id: "CH-8492",
    userId: "user-1",
    userName: "Ramesh Kumar",
    userPhone: "9848523456",
    items: [
      { menuItem: MENU_ITEMS[0], quantity: 2 }, // Wings Biryani
      { menuItem: MENU_ITEMS[4], quantity: 1 }  // Chicken Fried Rice
    ],
    subtotal: 830,
    deliveryFee: 30,
    tax: 149.4,
    discount: 83,
    total: 926.4,
    status: "Delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    address: "2-124, GBC Road, Srungarapuram, Bapatla",
    landmark: "Opposite SBI Bank",
    paymentMethod: "UPI",
    paymentStatus: "Paid"
  },
  {
    id: "CH-9214",
    userId: "user-2",
    userName: "Saritha Reddy",
    userPhone: "8500851234",
    items: [
      { menuItem: MENU_ITEMS[1], quantity: 1 }, // Special Chicken Biryani
      { menuItem: MENU_ITEMS[11], quantity: 1 } // Butter Chicken
    ],
    subtotal: 460,
    deliveryFee: 30,
    tax: 82.8,
    discount: 0,
    total: 572.8,
    status: "Delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    address: "Flat 402, Sri Sai Residency, Bapatla Bypass",
    landmark: "Near Bus Stand",
    paymentMethod: "COD",
    paymentStatus: "Pending"
  },
  {
    id: "CH-3012",
    userId: "user-3",
    userName: "Praveen Naidu",
    userPhone: "7702456789",
    items: [
      { menuItem: MENU_ITEMS[2], quantity: 1 }, // Paneer Biryani
      { menuItem: MENU_ITEMS[26], quantity: 1 } // Paneer Tikka
    ],
    subtotal: 420,
    deliveryFee: 30,
    tax: 75.6,
    discount: 42,
    total: 483.6,
    status: "Cooking",
    createdAt: new Date().toISOString(), // Just now
    address: "Room 12, Agri College Hostel, Bapatla",
    landmark: "Near Main Gate",
    paymentMethod: "UPI",
    paymentStatus: "Paid"
  }
];

class ChilliStore {
  private listeners: Set<() => void> = new Set();
  
  // State variables
  public menuItems: MenuItem[] = [];
  public cart: CartItem[] = [];
  public user: UserProfile | null = null;
  public orders: Order[] = [];
  public coupons: Coupon[] = DEFAULT_COUPONS;
  public activeCoupon: Coupon | null = null;
  public recentlyViewed: string[] = [];
  public isDark: boolean = false;
  
  constructor() {
    this.loadFromLocalStorage();
  }

  // Observable registration
  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.saveToLocalStorage();
    this.listeners.forEach((listener) => listener());
  }

  private loadFromLocalStorage() {
    try {
      this.isDark = localStorage.getItem('chilly_dark') === 'true';
      if (this.isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }

      const savedMenu = localStorage.getItem('chilly_menu');
      this.menuItems = savedMenu ? JSON.parse(savedMenu) : MENU_ITEMS;

      const savedCart = localStorage.getItem('chilly_cart');
      this.cart = savedCart ? JSON.parse(savedCart) : [];

      const savedUser = localStorage.getItem('chilly_user');
      this.user = savedUser ? JSON.parse(savedUser) : null;

      const savedOrders = localStorage.getItem('chilly_orders');
      this.orders = savedOrders ? JSON.parse(savedOrders) : INITIAL_ORDERS;

      const savedCoupons = localStorage.getItem('chilly_coupons');
      this.coupons = savedCoupons ? JSON.parse(savedCoupons) : DEFAULT_COUPONS;

      const savedRecently = localStorage.getItem('chilly_recently');
      this.recentlyViewed = savedRecently ? JSON.parse(savedRecently) : [];
      
      const savedActiveCoupon = localStorage.getItem('chilly_active_coupon');
      this.activeCoupon = savedActiveCoupon ? JSON.parse(savedActiveCoupon) : null;
    } catch (e) {
      console.error('Error loading store state from local storage', e);
      this.menuItems = MENU_ITEMS;
      this.orders = INITIAL_ORDERS;
      this.coupons = DEFAULT_COUPONS;
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('chilly_dark', String(this.isDark));
      localStorage.setItem('chilly_menu', JSON.stringify(this.menuItems));
      localStorage.setItem('chilly_cart', JSON.stringify(this.cart));
      localStorage.setItem('chilly_user', JSON.stringify(this.user));
      localStorage.setItem('chilly_orders', JSON.stringify(this.orders));
      localStorage.setItem('chilly_coupons', JSON.stringify(this.coupons));
      localStorage.setItem('chilly_recently', JSON.stringify(this.recentlyViewed));
      localStorage.setItem('chilly_active_coupon', JSON.stringify(this.activeCoupon));
    } catch (e) {
      console.error('Error saving store state to local storage', e);
    }
  }

  // Dark mode toggle
  public toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    this.notify();
  }

  // Cart operations
  public addToCart(item: MenuItem, qty: number = 1) {
    const existing = this.cart.find((c) => c.menuItem.id === item.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.cart.push({ menuItem: item, quantity: qty });
    }
    this.notify();
  }

  public removeFromCart(itemId: string) {
    this.cart = this.cart.filter((c) => c.menuItem.id !== itemId);
    this.notify();
  }

  public updateCartQty(itemId: string, quantity: number) {
    const item = this.cart.find((c) => c.menuItem.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.notify();
    }
  }

  public clearCart() {
    this.cart = [];
    this.activeCoupon = null;
    this.notify();
  }

  public applyCoupon(code: string): { success: boolean; message: string } {
    const coupon = this.coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }
    const subtotal = this.getCartSubtotal();
    if (subtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order of ₹${coupon.minOrder} required for this coupon` };
    }
    this.activeCoupon = coupon;
    this.notify();
    return { success: true, message: `Coupon applied! You saved ${coupon.discountPercent}%` };
  }

  public removeCoupon() {
    this.activeCoupon = null;
    this.notify();
  }

  // Cart Math
  public getCartSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  }

  public getCartDiscount(): number {
    if (!this.activeCoupon) return 0;
    const subtotal = this.getCartSubtotal();
    return Math.round((subtotal * this.activeCoupon.discountPercent) / 100);
  }

  public getCartTax(): number {
    const subtotal = this.getCartSubtotal();
    const discount = this.getCartDiscount();
    // 18% GST (CGST 9% + SGST 9%)
    return Math.round((subtotal - discount) * 0.18 * 100) / 100;
  }

  public getDeliveryFee(): number {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    // Free delivery above ₹400
    return subtotal > 400 ? 0 : 30;
  }

  public getCartTotal(): number {
    const subtotal = this.getCartSubtotal();
    const discount = this.getCartDiscount();
    const tax = this.getCartTax();
    const delivery = this.getDeliveryFee();
    return Math.round((subtotal - discount + tax + delivery) * 10) / 10;
  }

  // Wishlist/Favorites
  public toggleFavorite(itemId: string) {
    if (!this.user) {
      // Create guest user session
      this.user = { name: "Guest User", phone: "9999999999", addresses: [], wishlist: [] };
    }
    const index = this.user.wishlist.indexOf(itemId);
    if (index > -1) {
      this.user.wishlist.splice(index, 1);
    } else {
      this.user.wishlist.push(itemId);
    }
    this.notify();
  }

  // Recently Viewed
  public addToRecentlyViewed(itemId: string) {
    this.recentlyViewed = this.recentlyViewed.filter((id) => id !== itemId);
    this.recentlyViewed.unshift(itemId);
    if (this.recentlyViewed.length > 5) {
      this.recentlyViewed.pop();
    }
    this.notify();
  }

  // User Authentication Mock
  public login(phone: string, name: string = 'Premium Guest'): boolean {
    if (!phone || phone.length < 10) return false;
    this.user = {
      name,
      phone,
      addresses: this.user?.addresses || ['Srungarapuram, Bapatla'],
      wishlist: this.user?.wishlist || []
    };
    this.notify();
    return true;
  }

  public logout() {
    this.user = null;
    this.cart = [];
    this.activeCoupon = null;
    this.notify();
  }

  public saveAddress(address: string) {
    if (this.user) {
      if (!this.user.addresses.includes(address)) {
        this.user.addresses.push(address);
      }
      this.notify();
    }
  }

  // Order Operations
  public placeOrder(details: {
    name: string;
    phone: string;
    address: string;
    landmark?: string;
    instructions?: string;
    paymentMethod: 'COD' | 'UPI' | 'Card';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
  }): Order {
    const subtotal = this.getCartSubtotal();
    const discount = this.getCartDiscount();
    const tax = this.getCartTax();
    const deliveryFee = this.getDeliveryFee();
    const total = this.getCartTotal();

    const newOrder: Order = {
      id: `CH-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: this.user?.phone || 'guest',
      userName: details.name,
      userPhone: details.phone,
      items: [...this.cart],
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      status: 'Placed',
      createdAt: new Date().toISOString(),
      address: details.address,
      landmark: details.landmark,
      instructions: details.instructions,
      paymentMethod: details.paymentMethod,
      paymentStatus: details.paymentStatus
    };

    // Save user session details
    this.login(details.phone, details.name);
    this.saveAddress(details.address);

    // Save order
    this.orders.unshift(newOrder);
    this.clearCart();
    this.notify();

    // Start auto-progression stepper simulation (Placed -> Preparing -> Cooking -> Out for Delivery)
    // to give user an extremely dynamic order status updates in real-time
    this.simulateOrderStatusProgression(newOrder.id);

    return newOrder;
  }

  private simulateOrderStatusProgression(orderId: string) {
    const statuses: Order['status'][] = ['Placed', 'Preparing', 'Cooking', 'Out For Delivery'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      const order = this.orders.find((o) => o.id === orderId);
      if (!order || order.status === 'Delivered') {
        clearInterval(interval);
        return;
      }
      
      if (currentIndex < statuses.length - 1) {
        currentIndex++;
        order.status = statuses[currentIndex];
        this.notify();
      } else {
        clearInterval(interval);
      }
    }, 45000); // Progress every 45 seconds for demonstration
  }

  // Admin Actions
  public updateOrderStatus(orderId: string, status: Order['status']) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      if (status === 'Delivered') {
        order.paymentStatus = 'Paid';
      }
      this.notify();
    }
  }

  // Menu Management
  public adminAddMenuItem(item: Omit<MenuItem, 'id' | 'rating' | 'ratingCount'>) {
    const newId = String(this.menuItems.length + 100);
    const newItem: MenuItem = {
      ...item,
      id: newId,
      rating: 5.0,
      ratingCount: 1
    };
    this.menuItems.push(newItem);
    this.notify();
  }

  public adminUpdateMenuItem(updatedItem: MenuItem) {
    const index = this.menuItems.findIndex((item) => item.id === updatedItem.id);
    if (index > -1) {
      this.menuItems[index] = updatedItem;
      this.notify();
    }
  }

  public adminDeleteMenuItem(itemId: string) {
    this.menuItems = this.menuItems.filter((item) => item.id !== itemId);
    this.notify();
  }

  // Coupon Management
  public adminAddCoupon(coupon: Coupon) {
    this.coupons.push(coupon);
    this.notify();
  }

  public adminDeleteCoupon(code: string) {
    this.coupons = this.coupons.filter((c) => c.code !== code);
    this.notify();
  }

  // AI & Personalized Recommendations logic
  public getAIRecommendations(): MenuItem[] {
    // Return items from categories user ordered/viewed or popular items
    const viewedIds = this.recentlyViewed;
    const viewedItems = this.menuItems.filter((m) => viewedIds.includes(m.id));
    const categoriesOfIntrest = viewedItems.map((m) => m.category);

    let recommendations = this.menuItems.filter(
      (m) => categoriesOfIntrest.includes(m.category) && !viewedIds.includes(m.id)
    );

    if (recommendations.length < 4) {
      // Fallback to popular trending items
      const populars = this.menuItems.filter((m) => m.isPopular || m.isTrending);
      recommendations = [...recommendations, ...populars];
    }

    // Filter duplicates and slice
    const uniqueRecs = Array.from(new Set(recommendations));
    return uniqueRecs.slice(0, 4);
  }
}

export const store = new ChilliStore();
export default store;
