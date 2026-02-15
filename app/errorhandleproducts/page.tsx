import Link from "next/link";
import { Product } from "../lib/models/Products";

export default async function ErrorHandleProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/errorhandleproducts`,
    {
      next: { tags: ["errorhandleproducts"] },
    },
  );

  if (!res.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Failed to fetch products
        </h2>
        <p className="text-gray-700 mb-6">
          There was an error loading the products. Please try again later.
        </p>
        <Link
          href="/errorhandleproducts/new"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Create Products
        </Link>
      </div>
    );
  }

  const products: Product[] = await res.json();

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Error Handle Products</h3>
      <Link
        href="/errorhandleproducts/new"
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors inline-block mb-6"
      >
        Create Products
      </Link>
      <div>
        <h3 className="text-lg font-semibold mb-4">All Products</h3>
        <div className="grid gap-4">
          {products.length === 0 ? (
            <p className="text-gray-500">
              No products available. Create your first product!
            </p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="border p-4 rounded-lg">
                <h3 className="font-bold">{product.productName}</h3>
                <p className="text-gray-700">{product.productDescription}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
