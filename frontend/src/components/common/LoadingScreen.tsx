import { Spinner } from "@/components/ui/spinner";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background  z-50">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-card   animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <Spinner className="size-12 text-primary" />
          <div className="absolute inset-0 size-12 bg-primary/20 rounded-full blur-xl animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Verifying your session
          </h2>
          <p className="text-sm text-muted-foreground animate-pulse">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
}
