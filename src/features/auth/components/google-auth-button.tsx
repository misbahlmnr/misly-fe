import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/features/auth/components/google-icon"

export function GoogleAuthButton({ label }: { label: string }) {
  return (
    <Button variant="outline" type="button" className="mb-6 w-full">
      <GoogleIcon className="size-5" />
      {label}
    </Button>
  )
}
