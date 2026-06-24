import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const { priceId } = await req.json(); 
    const origin = req.headers.get('origin');


    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        priceId: priceId,
        userId: user.id,
        userEmail: user.email,
      },
      mode: "subscription",
      success_url: `${origin}/dashboard/buyer/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/buyer/subscription`,
    });

   
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
    
  } catch (err) {
    console.error("Stripe Error:", err); // 
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}