import {
Users,
Palette,
ShoppingBag,
DollarSign,
} from "lucide-react";

export default function OverviewCards({
analytics,
}) {
const cards = [
{
title: "Total Users",
value: analytics.totalUsers || 0,
icon: Users,
},
{
title: "Total Artists",
value: analytics.totalArtists || 0,
icon: Palette,
},
// {
// title: "Artworks Sold",
// value: analytics.soldArtworks || 0,
// icon: ShoppingBag,
// },
{
title: "Total Revenue",
value: `$${analytics.totalRevenue || 0}`,
icon: DollarSign,
},
];

return ( <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


  {cards.map((card) => {
    const Icon = card.icon;

    return (
      <div
        key={card.title}
        className="bg-[#09122E] border border-slate-800 rounded-3xl p-6"
      >
        <div className="flex justify-between items-center">

          <div>
            <p className="text-slate-400">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>
          </div>

          <Icon className="w-10 h-10 text-pink-500" />

        </div>
      </div>
    );
  })}
</div>

);
}
