"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Loading from "../component/Loading";

export default function LazyLoading() {
  const [showModal, setShowModal] = useState(false);
  const DynamicModal = dynamic(() => import("../component/Modal"), {
    loading: () => <Loading />,
    ssr: false,
  });
  return (
    <div>
      <h3>Lazy Loading Modal</h3>
      <button
        className="mt-3 bg-cyan-400 rounded-lg p-1"
        onClick={() => setShowModal(!showModal)}
      >
        Open Modal
      </button>
      <div className="mt-3">{showModal && <DynamicModal />}</div>
    </div>
  );
}
