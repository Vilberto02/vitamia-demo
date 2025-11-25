export function Badge({title, value}:{title: string, value: number}) {
  return (
    <div className="py-4 px-3 rounded-xl border-2 border-verde-te flex gap-2 flex-col items-center justify-center">
      <p className="text-[11px] line-clamp-1">{title}</p>
      <p className="font-bold text-lg">{value} g</p>
    </div>
  );
}