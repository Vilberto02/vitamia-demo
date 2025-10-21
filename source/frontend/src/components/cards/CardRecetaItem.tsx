
interface CardRecetaItemProps {
  title: string,
  description: string,
}

export function CardRecetaItem({ title, description }: CardRecetaItemProps) {
  return (
    <div className="flex gap-6 p-2">
      <div className="w-full max-w-36 aspect-square bg-[var(--bg-verde-isla)] rounded-lg"></div>
      <div className="flex flex-col gap-3">
        <h4 className="text-[var(--bg-carbon-oscuro)] text-lg font-medium">
          {title}
        </h4>
        <p className="text-[var(--bg-gris-oscuro)] text-base font-normal line-clamp-3">{description}</p>
      </div>
    </div>
  );
}