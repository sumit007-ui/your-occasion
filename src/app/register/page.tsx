import { RegisterForm } from "@/components/auth/RegisterForm"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inquire - Your Occasion",
  description: "Begin your journey with Your Occasion.",
}

export default function RegisterPage() {
  return (
    <AuthWrapper 
      title="Begin the Journey" 
      subtitle="Register to access the private office and curate your bespoke event portfolio."
    >
      <RegisterForm />
    </AuthWrapper>
  )
}
