import { TextInput } from "@/components/ui/krds/(input)/text-input";

export default function TextInputDefault() {
  return (
    <div className="w-full max-w-[400px]">
      <TextInput label="레이블" placeholder="플레이스홀더" hint="도움말" />
    </div>
  );
}
