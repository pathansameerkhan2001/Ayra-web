import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
let envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length > 0) {
        envVars[key.trim()] = rest.join("=").trim();
      }
    }
  });
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  envVars.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";
const bucketName = envVars.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "ayra-products";

console.log("=== Ayra Hampers Supabase Connectivity Test ===");
console.log(`Supabase URL: ${supabaseUrl}`);
console.log(`Publishable Key Present: ${Boolean(supabaseKey)} (length: ${supabaseKey.length})`);
console.log(`Storage Bucket: ${bucketName}`);

if (!supabaseUrl || !supabaseKey) {
  console.error("\n[ERROR]: Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
  try {
    console.log("\n1. Testing Database Query on 'categories' table...");
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, name, slug, sort_order, is_active")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("[NOTICE]: Failed to query categories table:", error.message);
    } else {
      console.log(`[SUCCESS]: Retrieved ${categories ? categories.length : 0} categories from database:`);
      if (categories) {
        categories.forEach((cat) => {
          console.log(` - [${cat.sort_order}] ${cat.name} (${cat.slug}) | Active: ${cat.is_active}`);
        });
      }
    }

    console.log("\n2. Testing Database Query on 'products' table...");
    const { data: products, error: prodErr } = await supabase
      .from("products")
      .select("id, name, slug, base_price, is_active")
      .limit(5);

    if (prodErr) {
      console.warn("[NOTICE]: Failed to query products table:", prodErr.message);
    } else {
      console.log(`[SUCCESS]: Retrieved ${products ? products.length : 0} products from database.`);
    }

    console.log("\n3. Testing Storage Bucket Access for 'ayra-products'...");
    const { data: files, error: storageErr } = await supabase.storage
      .from(bucketName)
      .list("", { limit: 10 });

    if (storageErr) {
      console.warn(`[NOTICE]: Storage bucket '${bucketName}' listing note: ${storageErr.message}`);
    } else {
      console.log(`[SUCCESS]: Storage bucket '${bucketName}' accessible. Found ${files ? files.length : 0} items at root.`);
    }

    console.log("\n=== Supabase Verification Complete ===");
  } catch (err) {
    console.error("[ERROR]: Unexpected exception:", err.message);
  }
}

runTest();
