import { stripe } from "@/lib/stripe";
import { redirect } from 'next/navigation';
import { subscription } from '@/lib/action/payment';
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error('Invalid session');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (session.status === 'open') return redirect('/');

  if (session.status === 'complete') {
    try {
      await subscription({
        ...session.metadata,
        sessionId: session_id
      });
    } catch (err) {
      console.error("Database update failed:", err);
    }

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0b0e17] px-4 py-8">
      
        <div className="max-w-lg w-full bg-[#0f131f] border border-gray-800 p-6 sm:p-10 rounded-3xl shadow-2xl text-center">
          
          <div className="mx-auto flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/10 mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white">Payment Successful!</h1>
          
          <p className="text-sm sm:text-base text-gray-400 mt-4 mb-8 leading-relaxed">
            Thank you for upgrading your plan. A confirmation email has been sent to 
            <span className="block text-white font-semibold mt-2 break-words">{session.customer_details.email}</span>
          </p>

          <Link href="/dashboard/buyer" className="block">
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 sm:px-6 rounded-xl transition-all">
              Go to Dashboar
            </button>
          </Link>
        </div>
      </main>
    );
  }
}