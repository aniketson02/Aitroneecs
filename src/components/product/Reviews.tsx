"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/ui/Stars";
import { Button } from "@/components/ui/Button";

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function Reviews({
  productId,
  rating,
  reviewCount,
  initial,
}: {
  productId: string;
  rating: number;
  reviewCount: number;
  initial: Review[];
}) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (name.trim().length < 2 || stars < 1) {
      setMessage("Please add your name and a star rating.");
      return;
    }
    setStatus("saving");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, author: name, rating: stars, title, body }),
    });
    const data = await res.json();
    if (data.ok) {
      setReviews((prev) => [
        {
          id: `local-${Date.now()}`,
          author: name.trim(),
          rating: stars,
          title: title.trim(),
          body: body.trim(),
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
      setStatus("done");
      setName("");
      setStars(0);
      setTitle("");
      setBody("");
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 1500);
    } else {
      setStatus("error");
      setMessage(data.message ?? "Could not save your review.");
    }
  }

  return (
    <section id="reviews" className="mt-24 scroll-mt-24">
      <div className="flex flex-col gap-6 border-t border-line pt-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl tracking-tight">Customer reviews</h2>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={rating} />
            <span className="text-sm text-ink-soft">
              {rating.toFixed(1)} · {reviewCount.toLocaleString("en-IN")} reviews
            </span>
          </div>
        </div>
        <Button variant="outline" onClick={() => setOpen((o) => !o)}>
          Write a review
        </Button>
      </div>

      {open && (
        <form
          onSubmit={submit}
          className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-8"
        >
          {status === "done" ? (
            <p className="py-4 text-center text-success">
              Thank you! Your review has been posted.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-ink-soft">Your rating</span>
                <div className="flex" onMouseLeave={() => setHover(0)}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const v = i + 1;
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-label={`${v} star${v > 1 ? "s" : ""}`}
                        onMouseEnter={() => setHover(v)}
                        onClick={() => setStars(v)}
                        className="p-0.5"
                      >
                        <Star
                          className={cn(
                            "h-6 w-6 transition-colors",
                            (hover || stars) >= v
                              ? "fill-accent text-accent"
                              : "fill-line text-line",
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputCls}
                />
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Review title (optional)"
                  className={inputCls}
                />
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="Tell others what you think (optional)"
                className={cn(inputCls, "h-auto py-3")}
              />
              {message && <p className="text-sm text-accent-deep">{message}</p>}
              <Button type="submit" disabled={status === "saving"}>
                {status === "saving" ? "Posting…" : "Submit review"}
              </Button>
            </div>
          )}
        </form>
      )}

      <div className="mt-10 space-y-8">
        {reviews.length === 0 ? (
          <p className="text-ink-soft">Be the first to share a detailed review of this product.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border-b border-line pb-8">
              <div className="flex items-center justify-between gap-3">
                <Stars rating={r.rating} />
                <span className="text-xs text-muted">{formatDate(r.date)}</span>
              </div>
              {r.title && <h3 className="mt-3 font-medium">{r.title}</h3>}
              {r.body && <p className="mt-1.5 text-ink-soft">{r.body}</p>}
              <p className="mt-3 text-sm text-muted">— {r.author}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none transition-colors focus:border-ink";
