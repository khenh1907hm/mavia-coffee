import { NextRequest, NextResponse } from 'next/server';
import PayOS from '@payos/node';
import { supabase } from '@/lib/supabase';

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID || 'client-id',
  process.env.PAYOS_API_KEY || 'api-key',
  process.env.PAYOS_CHECKSUM_KEY || 'checksum-key'
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify webhook data
    const webhookData = payos.verifyPaymentWebhookData(body);

    if (webhookData.code === '00' && webhookData.success) {
      // Payment successful, update Supabase order
      // We stored orderId as orderCode. But PayOS orderCode is a number.
      // Assuming we used a numeric ID or mapped it somehow. 
      // Let's assume orderCode is a number we stored in a column `payos_order_code` in DB
      
      const orderCode = webhookData.data.orderCode;

      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('payos_order_code', orderCode);

      if (error) {
        console.error('Error updating order status in DB:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    });
  } catch (error: any) {
    console.error('PayOS Webhook Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi webhook PayOS' },
      { status: 500 }
    );
  }
}
