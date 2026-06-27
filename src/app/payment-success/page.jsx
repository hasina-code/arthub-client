"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import { authClient } from "@/lib/auth-client";

export default function PaymentSuccess() {
  const params = useSearchParams();

  const { data: session } =
    authClient.useSession();

  const artworkId =
    params.get("artworkId");

  const buyer =
    params.get("buyer");

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    if (
      artworkId &&
      buyer &&
      session?.user?.name
    ) {
      savePurchase();
      setShowModal(true);
    }
  }, [artworkId, buyer, session]);

  const savePurchase = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/purchase-success`,
        {
          artworkId,

          buyerEmail: buyer,

          buyerName:
            session.user.name,

          transactionId:
            crypto.randomUUID(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B23]">
      <PaymentSuccessModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
      />
    </div>
  );
}