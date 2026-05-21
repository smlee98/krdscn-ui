import { TextInput } from "@/components/ui/krds/(input)/text-input";

export default function TextInputSizes() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <TextInput size="small" label="Small" placeholder="플레이스홀더" hint="도움말" />
      <TextInput size="medium" label="Medium" placeholder="플레이스홀더" hint="도움말" />
      <TextInput size="large" label="Large" placeholder="플레이스홀더" hint="도움말" />
    </div>
  );
}
