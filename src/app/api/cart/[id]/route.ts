import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { updateCartTotalAmount } from "@/lib/updateCartTotalAmount";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id  = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) NextResponse.json({ error: 'Cart token not found' });

    const cartItem = await prisma.cartItem.findFirst({ where: {id: Number(id)} });

    if (!cartItem) NextResponse.json({ error: 'Cart item not found' });

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity }
    });
    
    return NextResponse.json(await updateCartTotalAmount(token));
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 })
  }
};

export async function DELETE(req: NextRequest, { params }: { params: {id: string} }) {
  try {
    const id  = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) NextResponse.json({ error: 'Cart token not found' });

    const cartItem = await prisma.cartItem.findFirst({ where: {id: Number(id)} });

    if (!cartItem) NextResponse.json({ error: 'Cart item not found' });

    await prisma.cartItem.delete({
      where: { id: Number(params.id) }
    });

    return NextResponse.json(await updateCartTotalAmount(token));
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 })
  }
}