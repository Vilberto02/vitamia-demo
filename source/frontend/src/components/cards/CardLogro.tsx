import { Award, Trophy } from "lucide-react";

interface CardLogroProps {
  title: string;
  description: string;
  isCompleted?: boolean;
}

export function CardLogro({ title, description, isCompleted }: CardLogroProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="w-10 h-10 aspect-square rounded-full bg-turquesa flex justify-center items-center">
        {isCompleted ? (
          <Trophy className="text-white" size={20}></Trophy>
        ) : (
          <Award className="text-white" size={20}></Award>
        )}
      </div>
    </div>
  );
}
