import { z } from "zod";

/**
 * Contact Form Validation Schema
 * Ensures type-safe, validated contact form submissions
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters")
    .regex(/^[^<>]*$/, "Message cannot contain HTML tags"),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;

/**
 * Portfolio Project Validation Schema
 * Used for validating project data structure
 */
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  url: z.string().url(),
  images: z.array(z.string().url()).min(1),
  tags: z.array(z.string()).min(1),
  metrics: z.string(),
  metricContext: z.string(),
});

export type ProjectType = z.infer<typeof ProjectSchema>;

/**
 * Newsletter Subscription Schema
 * For future email list functionality
 */
export const NewsletterSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
});

export type NewsletterType = z.infer<typeof NewsletterSchema>;
