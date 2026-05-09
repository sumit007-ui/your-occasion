import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Secure Account - Your Occasion",
  description: "Update your account credentials.",
}

export default function UpdatePasswordPage() {
  return (
    <AuthWrapper 
      title="Secure Account" 
      subtitle="Define your new secure access credentials to complete the recovery process."
    >
      <UpdatePasswordForm />
    </AuthWrapper>
  )
}
