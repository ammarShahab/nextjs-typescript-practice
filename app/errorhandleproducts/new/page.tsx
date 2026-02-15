"use client";

import { productActions } from "@/app/actions/productActions";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
  error: {
    productName: "",
    productDescription: "",
  },
};
export default function CreateProducts() {
  const [state, formAction, pending] = useActionState(
    productActions,
    initialState,
  );
  return (
    <div className="max-w-3xl mx-auto border p-2">
      <h3>Error Handle Products</h3>

      <div>
        <form action={formAction} className="p-3">
          <div className="flex flex-col gap-2.5 p-2">
            <label>Product Name</label>
            <input type="text" name="productName" className="border" />
            <p className="text-red-500">
              {state.error?.productName && state.error.productName}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 p-2">
            <label>Product Description</label>
            <textarea name="productDescription" className="border" />
            <p className="text-red-500">
              {state.error?.productDescription &&
                state.error.productDescription}
            </p>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="bg-blue-400 rounded-lg p-1 disabled:opacity-50"
          >
            {pending ? "Submitting..." : "Submit"}
          </button>{" "}
          {state.message && (
            <p
              aria-live="polite"
              className={state.success ? "text-green-600" : "text-red-600"}
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
