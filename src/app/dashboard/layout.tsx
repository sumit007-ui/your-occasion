import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { TopNavBar } from "@/components/TopNavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Your Occasion",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Note: Middleware handles /admin, but we should also protect /dashboard
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="pt-24 px-4 md:px-8 max-w-[1440px] mx-auto min-h-[calc(100vh-100px)]">
        {children}
      </div>
    </div>
  );
}
