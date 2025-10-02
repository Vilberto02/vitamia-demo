export function SidebarItem({
  name,
  isActive,
  onClick,
}: {
  name: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center min-h-12 p-2 border-l-3 rounded-xs rounded-bl-xs text-[var(--bg-carbon-oscuro)] cursor-pointer ${
        isActive
          ? "border-[var(--bg-turquesa)] text-[var(--bg-turquesa)]"
          : "border-transparent hover:bg-[var(--bg-turquesa)]/5"
      }`}
    >
      <p className="ml-12">{name}</p>
    </button>
  );
}
