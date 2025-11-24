
type CardRecipeProps = {
  title: string;
  description: string;
  onClick: () => void;
}

export function CardRecipe({title, description, onClick}: CardRecipeProps) {
  return (
    <div className="flex gap-6 items-start border-2 border-stone-50 px-2 py-3 md:py-2 rounded-2xl hover:bg-stone-50/50 cursor-pointer" onClick={onClick}>
      <div className="w-0 md:w-36 aspect-square rounded-lg shrink-0 bg-verde-isla"></div>
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-semibold text-carbon-oscuro line-clamp-0 sm:line-clamp-2">
          {title}
        </h4>
        <p className="text-gris-oscuro text-base line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}