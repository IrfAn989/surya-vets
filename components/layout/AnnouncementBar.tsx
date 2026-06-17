'use client';

import { useState, useEffect } from 'react';
import { Truck, Tag, Phone } from 'lucide-react';

const messages = [
  { icon: Truck, text: 'Free delivery on orders above ₹499 in selected locations' },
  { icon: Tag, text: 'Up to 30% OFF on vet-approved supplements — limited time!' },
  { icon: Phone, text: 'Need help? WhatsApp us for expert pet care advice' },
];

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { icon: Icon, text } = messages[idx];

  return (
    <div className="bg-primary text-white">
      <div className="container flex items-center justify-center gap-2 py-2">
        <span
          className="flex items-center gap-1.5 text-xs font-medium md:text-[13px] transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <Icon className="h-3.5 w-3.5 flex-shrink-0 opacity-90" />
          {text}
        </span>
      </div>
    </div>
  );
}
