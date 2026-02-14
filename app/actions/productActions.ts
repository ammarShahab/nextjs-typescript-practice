import { connectDB } from "../lib/db";

interface FormState {
  success: boolean;
  message: string;
  error?: {
    productName?: string;
    productDescription?: string;
  };
}

export default async function productActions(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const productName = formData.get("productName") as string;
  const productDescription = formData.get("productDescription") as string;

  if (!productName || productName.length <= 3) {
    return {
      success: false,
      message: "Validation Failed",
      error: {
        productName: "Product name will be more than 3 characters",
      },
    };
  }

  if (!productDescription || productDescription.length <= 10) {
    return {
      success: false,
      message: "Validation Fail",
      error: {
        productDescription:
          "Product Description must be more than 10 characters",
      },
    };
  }

  const productsInfo = {
    productName: productName,
    productDescription: productDescription,
  };

  try {
    const db = await connectDB();
    const result = await db
      .collection("products")
      .insertOne({ ...productsInfo, created_at: new Date() });
    return {
      success: true,
      message: "Product created Successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to create product",
    };
  }
}
