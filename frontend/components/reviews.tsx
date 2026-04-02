import { reviews } from "@/app/data.json";
import { Rat, Star } from "lucide-react";

export default function Reviews() {
  return (
    <div className="mt-8">
      <h1 className="font-bold text-xl">What Our Users Say</h1>
      <div className="flex flex-col gap-6 mt-4">
        {reviews.map(({ name, role, company, timeAgo, rating, text }, idx) => (
          <div key={idx} className="max-w-6xl bg-card rounded-md p-6 flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="size-11 rounded-full bg-white" />
              <div>
                <h1 className="font-semibold">
                  {name}, {role} at {company}
                </h1>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
              </div>
            </div>
            <div>
              <RatingStars rating={rating} />
            </div>
            <p className="text-sm">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface RatingStarsProps {
  rating: number;
  totalStars?: number;
  size?: number;
}

function RatingStars({ rating, totalStars = 5, size = 18 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}
