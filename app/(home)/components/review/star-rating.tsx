import { StarIcon } from "lucide-react";
import { FieldError } from "react-hook-form";

interface StarRatingProps {
  value: number | null;
  setValue: (value: number) => void;
  error: FieldError | undefined;
}

const StarRating = ({ value, setValue, error }: StarRatingProps) => {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          onClick={() => setValue(star)}
          className="cursor-pointer"
        >
          <input type="radio" value={star} className="hidden" />
          <span>
            <StarIcon
              size={16}
              className={`${
                value && star <= value
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-400"
              } ${error ? "text-red-600" : ""}`}
            />
          </span>
        </label>
      ))}
    </div>
  );
};

export default StarRating;
