import { Client, Databases, Permission, Role } from "node-appwrite";

const collections = [
  {
    id: "rfqs",
    name: "RFQs",
    attributes: [
      { key: "buyerId", type: "string", size: 64, required: true },
      { key: "title", type: "string", size: 180, required: true },
      { key: "city", type: "string", size: 80, required: true },
      { key: "deliveryDate", type: "string", size: 32, required: false },
      { key: "items", type: "string", size: 12000, required: true },
      { key: "status", type: "string", size: 32, required: true, default: "open" }
    ],
    indexes: [
      { key: "buyerId_idx", type: "key", attributes: ["buyerId"] },
      { key: "status_idx", type: "key", attributes: ["status"] }
    ]
  },
  {
    id: "products",
    name: "Products",
    attributes: [
      { key: "supplierId", type: "string", size: 64, required: true },
      { key: "name", type: "string", size: 180, required: true },
      { key: "category", type: "string", size: 120, required: true },
      { key: "price", type: "float", required: false },
      { key: "unit", type: "string", size: 40, required: true },
      { key: "description", type: "string", size: 4000, required: false },
      { key: "imageFileId", type: "string", size: 64, required: false },
      { key: "status", type: "string", size: 32, required: true, default: "pending" }
    ],
    indexes: [
      { key: "supplierId_idx", type: "key", attributes: ["supplierId"] },
      { key: "status_idx", type: "key", attributes: ["status"] },
      { key: "category_idx", type: "key", attributes: ["category"] }
    ]
  },
  {
    id: "quotes",
    name: "Quotes",
    attributes: [
      { key: "rfqId", type: "string", size: 64, required: true },
      { key: "supplierId", type: "string", size: 64, required: true },
      { key: "buyerId", type: "string", size: 64, required: true },
      { key: "items", type: "string", size: 12000, required: true },
      { key: "total", type: "float", required: true },
      { key: "validUntil", type: "string", size: 32, required: false },
      { key: "notes", type: "string", size: 4000, required: false },
      { key: "pdfFileId", type: "string", size: 64, required: false },
      { key: "status", type: "string", size: 32, required: true, default: "submitted" }
    ],
    indexes: [
      { key: "rfqId_idx", type: "key", attributes: ["rfqId"] },
      { key: "supplierId_idx", type: "key", attributes: ["supplierId"] },
      { key: "buyerId_idx", type: "key", attributes: ["buyerId"] }
    ]
  }
] as const;

export async function POST() {
  if (process.env.SETUP_ONCE !== "enabled") {
    return Response.json({ ok: false, error: "Setup disabled" }, { status: 403 });
  }

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.APPWRITE_DATABASE_ID || "building-repair-market";

  if (!endpoint || !projectId || !apiKey) {
    return Response.json({ ok: false, error: "Missing Appwrite server environment variables" }, { status: 500 });
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const databases = new Databases(client);
  const results: Array<{ id: string; status: string }> = [];

  try {
    try {
      await databases.get({ databaseId });
    } catch {
      await databases.create({ databaseId, name: "Building Repair Market", enabled: true });
    }

    for (const collection of collections) {
      try {
        await databases.getCollection({ databaseId, collectionId: collection.id });
        results.push({ id: collection.id, status: "exists" });
      } catch {
        await databases.createCollection({
          databaseId,
          collectionId: collection.id,
          name: collection.name,
          permissions: [Permission.create(Role.users())],
          documentSecurity: true,
          enabled: true,
          attributes: collection.attributes as never,
          indexes: collection.indexes as never
        });
        results.push({ id: collection.id, status: "created" });
      }
    }

    return Response.json({ ok: true, databaseId, collections: results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown setup error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
