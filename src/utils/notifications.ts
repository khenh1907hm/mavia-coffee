/**
 * Utility to send notifications via Zalo (using Zapi.vn or similar API)
 */

export const sendZaloOrderNotification = async (order: any, items: any[]) => {
  const token = process.env.NEXT_PUBLIC_ZALO_API_TOKEN;
  const instanceId = process.env.NEXT_PUBLIC_ZALO_INSTANCE_ID;
  const receiverPhone = process.env.NEXT_PUBLIC_ZALO_RECEIVER_PHONE;

  if (!token || !instanceId || !receiverPhone) {
    console.warn('Zalo credentials missing. Notification not sent.');
    return;
  }

  const formattedTotal = new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(order.total_amount);

  const itemsList = items.map(i => `• ${i.product_name} (${i.quantity}x ${i.weight})`).join('\n');

  const message = `🔔 *CÓ ĐƠN HÀNG MỚI!*
━━━━━━━━━━━━━━━
👤 *Khách hàng:* ${order.customer_name}
📞 *SĐT:* ${order.customer_phone}
📍 *Địa chỉ:* ${order.customer_address}
💰 *Tổng cộng:* ${formattedTotal}
💳 *Thanh toán:* ${order.payment_method === 'vietqr' ? 'Chuyển khoản' : 'COD'}
📝 *Ghi chú:* ${order.note || 'Không có'}
━━━━━━━━━━━━━━━
🛒 *Sản phẩm:*
${itemsList}
━━━━━━━━━━━━━━━
📅 *Thời gian:* ${new Date().toLocaleString('vi-VN')}`;

  try {
    const response = await fetch('https://api.zapi.vn/v1/messages/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        instance_id: instanceId,
        to: receiverPhone,
        message: message
      })
    });

    const result = await response.json();
    console.log('Zalo notification result:', result);
    return result;
  } catch (error) {
    console.error('Error sending Zalo notification:', error);
  }
};

export const sendZaloContactNotification = async (contact: any) => {
  const token = process.env.NEXT_PUBLIC_ZALO_API_TOKEN;
  const instanceId = process.env.NEXT_PUBLIC_ZALO_INSTANCE_ID;
  const receiverPhone = process.env.NEXT_PUBLIC_ZALO_RECEIVER_PHONE;

  if (!token || !instanceId || !receiverPhone) return;

  const message = `✉️ *CÓ TIN NHẮN LIÊN HỆ MỚI!*
━━━━━━━━━━━━━━━
👤 *Khách hàng:* ${contact.name}
📧 *Email:* ${contact.email}
📞 *SĐT:* ${contact.phone}
📌 *Chủ đề:* ${contact.subject}
💬 *Nội dung:* ${contact.message}
━━━━━━━━━━━━━━━
📅 *Thời gian:* ${new Date().toLocaleString('vi-VN')}`;

  try {
    await fetch('https://api.zapi.vn/v1/messages/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        instance_id: instanceId,
        to: receiverPhone,
        message: message
      })
    });
  } catch (error) {
    console.error('Error sending Zalo contact notification:', error);
  }
};
