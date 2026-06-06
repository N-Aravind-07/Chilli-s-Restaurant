import React from 'react';
import { MapPin, Phone, Clock, Truck, ShieldCheck } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Find Us & Contact Details
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto my-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            Dine-in with us in Srungarapuram, Bapatla, or call for home delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detailed Info Cards (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Location Address card */}
            <div className="glass p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-4">
              <div className="p-3 bg-brand-red/10 dark:bg-brand-red/20 text-brand-red dark:text-brand-yellow rounded-xl self-start">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-800 dark:text-white">
                  Restaurant Location
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  WF3C+WJ3, GBC Road, Srungarapuram, Bapatla, Andhra Pradesh 522101
                </p>
                <span className="inline-block mt-2 text-[10px] bg-brand-purple/20 text-brand-red dark:text-brand-yellow px-2 py-0.5 rounded font-semibold border border-brand-red/10">
                  GSTIN: 37ANRPK6273H1ZV
                </span>
              </div>
            </div>

            {/* Operating Times card */}
            <div className="glass p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-4">
              <div className="p-3 bg-brand-red/10 dark:bg-brand-red/20 text-brand-red dark:text-brand-yellow rounded-xl self-start">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-800 dark:text-white">
                  Working Hours
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  Everyday: 11:00 AM – 09:45 PM
                </p>
                <span className="text-[10px] text-green-500 font-semibold flex items-center gap-1 mt-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  Now Open for Dine-in & Delivery
                </span>
              </div>
            </div>

            {/* Phone Call card */}
            <div className="glass p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-4">
              <div className="p-3 bg-brand-red/10 dark:bg-brand-red/20 text-brand-red dark:text-brand-yellow rounded-xl self-start">
                <Phone size={22} />
              </div>
              <div className="w-full">
                <h3 className="font-serif font-bold text-lg text-gray-800 dark:text-white">
                  Helpline Contacts
                </h3>
                <div className="flex flex-col gap-1 mt-1">
                  <a 
                    href="tel:08643225544" 
                    className="text-xs md:text-sm text-gray-600 hover:text-brand-red dark:text-gray-300 dark:hover:text-brand-yellow font-bold font-sans transition-colors"
                  >
                    08643-225544 (Landline)
                  </a>
                  <a 
                    href="tel:8500857676" 
                    className="text-xs md:text-sm text-gray-600 hover:text-brand-red dark:text-gray-300 dark:hover:text-brand-yellow font-bold font-sans transition-colors"
                  >
                    +91 8500857676 (Mobile & WhatsApp)
                  </a>
                </div>
                <div className="flex gap-2 mt-4">
                  <a 
                    href="tel:8500857676"
                    className="flex-1 text-center py-2 bg-brand-red text-white font-bold text-xs rounded-xl hover:bg-brand-red/90 transition-all duration-200 active:scale-95"
                  >
                    Call Manager
                  </a>
                  <a 
                    href="https://wa.me/918500857676" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 text-center py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-all duration-200 active:scale-95"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Delivery limits card */}
            <div className="glass p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-4">
              <div className="p-3 bg-brand-red/10 dark:bg-brand-red/20 text-brand-red dark:text-brand-yellow rounded-xl self-start">
                <Truck size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-md text-gray-800 dark:text-white">
                  Delivery Coverage
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                  Bapatla Town, Agricultural College Hostel Campus, Bapatla Bypass road, Karlapalem route. Free delivery on orders above ₹400.
                </p>
              </div>
            </div>
          </div>

          {/* Map display area (7 columns) */}
          <div className="lg:col-span-7 h-[450px] w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-premium">
            <iframe
              title="Chilli's Family Restaurant Map"
              src="https://maps.google.com/maps?q=Chilli's%20Family%20Restaurant,%20Srungarapuram,%20Bapatla,%20Andhra%20Pradesh%20522101&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale dark:invert-[0.9] dark:hue-rotate-[180deg] transition-all duration-300"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
export default LocationSection;
