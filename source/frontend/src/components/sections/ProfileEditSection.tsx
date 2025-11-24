import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { FormProfile } from "../forms/FormProfile";
import { ScrollArea } from "../ui/scroll-area";

export const ProfileEditSection = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col gap-6 h-full animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="hover:bg-stone-100 rounded-full cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 text-stone-600" />
        </Button>
        <h1 className="font-bold text-2xl text-carbon-oscuro select-none">
          Editar Información
        </h1>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-stone-100 h-full overflow-y-hidden">
        <ScrollArea className="h-full">
          <FormProfile onCancel={onBack} />
        </ScrollArea>
      </div>
    </div>
  );
};
