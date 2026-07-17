import { ID, Permission, Query, Role } from "appwrite";
import { account, databases } from "./appwrite-client";

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "building-repair-market";
export const COLLECTIONS = {
  rfqs: "rfqs",
  products: "products",
  quotes: "quotes",
};

export type RfqItem = {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
};

export async function createRfq(input: {
  title: string;
  city: string;
  deadline?: string;
  notes?: string;
  items: RfqItem[];
}) {
  const user = await account.get();
  return databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.rfqs,
    ID.unique(),
    {
      buyerId: user.$id,
      buyerName: user.name,
      title: input.title,
      city: input.city,
      deadline: input.deadline || "",
      notes: input.notes || "",
      itemsJson: JSON.stringify(input.items),
      status: "draft",
    },
    [
      Permission.read(Role.user(user.$id)),
      Permission.update(Role.user(user.$id)),
      Permission.delete(Role.user(user.$id)),
    ],
  );
}

export async function listMyRfqs() {
  const user = await account.get();
  return databases.listDocuments(DATABASE_ID, COLLECTIONS.rfqs, [
    Query.equal("buyerId", user.$id),
    Query.orderDesc("$createdAt"),
    Query.limit(50),
  ]);
}

export async function createProduct(input: {
  name: string;
  sku?: string;
  category: string;
  unit: string;
  price?: number;
  description?: string;
}) {
  const user = await account.get();
  return databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.products,
    ID.unique(),
    {
      supplierId: user.$id,
      supplierName: user.name,
      name: input.name,
      sku: input.sku || "",
      category: input.category,
      unit: input.unit,
      price: input.price || 0,
      description: input.description || "",
      status: "pending",
    },
    [
      Permission.read(Role.user(user.$id)),
      Permission.update(Role.user(user.$id)),
      Permission.delete(Role.user(user.$id)),
    ],
  );
}

export async function listMyProducts() {
  const user = await account.get();
  return databases.listDocuments(DATABASE_ID, COLLECTIONS.products, [
    Query.equal("supplierId", user.$id),
    Query.orderDesc("$createdAt"),
    Query.limit(100),
  ]);
}
