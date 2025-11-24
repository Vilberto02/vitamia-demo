import {type LucideIcon} from "lucide-react"

export function SidebarItem({
  name,
  Icon,
  isActive,
  onClick,
}: {
  name: string;
  Icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      aria-label={`Navegar a ${name}`}
      className={`w-full flex items-center min-h-12 p-2 border-l-3 rounded-xs rounded-bl-xs text-[var(--bg-carbon-oscuro)] cursor-pointer ${
        isActive
          ? "border-[var(--bg-turquesa)] text-[var(--bg-turquesa)]"
          : "border-transparent hover:bg-[var(--bg-turquesa)]/5"
      }`}
    >
      <div className="ml-12 flex items-center gap-2">
        <Icon strokeWidth={2.5}></Icon>
        <p>{name}</p>
      </div>
    </button>
  );
}
