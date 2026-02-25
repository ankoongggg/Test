import { db } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import emailjs from 'emailjs-com';
import { CartItem } from '../types';

export interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  items: CartItem[];
  total: number;
  shippingFee: number;
  finalTotal: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

// Initialize EmailJS - thay thế YOUR_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_traocha";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_traocha_order";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY";

emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Submit order to Firestore and send email notification
 */
export async function submitOrder(
  name: string,
  phone: string,
  address: string,
  note: string,
  items: CartItem[],
  total: number,
  shippingFee: number,
  finalTotal: number,
  ownerEmail: string // Email to send order notification to
): Promise<string> {
  try {
    // Add order to Firestore
    const docRef = await addDoc(collection(db, 'orders'), {
      name,
      phone,
      address,
      note,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || 'M',
        image: item.image
      })),
      total,
      shippingFee,
      finalTotal,
      status: 'pending',
      createdAt: new Date(),
    });

    // Send email to owner
    try {
      const itemsText = items
        .map(item => `${item.name} (${item.size || 'M'}) x${item.quantity} - ${(item.sizes?.[item.size as 'M' | 'L'] || item.price) * item.quantity}đ`)
        .join('\n');

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: ownerEmail,
        from_name: name,
        phone_number: phone,
        address: address,
        note: note || '(không có ghi chú)',
        items: itemsText,
        subtotal: total.toLocaleString('vi-VN'),
        shipping_fee: shippingFee.toLocaleString('vi-VN'),
        total_price: finalTotal.toLocaleString('vi-VN'),
        order_date: new Date().toLocaleString('vi-VN'),
        order_id: docRef.id
      });
    } catch (emailError) {
      console.warn('Email notification failed, but order was saved:', emailError);
    }

    return docRef.id;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw new Error('Lỗi khi đặt hàng. Vui lòng thử lại.');
  }
}

/**
 * Get all orders for a specific customer phone number
 */
export async function getOrdersByPhone(phone: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, 'orders'),
      where('phone', '==', phone),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        name: data.name,
        phone: data.phone,
        address: data.address,
        note: data.note,
        items: data.items,
        total: data.total,
        shippingFee: data.shippingFee,
        finalTotal: data.finalTotal,
        status: data.status,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
      });
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

/**
 * Get all orders (admin view) - in real app, should be protected
 */
export async function getAllOrders(): Promise<Order[]> {
  try {
    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        name: data.name,
        phone: data.phone,
        address: data.address,
        note: data.note,
        items: data.items,
        total: data.total,
        shippingFee: data.shippingFee,
        finalTotal: data.finalTotal,
        status: data.status,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
      });
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
