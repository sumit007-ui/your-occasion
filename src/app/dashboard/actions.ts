"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function cancelInquiryAction(inquiryId: string, message: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Verify the inquiry belongs to the user
  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("id, status, user_id")
    .eq("id", inquiryId)
    .eq("user_id", user.id)
    .single();

  if (!inquiry) return { error: "Inquiry not found" };
  if (inquiry.status === "confirmed") return { error: "Confirmed inquiries cannot be cancelled." };

  // Update inquiry status to cancelled
  const { error: updateError } = await supabase
    .from("inquiries")
    .update({
      status: "cancelled",
      cancellation_message: message || null,
      cancelled_at: new Date().toISOString(),
    })
    .eq("id", inquiryId)
    .eq("user_id", user.id);

  if (updateError) return { error: updateError.message };

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/dossier/${inquiryId}`);
  return { success: true };
}
