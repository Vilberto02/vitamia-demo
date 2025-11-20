interface CardLogroProps {
  title: string;
  description: string;
}

export function CardLogro({ title, description }: CardLogroProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-turquesa"></div>
    </div>
  );
}