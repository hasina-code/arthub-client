export default function ProfileCard({
  userData,
  name,
  image,
}) {
  return (
    <div className="bg-[#09122E] rounded-3xl border border-slate-800 p-8">

      <div className="flex flex-col items-center">

        <img
          src={
            image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-pink-500"
        />

        <h2 className="text-2xl font-bold mt-6">
          {name}
        </h2>

        <p className="text-slate-400 mt-2">
          {userData?.email}
        </p>

        {/* <span className="mt-4 bg-pink-600 px-5 py-2 rounded-full capitalize">
          {userData?.role || "User"} Account
        </span> */}

      </div>

    </div>
  );
}