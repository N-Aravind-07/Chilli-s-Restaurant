import React from 'react';
import { X, Plus, Minus, Trash2, Tag, Percent, ArrowRight, Clipboard } from 'lucide-react';
import { store, CartItem } from '../services/store';
import { PaymentModal } from './PaymentModal';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const [cartState, setCartState] = React.useState({
    cart: store.cart,
    subtotal: store.getCartSubtotal(),
    discount: store.getCartDiscount(),
    tax: store.getCartTax(),
    delivery: store.getDeliveryFee(),
    total: store.getCartTotal(),
    activeCoupon: store.activeCoupon
  });

  // Checkout inputs
  const [name, setName] = React.useState(store.user?.name || '');
  const [phone, setPhone] = React.useState(store.user?.phone || '');
  const [address, setAddress] = React.useState(store.user?.addresses[0] || '');
  const [landmark, setLandmark] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [couponCode, setCouponCode] = React.useState('');
  const [couponFeedback, setCouponFeedback] = React.useState({ type: '', text: '' });
  
  const [showPayment, setShowPayment] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCartState({
        cart: [...store.cart],
        subtotal: store.getCartSubtotal(),
        discount: store.getCartDiscount(),
        tax: store.getCartTax(),
        delivery: store.getDeliveryFee(),
        total: store.getCartTotal(),
        activeCoupon: store.activeCoupon
      });
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponFeedback({ type: '', text: '' });
    if (!couponCode) return;

    const res = store.applyCoupon(couponCode);
    if (res.success) {
      setCouponFeedback({ type: 'success', text: res.message });
      setCouponCode('');
    } else {
      setCouponFeedback({ type: 'error', text: res.message });
    }
  };

  const handleRemoveCoupon = () => {
    store.removeCoupon();
    setCouponFeedback({ type: '', text: '' });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');

    if (!name.trim()) {
      setCheckoutError('Please enter your name.');
      return;
    }
    if (phone.length < 10 || !/^\d+$/.test(phone)) {
      setCheckoutError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!address.trim()) {
      setCheckoutError('Please enter your delivery address.');
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentMethod: 'COD' | 'UPI' | 'Card') => {
    setShowPayment(false);

    // Call store place order
    const order = store.placeOrder({
      name,
      phone,
      address,
      landmark,
      instructions,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
    });

    // Celebratory Confetti Blast!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B30000', '#FFD700', '#4B1D6B', '#FFFFFF']
    });

    onClose();
    onOrderSuccess(order.id);
  };

  return (
    <>
      {/* Dark Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm select-none"
        onClick={onClose}
      />

      {/* Cart Drawer Slide-out container */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col justify-between select-none animate-slide-in-right">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-black/20">
          <div className="flex flex-col">
            <span className="font-serif font-black text-lg text-gray-900 dark:text-white">
              Your Food Cart
            </span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">
              Chilli's Family Restaurant
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-150 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
          {cartState.cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <span className="text-5xl mb-4">🛒</span>
              <h4 className="font-serif font-bold text-lg text-gray-800 dark:text-white">
                Cart is Empty
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 max-w-xs leading-relaxed">
                Add some tasty biryani, tandoori tikka, or starters from the menu to satisfy your hunger!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-brand-red text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-brand-red/90"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item Lists */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">
                  Items Selected ({cartState.cart.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
                {cartState.cart.map((item) => (
                  <div 
                    key={item.menuItem.id}
                    className="flex justify-between items-center gap-3 bg-gray-50/50 dark:bg-black/10 p-3 rounded-xl border border-gray-100 dark:border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name} 
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-gray-800 dark:text-white line-clamp-1 max-w-[180px]">
                          {item.menuItem.name}
                        </h4>
                        <span className="text-xs text-gray-400 font-semibold font-sans mt-0.5 block">
                          ₹{item.menuItem.price} × {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden shadow-sm">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              store.removeFromCart(item.menuItem.id);
                            } else {
                              store.updateCartQty(item.menuItem.id, item.quantity - 1);
                            }
                          }}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 font-bold text-xs text-gray-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => store.updateCartQty(item.menuItem.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove Trash */}
                      <button
                        onClick={() => store.removeFromCart(item.menuItem.id)}
                        className="p-2 text-gray-400 hover:text-brand-red dark:hover:text-brand-red cursor-pointer transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon code application */}
              <div className="space-y-3 bg-brand-yellow/5 dark:bg-brand-yellow/[0.02] p-4 rounded-2xl border border-brand-yellow/20">
                <div className="flex items-center gap-1 text-brand-purple dark:text-brand-yellow font-serif font-bold text-sm">
                  <Tag size={16} />
                  <span>Apply Promo Code</span>
                </div>
                
                {cartState.activeCoupon ? (
                  <div className="flex justify-between items-center bg-white dark:bg-gray-950 p-3 rounded-xl border border-brand-yellow/30 shadow-sm animate-pulse-slow">
                    <div className="flex items-center gap-2">
                      <Percent className="text-brand-red" size={16} />
                      <div>
                        <span className="font-bold text-xs text-brand-red uppercase tracking-wider block">
                          {cartState.activeCoupon.code} Applied
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 block mt-0.5">
                          {cartState.activeCoupon.description}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs font-bold text-brand-purple dark:text-brand-yellow hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. CHILLI10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold focus:outline-none focus:border-brand-red"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-brand-purple hover:bg-brand-purple/95 text-brand-yellow font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Available coupons help */}
                {!cartState.activeCoupon && (
                  <div className="flex flex-col gap-1 mt-2 text-[10px] text-gray-500">
                    <span>Try coupon: <span className="font-black text-brand-purple dark:text-brand-yellow">CHILLI10</span> (10% off above ₹300)</span>
                    <span>Try coupon: <span className="font-black text-brand-purple dark:text-brand-yellow">WELCOME20</span> (20% off above ₹500)</span>
                  </div>
                )}

                {couponFeedback.text && (
                  <span className={`text-[10px] font-bold block mt-1.5 ${
                    couponFeedback.type === 'success' ? 'text-green-500' : 'text-brand-red'
                  }`}>
                    {couponFeedback.text}
                  </span>
                )}
              </div>

              {/* Delivery Details Form */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">
                  Delivery Details
                </h3>
                
                {checkoutError && (
                  <span className="text-xs font-bold text-brand-red block">
                    {checkoutError}
                  </span>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Praveen Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      required
                      className="bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Complete Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Room/Flat No, Block, Hostel, Street Name, Srungarapuram/Bapatla"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-red resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opposite Agriculture College Gate"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring bell, Leave at gate, Call before arrival"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartState.cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 dark:border-white/5 space-y-4 bg-gray-50/50 dark:bg-black/20 shadow-[0_-8px_30px_rgba(0,0,0,0.03)]">
            {/* Calculation Sheet */}
            <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">₹{cartState.subtotal}</span>
              </div>
              
              {cartState.discount > 0 && (
                <div className="flex justify-between text-brand-red font-semibold">
                  <span>Coupon Savings</span>
                  <span>- ₹{cartState.discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST Tax (18%)</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">₹{cartState.tax}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                {cartState.delivery === 0 ? (
                  <span className="font-bold text-green-500 uppercase text-[10px]">Free Delivery</span>
                ) : (
                  <span className="font-bold text-gray-700 dark:text-gray-300">₹{cartState.delivery}</span>
                )}
              </div>
              
              {cartState.delivery > 0 && (
                <span className="text-[9px] text-brand-red uppercase font-semibold block text-right mt-0.5">
                  Add ₹{400 - cartState.subtotal} more for Free Delivery
                </span>
              )}

              <div className="flex justify-between text-sm text-gray-950 dark:text-white font-serif font-black border-t border-gray-200 dark:border-white/10 pt-2 mt-2">
                <span>Grand Total</span>
                <span className="text-base font-black font-sans text-brand-red dark:text-brand-yellow">
                  ₹{cartState.total}
                </span>
              </div>
            </div>

            {/* Action Submit */}
            <button
              onClick={handleCheckoutSubmit}
              className="w-full py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-brand-red/10"
            >
              <span>Securely Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Razorpay Simulated Gateway Modal Overlay */}
      {showPayment && (
        <PaymentModal
          amount={cartState.total}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </>
  );
};
export default CartDrawer;
