import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

type Props = {
  name: string;
  city: string;
  rating: number;
  text: string;
};

export function ReviewCard({ name, city, rating, text }: Props) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="mb-3 flex gap-0.5" aria-label={`${rating} van 5 sterren`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < rating
                  ? "size-4 fill-[var(--color-secondary)] text-[var(--color-secondary)]"
                  : "size-4 text-slate-300"
              }
            />
          ))}
        </div>
        <p className="mb-4 text-slate-700 leading-relaxed">&ldquo;{text}&rdquo;</p>
        <div className="text-sm">
          <div className="font-semibold text-slate-900">{name}</div>
          <div className="text-slate-500">{city}</div>
        </div>
      </CardContent>
    </Card>
  );
}
