import { NextRequest, NextResponse } from 'next/server';
import { PayOS } from '@payos/node';

const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID || 'client-id',
  apiKey: process.env.PAYOS_API_KEY || 'api-key',
  checksumKey: process.env.PAYOS_CHECKSUM_KEY || 'checksum-key'
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderCode, amount, description, items, cancelUrl, returnUrl } = body;

    const requestData = {
      orderCode,
      amount,
      description,
      items,
      cancelUrl,
      returnUrl,
    };

    const paymentLink = await payos.paymentRequests.create(requestData);

    return NextResponse.json({
      success: true,
      checkoutUrl: paymentLink.checkoutUrl
    });
  } catch (error: any) {
    console.error('PayOS Create Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi tạo thanh toán PayOS' },
      { status: 500 }
    );
  }
}
