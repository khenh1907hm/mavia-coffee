import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Handle GET request: Fetch a single product by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Handle PUT request: Update an existing product in Supabase
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from('products')
      .update(body)
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Handle DELETE request: Remove a product from Supabase
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
