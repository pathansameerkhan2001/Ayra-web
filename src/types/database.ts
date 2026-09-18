export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      products: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          slug: string;
          tagline: string | null;
          description: string | null;
          details: Json | null; // e.g. inclusions, dimensions, care instructions
          base_price: number;
          compare_at_price: number | null;
          is_active: boolean;
          is_featured: boolean;
          is_new: boolean;
          sort_order: number;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          tagline?: string | null;
          description?: string | null;
          details?: Json | null;
          base_price: number;
          compare_at_price?: number | null;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          sort_order?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name?: string;
          slug?: string;
          tagline?: string | null;
          description?: string | null;
          details?: Json | null;
          base_price?: number;
          compare_at_price?: number | null;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          sort_order?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };

      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string | null;
          is_primary: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url: string;
          alt_text?: string | null;
          is_primary?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          image_url?: string;
          alt_text?: string | null;
          is_primary?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };

      product_variants: {
        Row: {
          id: string;
          product_id: string;
          name: string; // e.g. "Standard Box", "Deluxe Wooden Crate"
          sku: string | null;
          price_adjustment: number;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          sku?: string | null;
          price_adjustment?: number;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          sku?: string | null;
          price_adjustment?: number;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };

      inventory: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          quantity: number;
          low_stock_threshold: number;
          allow_backorder: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_id?: string | null;
          quantity?: number;
          low_stock_threshold?: number;
          allow_backorder?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_id?: string | null;
          quantity?: number;
          low_stock_threshold?: number;
          allow_backorder?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          }
        ];
      };

      customers: {
        Row: {
          id: string;
          auth_user_id: string | null; // Supabase auth.users reference
          email: string;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      addresses: {
        Row: {
          id: string;
          customer_id: string;
          recipient_name: string;
          phone: string;
          address_line1: string;
          address_line2: string | null;
          city: string;
          state: string;
          postal_code: string;
          country: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          recipient_name: string;
          phone: string;
          address_line1: string;
          address_line2?: string | null;
          city: string;
          state: string;
          postal_code: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          recipient_name?: string;
          phone?: string;
          address_line1?: string;
          address_line2?: string | null;
          city?: string;
          state?: string;
          postal_code?: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "addresses_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };

      carts: {
        Row: {
          id: string;
          customer_id: string | null;
          session_id: string | null; // For anonymous guest carts
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          session_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          session_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "carts_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };

      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          variant_id: string | null;
          quantity: number;
          custom_greeting_card: string | null;
          custom_ribbon_color: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_id: string;
          variant_id?: string | null;
          quantity?: number;
          custom_greeting_card?: string | null;
          custom_ribbon_color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_id?: string;
          variant_id?: string | null;
          quantity?: number;
          custom_greeting_card?: string | null;
          custom_ribbon_color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "carts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          }
        ];
      };

      wishlists: {
        Row: {
          id: string;
          customer_id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wishlists_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };

      wishlist_items: {
        Row: {
          id: string;
          wishlist_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          wishlist_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          wishlist_id?: string;
          product_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey";
            columns: ["wishlist_id"];
            isOneToOne: false;
            referencedRelation: "wishlists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wishlist_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };

      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string | null;
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          payment_status: "pending" | "paid" | "failed" | "refunded";
          payment_method: string | null;
          subtotal: number;
          discount_amount: number;
          shipping_amount: number;
          total_amount: number;
          currency: string;
          coupon_code: string | null;
          shipping_address: Json;
          billing_address: Json | null;
          customer_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_id?: string | null;
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          payment_method?: string | null;
          subtotal: number;
          discount_amount?: number;
          shipping_amount?: number;
          total_amount: number;
          currency?: string;
          coupon_code?: string | null;
          shipping_address: Json;
          billing_address?: Json | null;
          customer_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_id?: string | null;
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          payment_method?: string | null;
          subtotal?: number;
          discount_amount?: number;
          shipping_amount?: number;
          total_amount?: number;
          currency?: string;
          coupon_code?: string | null;
          shipping_address?: Json;
          billing_address?: Json | null;
          customer_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };

      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          variant_id: string | null;
          product_name: string;
          variant_name: string | null;
          unit_price: number;
          quantity: number;
          total_price: number;
          custom_greeting_card: string | null;
          custom_ribbon_color: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          variant_id?: string | null;
          product_name: string;
          variant_name?: string | null;
          unit_price: number;
          quantity: number;
          total_price: number;
          custom_greeting_card?: string | null;
          custom_ribbon_color?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          variant_id?: string | null;
          product_name?: string;
          variant_name?: string | null;
          unit_price?: number;
          quantity?: number;
          total_price?: number;
          custom_greeting_card?: string | null;
          custom_ribbon_color?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          }
        ];
      };

      coupons: {
        Row: {
          id: string;
          code: string;
          discount_type: "percentage" | "fixed";
          discount_value: number;
          min_order_amount: number | null;
          max_discount_amount: number | null;
          usage_limit: number | null;
          used_count: number;
          is_active: boolean;
          starts_at: string | null;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          discount_type: "percentage" | "fixed";
          discount_value: number;
          min_order_amount?: number | null;
          max_discount_amount?: number | null;
          usage_limit?: number | null;
          used_count?: number;
          is_active?: boolean;
          starts_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          discount_type?: "percentage" | "fixed";
          discount_value?: number;
          min_order_amount?: number | null;
          max_discount_amount?: number | null;
          usage_limit?: number | null;
          used_count?: number;
          is_active?: boolean;
          starts_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      coupon_usage: {
        Row: {
          id: string;
          coupon_id: string;
          customer_id: string | null;
          order_id: string;
          discount_applied: number;
          used_at: string;
        };
        Insert: {
          id?: string;
          coupon_id: string;
          customer_id?: string | null;
          order_id: string;
          discount_applied: number;
          used_at?: string;
        };
        Update: {
          id?: string;
          coupon_id?: string;
          customer_id?: string | null;
          order_id?: string;
          discount_applied?: number;
          used_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_usage_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coupon_usage_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };

      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_id: string | null;
          reviewer_name: string;
          rating: number; // 1 to 5
          title: string | null;
          comment: string | null;
          is_verified_buyer: boolean;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_id?: string | null;
          reviewer_name: string;
          rating: number;
          title?: string | null;
          comment?: string | null;
          is_verified_buyer?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_id?: string | null;
          reviewer_name?: string;
          rating?: number;
          title?: string | null;
          comment?: string | null;
          is_verified_buyer?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };

      hero_slides: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          badge: string | null;
          image_url: string;
          cta_text: string | null;
          cta_link: string | null;
          secondary_cta_text: string | null;
          secondary_cta_link: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          badge?: string | null;
          image_url: string;
          cta_text?: string | null;
          cta_link?: string | null;
          secondary_cta_text?: string | null;
          secondary_cta_link?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          badge?: string | null;
          image_url?: string;
          cta_text?: string | null;
          cta_link?: string | null;
          secondary_cta_text?: string | null;
          secondary_cta_link?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      instagram_reels: {
        Row: {
          id: string;
          title: string;
          reel_url: string;
          thumbnail_url: string;
          likes_count: number;
          comments_count: number;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          reel_url: string;
          thumbnail_url: string;
          likes_count?: number;
          comments_count?: number;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          reel_url?: string;
          thumbnail_url?: string;
          likes_count?: number;
          comments_count?: number;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      site_settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenient Model Types for Application Use
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
export type Inventory = Database["public"]["Tables"]["inventory"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Address = Database["public"]["Tables"]["addresses"]["Row"];
export type Cart = Database["public"]["Tables"]["carts"]["Row"];
export type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];
export type Wishlist = Database["public"]["Tables"]["wishlists"]["Row"];
export type WishlistItem = Database["public"]["Tables"]["wishlist_items"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type Coupon = Database["public"]["Tables"]["coupons"]["Row"];
export type CouponUsage = Database["public"]["Tables"]["coupon_usage"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  badge?: string | null;
  image_url: string;
  cta_text?: string | null;
  cta_link?: string | null;
  secondary_cta_text?: string | null;
  secondary_cta_link?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InstagramReel {
  id: string;
  title: string;
  reel_url: string;
  thumbnail_url: string;
  likes_count: number;
  comments_count: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown> | string | number | boolean;
  description?: string | null;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

// Extended Compound Types
export interface ProductWithDetails extends Product {
  category?: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
  inventory?: Inventory | null;
  sku?: string | null;
  barcode?: string | null;
  is_bestseller?: boolean;
}

export interface CartItemWithProduct extends CartItem {
  product: Product & {
    images: ProductImage[];
  };
  variant?: ProductVariant | null;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product: Product & {
    images: ProductImage[];
  };
}
