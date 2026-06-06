import React from 'react';
import { ShieldCheck, CreditCard, Wallet, Landmark, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onSuccess: (method: 'COD' | 'UPI' | 'Card') => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onSuccess, onClose }) => {
  const [method, setMethod] = React.useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [processing, setProcessing] = React.useState(false);
  const [upiId, setUpiId] = React.useState('');
  const [cardNo, setCardNo] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvv, setCardCvv] = React.useState('');
  const [error, setError] = React.useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (method === 'UPI' && !upiId.includes('@')) {
      setError('Please enter a valid UPI ID (e.g. name@okhdfcbank)');
      return;
    }

    if (method === 'Card') {
      if (cardNo.replace(/\s/g, '').length < 16) {
        setError('Card Number must be 16 digits');
        return;
      }
      if (!cardExpiry.includes('/')) {
        setError('Card Expiry must be in MM/YY format');
        return;
      }
      if (cardCvv.length < 3) {
        setError('CVV must be 3 digits');
        return;
      }
    }

    setProcessing(true);

    // Simulate Razorpay Gateway transaction delay
    setTimeout(() => {
      setProcessing(false);
      onSuccess(method);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4 select-none">
      <div className="bg-white dark:bg-gray-950 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 animate-slide-up">
        {/* Razorpay Premium Header */}
        <div className="bg-[#002D62] text-white p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                Razorpay Checkout
              </span>
              <h3 className="font-serif font-bold text-xl mt-1">
                Chilli's Family Restaurant
              </h3>
              <p className="text-xs text-blue-200 mt-1">
                Srungarapuram, Bapatla, AP
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-blue-200 font-semibold block uppercase">
                Amount to Pay
              </span>
              <span className="text-2xl font-black font-sans">
                ₹{amount}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-200 hover:text-white text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay} className="p-6 flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 text-red-500 text-xs p-3 rounded-xl border border-red-200 dark:border-red-900/30 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Payment Mode Toggles */}
          <div className="flex gap-2 bg-gray-50 dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-white/5">
            {[
              { id: 'UPI', label: 'UPI / Scan', icon: Wallet },
              { id: 'Card', label: 'Card', icon: CreditCard },
              { id: 'COD', label: 'COD', icon: Landmark }
            ].map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => {
                    setMethod(opt.id as any);
                    setError('');
                  }}
                  className={`flex-1 flex flex-col items-center gap-1 py-3.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    method === opt.id
                      ? 'bg-white dark:bg-gray-800 text-[#002D62] dark:text-brand-yellow shadow-md'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic input panels depending on select option */}
          <div className="min-h-[140px] flex flex-col justify-center">
            {method === 'UPI' && (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">
                  Enter UPI ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. mobileNumber@ybl"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-[#002D62] dark:focus:border-brand-yellow font-medium"
                />
                <span className="text-[10px] text-gray-400 leading-normal">
                  Common handles: @okhdfcbank, @okaxis, @ybl, @paytm, @postbank. Supports GPay, PhonePe, Paytm, BHIM.
                </span>
              </div>
            )}

            {method === 'Card' && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Card Number
                  </label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    value={cardNo}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setCardNo(val);
                    }}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-[#002D62] dark:focus:border-brand-yellow font-sans font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-[#002D62] dark:focus:border-brand-yellow font-sans font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-[#002D62] dark:focus:border-brand-yellow font-sans font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === 'COD' && (
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col items-center">
                <CheckCircle className="text-green-500 mb-2" size={36} />
                <h4 className="font-serif font-bold text-md text-gray-800 dark:text-white">
                  Cash On Delivery Selected
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 max-w-xs leading-normal">
                  Pay the delivery agent in cash or scanning their UPI code once the hot fresh food is delivered to your address.
                </p>
              </div>
            )}
          </div>

          {/* Secure details footer */}
          <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-100 dark:border-white/5 pt-4">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-green-500" /> Secure 256-bit SSL encryption
            </span>
            <span className="font-bold">PCI-DSS Compliant</span>
          </div>

          {/* Action Pay Button */}
          <button
            type="submit"
            disabled={processing}
            className="w-full py-4 bg-[#002D62] hover:bg-[#002147] dark:bg-brand-red dark:hover:bg-brand-red/90 text-white rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all active:scale-95"
          >
            {processing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <span>
                {method === 'COD' ? 'Confirm Delivery Order' : `Pay Securely ₹${amount}`}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PaymentModal;
