import React from 'react';
import { Check, ClipboardList, Flame, CookingPot, Truck, Home, MapPin, PhoneCall } from 'lucide-react';
import { store, Order } from '../services/store';

interface OrderTrackerProps {
  orderId: string;
  onBackToHome: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orderId, onBackToHome }) => {
  const [order, setOrder] = React.useState<Order | undefined>(
    store.orders.find((o) => o.id === orderId)
  );

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setOrder(store.orders.find((o) => o.id === orderId));
    });
    return unsubscribe;
  }, [orderId]);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center select-none">
        <h3 className="font-serif font-bold text-xl text-brand-red">Order Not Found</h3>
        <p className="text-xs text-gray-500 mt-2">Could not retrieve order details for ID {orderId}.</p>
        <button
          onClick={onBackToHome}
          className="mt-6 px-5 py-2.5 bg-brand-purple text-brand-yellow font-bold text-xs rounded-xl cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  // Stepper Configurations
  const steps = [
    { id: 'Placed', label: 'Order Placed', desc: 'We have received your order request.', icon: ClipboardList },
    { id: 'Preparing', label: 'Kitchen Prep', desc: 'Preparing fresh, high-quality ingredients.', icon: Flame },
    { id: 'Cooking', label: 'Cooking Hot', desc: 'Cooking your food with care in dum ovens.', icon: CookingPot },
    { id: 'Out For Delivery', label: 'Out for Delivery', desc: 'Our delivery agent is heading to Bapatla.', icon: Truck },
    { id: 'Delivered', label: 'Delivered', desc: 'Enjoy your hot fresh meal. Good Taste!', icon: Home }
  ] as const;

  const currentStatusIndex = steps.findIndex((step) => step.id === order.status);

  return (
    <section className="py-12 bg-gray-50/50 dark:bg-black/10 select-none min-h-[85vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red dark:text-brand-yellow">
            Real-time Order Status
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Tracking Your Feast
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
            Order ID: <span className="font-bold text-gray-800 dark:text-gray-200">{order.id}</span> • Placed {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Real-time Stepper Card */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 mb-8 shadow-premium">
          <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">
            
            {/* Connecting Progress Line (Hidden on mobile) */}
            <div className="absolute top-7 left-10 right-10 h-1 bg-gray-100 dark:bg-gray-800 hidden md:block -z-10 rounded-full">
              <div 
                className="h-full bg-brand-red dark:bg-brand-yellow transition-all duration-500 rounded-full"
                style={{ width: `${(currentStatusIndex / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps iterator */}
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStatusIndex;
              const isActive = index === currentStatusIndex;

              return (
                <div 
                  key={step.id} 
                  className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center md:flex-1 relative"
                >
                  {/* Outer ring */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/25 dark:bg-brand-yellow dark:border-brand-yellow dark:text-brand-purple'
                      : 'bg-white border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-600'
                  } ${isActive ? 'scale-110 ring-4 ring-brand-red/10 dark:ring-brand-yellow/10 animate-pulse-slow' : ''}`}>
                    {isCompleted && index < currentStatusIndex ? (
                      <Check size={20} strokeWidth={3} />
                    ) : (
                      <StepIcon size={22} className={isActive ? 'animate-bounce' : ''} />
                    )}
                  </div>

                  <div>
                    <h4 className={`font-serif font-black text-sm transition-colors duration-250 ${
                      isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      {step.label}
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 max-w-[140px] md:mx-auto leading-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details and delivery agents cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Order Bill Summary */}
          <div className="glass p-6 rounded-3xl border border-gray-100 dark:border-white/5 space-y-4">
            <h3 className="font-serif font-bold text-md text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">
              Order Details Summary
            </h3>
            
            <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {order.items.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                  <span>{item.menuItem.name} <span className="font-bold">× {item.quantity}</span></span>
                  <span className="font-medium">₹{item.menuItem.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-white/5 pt-3 text-xs space-y-1.5 text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-brand-red">
                  <span>Promo Discount</span>
                  <span>- ₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST Tax (18%)</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>{order.deliveryFee === 0 ? 'Free' : `₹${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-900 dark:text-white font-black border-t border-gray-100 dark:border-white/5 pt-2">
                <span>Grand Total Paid ({order.paymentMethod})</span>
                <span className="text-brand-red dark:text-brand-yellow font-sans">₹{order.total}</span>
              </div>
            </div>
             {/* Delivery Metadata details */}
          <div className="bg-brand-purple text-white p-6 rounded-3xl border border-white/5 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-md text-brand-yellow border-b border-white/10 pb-2">
              Delivery Information
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex gap-2.5">
                <MapPin size={16} className="text-brand-yellow shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Address</span>
                  <p className="text-gray-200 leading-normal mt-0.5">{order.address}</p>
                  {order.landmark && (
                    <span className="text-[10px] text-brand-yellow font-medium mt-0.5 block">
                      Landmark: {order.landmark}
                    </span>
                  )}
                </div>
              </div>

              {order.instructions && (
                <div className="bg-black/25 p-2.5 rounded-xl border border-white/5 text-[11px] text-gray-200 leading-normal">
                  <span className="font-bold text-white block mb-0.5">Delivery Instructions:</span>
                  "{order.instructions}"
                </div>
              )}

              {/* Simulated Delivery Agent Card on Out For Delivery status */}
              {order.status === 'Out For Delivery' && (
                <div className="flex items-center gap-3 bg-brand-yellow/10 p-3 rounded-2xl border border-brand-yellow/30 animate-pulse-slow">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-sm font-bold text-brand-purple">
                    SA
                  </div>
                  <div className="flex-1">
                    <span className="font-bold block text-gray-800 dark:text-gray-200 text-xs">Siva Prasad</span>
                    <span className="text-[10px] text-gray-505">Your Delivery Executive</span>
                  </div>
                  <a 
                    href="tel:8500857676" 
                    className="p-2 bg-brand-red text-white rounded-full hover:bg-brand-red/90 transition-colors"
                  >
                    <PhoneCall size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>         </div>
        </div>

        {/* Action Home Redirect */}
        <div className="text-center mt-10">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-brand-purple hover:bg-brand-purple/95 text-brand-yellow font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            Go Back to Homepage
          </button>
        </div>

      </div>
    </section>
  );
};
export default OrderTracker;
