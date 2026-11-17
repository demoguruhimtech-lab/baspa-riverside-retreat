import { z } from "zod";

export const roomCategories = [
  "Economy Double Room",
  "Standard Room with Lake View",
  "Deluxe Double Room",
  "Elite Double Room",
] as const;

export const bookingEnquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your name.").max(100),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s()-]{7,19}$/, "Enter a valid phone number."),
    email: z.union([z.literal(""), z.string().trim().email().max(255)]),
    checkIn: z.string().date("Choose a valid check-in date."),
    checkOut: z.string().date("Choose a valid check-out date."),
    guests: z.coerce.number().int().min(1).max(20),
    rooms: z.coerce.number().int().min(1).max(10),
    roomCategory: z.enum(roomCategories),
    message: z.string().trim().max(1500),
  })
  .refine((details) => details.checkOut > details.checkIn, {
    message: "Check-out must be after check-in.",
    path: ["checkOut"],
  });

export type BookingEnquiryInput = z.infer<typeof bookingEnquirySchema>;

export const indicativePrices = [
  { provider: "Traveloka", price: 2345 },
  { provider: "6E Hotels", price: 2363 },
  { provider: "MakeMyTrip", price: 4148 },
  { provider: "Expedia", price: 2625 },
  { provider: "Hotels.com", price: 2625 },
] as const;