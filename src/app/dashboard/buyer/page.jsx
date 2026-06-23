import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OverviewChart from "@/components/OverviewChart";

async function getUserData() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  const userCollection = db.collection("user");
  return await userCollection.findOne({ _id: new ObjectId(session.user.id) });
}

export default async function BuyerDashboard() {
  const user = await getUserData();
  if (!user) return redirect("/login");


  const transactions = db.collection("transactions");
  const recentPurchases = await transactions
    .find({ buyerId: user._id.toString() })
    .sort({ date: -1 })
    .limit(3)
    .toArray();

  const chartData = [
    { name: 'Mon', value: 1 },
    { name: 'Tue', value: 3 },
    { name: 'Wed', value: 2 },
    { name: 'Thu', value: 5 },
  ];

  return (
    <main className="min-h-screen bg-[#0b0e17] p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome back, {user.name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0f131f] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-gray-400 text-sm">Active Plan</h2>
            <p className="text-2xl font-bold text-pink-500 uppercase">{user.subscriptionTier || 'Free'}</p>
          </div>
          <div className="bg-[#0f131f] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-gray-400 text-sm">Purchase Limit</h2>
            <p className="text-2xl font-bold">{user.subscriptionTier === 'pro' ? '9' : '3'} Artworks</p>
          </div>
          <div className="bg-[#0f131f] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-gray-400 text-sm">Account Status</h2>
            <p className="text-2xl font-bold text-green-500">Active</p>
          </div>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OverviewChart data={chartData} />
          </div>

          <div className="bg-[#0f131f] p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 mb-4">Recent Purchases</h3>
            <ul className="space-y-3">
              {recentPurchases.length > 0 ? (
                recentPurchases.map((item) => (
                  <li key={item._id} className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="truncate mr-2">{item.title}</span>
                    <span className="text-pink-500 font-bold">${item.amount}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-600 text-sm italic">No recent purchases found.</p>
              )}
            </ul>
            <button className="mt-6 w-full p-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg">
              View All
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}