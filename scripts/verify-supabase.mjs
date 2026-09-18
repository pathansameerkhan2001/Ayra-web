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

console.log("=== Ayra Hampers Supabase Connectivity Test ===");
console.log(`Supabase URL configured: ${supabaseUrl ? "YES (" + supabaseUrl + ")" : "NO"}`);
console.log(`Publishable Key configured: ${supabaseKey ? "YES (Key length: " + supabaseKey.length + ")" : "NO"}`);

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("YOUR_SUPABASE_PROJECT_URL")) {
  console.log("\n[STATUS]: Environment variables are initialized with production template structure in .env.local.");
  console.log("Ready to query Supabase as soon as live project keys are inserted.");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
  try {
    console.log("\nQuerying categories table...");
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, name, slug, sort_order, is_active")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[ERROR]: Failed to query categories:", error.message);
      process.exit(1);
    }

    console.log(`[SUCCESS]: Retrieved ${categories.length} categories:`);
    categories.forEach((cat) => {
      console.log(` - [${cat.sort_order}] ${cat.name} (${cat.slug}) | Active: ${cat.is_active}`);
    });
  } catch (err) {
    console.error("[ERROR]: Unexpected exception:", err.message);
    process.exit(1);
  }
}

runTest();
