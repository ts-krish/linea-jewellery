"use client";

import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
} from "../../components/ui";
import { useCart } from "../../context/CartContext";
import {
  createReview,
  fetchProductById,
  fetchReviewsByProduct,
  type ApiReview,
} from "../../lib/api";
import type { ProductDetailData } from "../../types";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={12}
        className={
          star <= rating ? "fill-black text-black" : "fill-none text-black/20"
        }
      />
    ))}
  </div>
);

const ReviewForm = ({
  productId,
  onSubmitted,
}: {
  productId: string;
  onSubmitted: (review: ApiReview) => void;
}) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hovered, setHovered] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const review = await createReview({
        product_id: productId,
        user_name: name.trim(),
        rating,
        comment: comment.trim() || undefined,
      });
      onSubmitted(review);
      setName("");
      setComment("");
      setRating(5);
    } catch {
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border-t pt-6 space-y-4">
      <p className="text-sm font-medium text-black">Write a Review</p>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`cursor-pointer transition-colors ${
              star <= (hovered || rating)
                ? "fill-black text-black"
                : "fill-none text-black/20"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-black/20 px-3 py-2 text-sm focus:outline-none focus:border-black"
      />

      <textarea
        placeholder="Share your thoughts (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full border border-black/20 px-3 py-2 text-sm resize-none focus:outline-none focus:border-black"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-black text-white hover:bg-black/80 text-sm"
      >
        {submitting ? "Submitting…" : "Submit Review"}
      </Button>
    </div>
  );
};

const ProductDetail = ({ product }: { product: ProductDetailData }) => {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const { addToCart } = useCart();
  useEffect(() => {
    fetchReviewsByProduct(product.id)
      .then(setReviews)
      .catch(() => {});
  }, [product.id]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const apiProduct = await fetchProductById(product.id);
      if (apiProduct) {
        await addToCart(apiProduct, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } finally {
      setAdding(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  return (
    <section className="mx-auto px-5 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="flex flex-col gap-4">
          {product.images.map((img, i) => (
            <div
              key={i}
              className="relative group w-full aspect-5/6 overflow-hidden bg-neutral-50"
            >
              <Image
                src={img}
                alt={`${product.subtitle} ${i + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="flex flex-col h-fit sticky top-0">
          <nav className="flex gap-3 text-sm mb-8">
            <Link className="text-black/50 hover:text-black" href="/">
              Home
            </Link>
            <span>/</span>
            <Link
              className="text-black/50 hover:text-black capitalize"
              href={`/category/${product.category.toLowerCase()}`}
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="capitalize">{product.subtitle}</span>
          </nav>

          <p className="text-sm text-black/50 tracking-widest capitalize">
            {product.title}
          </p>

          <h1 className="text-3xl lg:text-4xl font-light mt-1 mb-2 capitalize">
            {product.subtitle}
          </h1>

          {avgRating !== null && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-xs text-black/50">
                {avgRating.toFixed(1)} ({reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          <p className="text-xl font-medium mb-8">
            €{product.price.toLocaleString()}
          </p>

          <div className="mb-4 text-sm">
            <p>Material</p>
            <p className="text-black/60">{product.material}</p>
          </div>
          <div className="mb-4 text-sm">
            <p>Dimensions</p>
            <p className="text-black/60">{product.dimensions}</p>
          </div>
          <div className="mb-6 text-sm">
            <p>Weight</p>
            <p className="text-black/50">{product.weight}</p>
          </div>
          <div className="mb-8 text-sm">
            <p>Editor&apos;s notes</p>
            <p className="text-black/60">{product.editor_note}</p>
          </div>

          <Separator className="my-5" />

          <div className="flex items-center my-5 gap-2">
            <p>Quantity</p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            >
              <Minus size={14} />
            </Button>
            <span className="text-sm w-6 text-center">{qty}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQty((prev) => prev + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>

          <Button
            className="h-12 bg-black text-white hover:bg-black/80 mb-8 transition-all"
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? "Adding…" : added ? "Added to Bag ✓" : "Add to Bag"}
          </Button>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent className="text-sm text-black/70 leading-relaxed">
                {product.description}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent className="text-sm text-black/70 space-y-2">
                <p>SKU: {product.product_detail.SKU}</p>
                <p>Collection: {product.product_detail.Collection}</p>
                <p>Closure: {product.product_detail.Closure}</p>
                <p>Hypoallergenic: {product.product_detail.Hypoallergenic}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care">
              <AccordionTrigger>Care &amp; Cleaning</AccordionTrigger>
              <AccordionContent className="text-sm text-black/70">
                <ul className="list-disc pl-5 space-y-2">
                  {product.care.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reviews">
              <AccordionTrigger>
                Customer Reviews
                {reviews.length > 0 && (
                  <span className="ml-2 text-xs text-black/40 font-normal">
                    ({reviews.length})
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-black/70">
                {reviews.length === 0 ? (
                  <p className="text-black/40 italic">
                    No reviews yet. Be the first!
                  </p>
                ) : (
                  <div className="space-y-5">
                    {reviews.map((r) => (
                      <div key={r.review_id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-black">
                            {r.user_name}
                          </p>
                          <span className="text-xs text-black/30">
                            {new Date(r.created_at).toLocaleDateString(
                              "en-IE",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <StarRating rating={r.rating} />
                        {r.comment && <p className="mt-1">{r.comment}</p>}
                      </div>
                    ))}
                  </div>
                )}

                <ReviewForm
                  productId={product.id}
                  onSubmitted={(r) => setReviews((prev) => [r, ...prev])}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
