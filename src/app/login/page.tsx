import { LoginForm } from "@/components/auth/LoginForm"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Private Access - Your Occasion",
  description: "Login to your private office.",
}

export default function LoginPage() {
  return (
    <AuthWrapper 
      title="Private Office" 
      subtitle="Enter your credentials to access your curations and event portfolio."
    >
      <LoginForm />
    </AuthWrapper>
  )
}
