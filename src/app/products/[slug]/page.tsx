"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getFeaturedProducts } from "@/services/products";
import { getProductReviews, submitReview } from "@/services/reviews";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { ProductWithDetails, Review } from "@/types/database";
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Star,
  Truck,
  ShieldCheck,
  Gift,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<ProductWithDetails[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("");

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const res = await getProductBySlug(slug);
        if (res.data) {
          setProduct(res.data);
          if (res.data.variants && res.data.variants.length > 0) {
            setSelectedVariant(res.data.variants[0].name);
          }

          // Load reviews
          const revRes = await getProductReviews(res.data.id);
          setReviews(revRes.data || []);
        }

        // Load related products
        const relatedRes = await getFeaturedProducts(4);
        setRelatedProducts(
          ((relatedRes.data as unknown as ProductWithDetails[]) || []).filter(
            (p) => p.slug !== slug
          )
        );
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <AnnouncementBar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 flex-1 w-full flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-ayra-rose-light border-t-ayra-rose rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <AnnouncementBar />
        <Header />
        <div className="max-w-md mx-auto px-4 py-24 text-center flex-1">
          <h1 className="font-serif text-2xl text-ayra-charcoal">Hamper Not Found</h1>
          <p className="text-xs text-ayra-charcoal/60 mt-2 font-sans">
            The requested luxury hamper might be sold out or unavailable.
          </p>
          <Link
            href="/products"
            className="inline-block mt-6 px-6 py-2.5 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold"
          >
            Browse All Hampers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : [{ id: "1", product_id: product.id, image_url: "/images/occasions/birthday.jpg", alt_text: product.name, is_primary: true, sort_order: 1, created_at: "" }];
  
  const currentImage = images[selectedImageIndex] || images[0];

  const matchedVariant = product.variants?.find((v) => v.name === selectedVariant);
  const currentPrice = matchedVariant
    ? product.base_price + (matchedVariant.price_adjustment || 0)
    : product.base_price;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined, currentPrice);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const res = await submitReview({
      productId: product.id,
      customerName: reviewName,
      rating: reviewRating,
      title: reviewTitle || "Cherished Hamper",
      comment: reviewComment,
    });

    if (res.success) {
      setReviewSuccessMsg(res.message);
      setTimeout(() => {
        setReviewModalOpen(false);
        setReviewSuccessMsg("");
      }, 2000);
    }
  };

  const detailsObj = product.details as {
    inclusions?: string[];
    dimensions?: string;
    care?: string;
  } | null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="flex items-center gap-2 text-xs text-ayra-charcoal/60 font-sans">
          <Link href="/" className="hover:text-ayra-rose">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-ayra-rose">Hampers</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/collections/${product.category.slug}`} className="hover:text-ayra-rose">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ayra-charcoal font-medium truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/4.5] w-full rounded-3xl overflow-hidden bg-white shadow-luxury border border-ayra-blush-200">
              <Image
                src={currentImage.image_url}
                alt={currentImage.alt_text || product.name}
                fill
                priority
                className="object-cover object-center"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-md text-ayra-charcoal hover:text-ayra-rose transition-all shadow-md z-10"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? "fill-ayra-rose text-ayra-rose" : ""}`}
                />
              </button>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-ayra-rose ring-2 ring-ayra-blush-200"
                        : "border-ayra-blush-100 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.image_url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Controls */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <Link
                  href={`/collections/${product.category.slug}`}
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-ayra-rose-medium hover:underline"
                >
                  {product.category.name}
                </Link>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ayra-charcoal font-normal mt-1 leading-snug">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-xs sm:text-sm text-ayra-charcoal/70 font-sans mt-2 font-light">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Rating Summary */}
            <div className="flex items-center gap-2 text-xs text-ayra-charcoal/80">
              <div className="flex items-center gap-0.5 text-ayra-champagne-accent">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-medium font-sans">4.9 / 5.0</span>
              <span className="text-ayra-charcoal/40">•</span>
              <span className="text-ayra-charcoal/60 font-sans">28 Verified Reviews</span>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-2xl bg-white/70 border border-ayra-blush-100/80 flex items-baseline gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-ayra-charcoal">
                ₹{currentPrice.toLocaleString()}
              </span>
              {product.compare_at_price && product.compare_at_price > currentPrice && (
                <span className="text-sm text-ayra-charcoal/40 line-through font-sans">
                  ₹{product.compare_at_price.toLocaleString()}
                </span>
              )}
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium ml-auto">
                Inclusive of all taxes
              </span>
            </div>

            {/* Variant Selector (if available) */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ayra-charcoal block mb-2">
                  Presentation Style: <span className="text-ayra-rose-medium font-normal">{selectedVariant}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const varPrice = product.base_price + (v.price_adjustment || 0);
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`px-4 py-2 rounded-xl text-xs font-sans transition-all ${
                          selectedVariant === v.name
                            ? "bg-ayra-charcoal text-white shadow-sm ring-2 ring-ayra-rose"
                            : "bg-white border border-ayra-blush-200 text-ayra-charcoal hover:bg-ayra-peach-50"
                        }`}
                      >
                        {v.name} {v.price_adjustment ? `(+₹${v.price_adjustment.toLocaleString()})` : `(₹${varPrice.toLocaleString()})`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart Controls */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-ayra-blush-200 bg-white rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-ayra-peach-50 text-ayra-charcoal"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold font-sans">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-ayra-peach-50 text-ayra-charcoal"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-ayra-rose-deep transition-all shadow-luxury hover:shadow-glow active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Guarantees List */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-ayra-blush-100">
              <div className="flex items-center gap-2 text-xs text-ayra-charcoal/70 font-sans">
                <Truck className="w-4 h-4 text-ayra-rose" />
                <span>Pan-India express delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ayra-charcoal/70 font-sans">
                <Gift className="w-4 h-4 text-ayra-rose" />
                <span>Custom gift note included</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ayra-charcoal/70 font-sans">
                <ShieldCheck className="w-4 h-4 text-ayra-rose" />
                <span>100% pristine arrival guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ayra-charcoal/70 font-sans">
                <Sparkles className="w-4 h-4 text-ayra-rose" />
                <span>Handcrafted with luxury finishes</span>
              </div>
            </div>

            {/* Description & Inclusions Accordion/Boxes */}
            <div className="pt-4 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-ayra-blush-100 shadow-subtle">
                <h3 className="font-serif text-base font-medium text-ayra-charcoal mb-2">
                  Curator&apos;s Description
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/75 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {detailsObj?.inclusions && (
                <div className="p-5 rounded-2xl bg-white border border-ayra-blush-100 shadow-subtle">
                  <h3 className="font-serif text-base font-medium text-ayra-charcoal mb-3">
                    What&apos;s Inside This Hamper
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-sans text-ayra-charcoal/75">
                    {detailsObj.inclusions.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-ayra-rose shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-16 pt-12 border-t border-ayra-blush-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-ayra-charcoal font-normal">
                Customer Reviews
              </h2>
              <p className="text-xs text-ayra-charcoal/60 font-sans mt-1">
                Real feedback from verified recipients and givers.
              </p>
            </div>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="px-5 py-2.5 rounded-full border border-ayra-rose text-ayra-rose hover:bg-ayra-rose hover:text-white text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white border border-ayra-blush-100 shadow-sm"
                >
                  <div className="flex items-center gap-1 text-ayra-champagne-accent mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-ayra-charcoal">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-ayra-charcoal/70 font-sans mt-1 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-ayra-charcoal/60 font-sans">
                No reviews yet. Be the first to share your experience with this hamper!
              </p>
            )}
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-ayra-blush-200/60">
            <h2 className="font-serif text-2xl sm:text-3xl text-ayra-charcoal font-normal mb-8">
              You May Also Love
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Write a Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-[14000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-6 shadow-2xl border border-ayra-blush-200">
            <h3 className="font-serif text-xl text-ayra-charcoal">Write a Review</h3>
            <p className="text-xs text-ayra-charcoal/60 font-sans mt-1">
              Share your thoughts about {product.name}
            </p>

            {reviewSuccessMsg ? (
              <div className="my-6 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-sans text-center">
                {reviewSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4 text-xs font-sans">
                <div>
                  <label className="block text-ayra-charcoal font-medium mb-1">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                        className={`p-1 ${
                          s <= reviewRating ? "text-ayra-champagne-dark" : "text-gray-300"
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-ayra-charcoal font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Pooja Rao"
                    className="w-full p-2.5 rounded-xl bg-white border border-ayra-blush-200 outline-none focus:border-ayra-rose"
                  />
                </div>

                <div>
                  <label className="block text-ayra-charcoal font-medium mb-1">Review Title</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Stunning Presentation!"
                    className="w-full p-2.5 rounded-xl bg-white border border-ayra-blush-200 outline-none focus:border-ayra-rose"
                  />
                </div>

                <div>
                  <label className="block text-ayra-charcoal font-medium mb-1">Review Comments</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us what you loved about this gift..."
                    className="w-full p-2.5 rounded-xl bg-white border border-ayra-blush-200 outline-none focus:border-ayra-rose"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="flex-1 py-2.5 rounded-full bg-white border border-ayra-blush-200 text-ayra-charcoal font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-ayra-rose text-white font-semibold hover:bg-ayra-rose-deep"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-ayra-blush-200 p-3.5 z-40 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-ayra-charcoal/50 uppercase tracking-widest block font-sans">Total</span>
          <span className="font-serif text-lg font-semibold text-ayra-charcoal">
            ₹{(currentPrice * quantity).toLocaleString()}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="py-3 px-6 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-luxury"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}
