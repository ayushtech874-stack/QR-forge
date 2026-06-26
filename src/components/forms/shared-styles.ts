export interface QRFormProps {
  value?: string;
  onChange: (qrValue: string) => void;
}

export const inputClassName = "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";
