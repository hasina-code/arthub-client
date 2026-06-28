"use client";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-[#09122E] p-8 border border-slate-700 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-4">
          Delete Artwork
        </h2>

        <p className="text-slate-400 mb-8">
          Are you sure you want to delete this artwork?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-slate-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-red-600 text-white"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}