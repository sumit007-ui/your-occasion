import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password - Your Occasion",
  description: "Recover access to your private office.",
}

export default function ResetPasswordPage() {
  return (
    <AuthWrapper 
      title="Recover Access" 
      subtitle="Enter your email to receive a secure recovery link and regain access to your curations."
    >
      <ResetPasswordForm />
    </AuthWrapper>
  )
}
