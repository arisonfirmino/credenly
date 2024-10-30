import { StarIcon } from "lucide-react";

const Review = () => {
  return (
    <div className="space-y-2.5 rounded-xl bg-blue-800 p-2.5">
      <p className="line-clamp-4 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui maiores
        perspiciatis tempora eos necessitatibus pariatur explicabo ex obcaecati
        porro itaque, veritatis consequuntur reiciendis nemo nobis ea velit.
        Fugit, illum? Consectetur?
      </p>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">João Silva</h3>
        <div className="flex gap-2.5">
          <StarIcon size={14} className="fill-yellow-400 text-yellow-400" />
          <StarIcon size={14} className="fill-yellow-400 text-yellow-400" />
          <StarIcon size={14} className="fill-yellow-400 text-yellow-400" />
          <StarIcon size={14} className="fill-yellow-400 text-yellow-400" />
          <StarIcon size={14} className="fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    </div>
  );
};

export default Review;
