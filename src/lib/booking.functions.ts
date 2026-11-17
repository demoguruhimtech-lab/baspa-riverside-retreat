import { createServerFn } from "@tanstack/react-start";

import { bookingEnquirySchema } from "@/lib/booking-schema";

export const submitBookingEnquiry = createServerFn({ method: "POST" })
  .inputValidator(bookingEnquirySchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("booking_enquiries").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || null,
      check_in_date: data.checkIn,
      check_out_date: data.checkOut,
      guest_count: data.guests,
      room_count: data.rooms,
      room_category: data.roomCategory,
      message: data.message,
    });

    if (error) {
      console.error("Unable to store a resort booking enquiry.", error.code);
      return { success: false as const };
    }

    return { success: true as const };
  });