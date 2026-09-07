import { z } from "zod";

export const exploreResponseSchema = z
  .object({
    displayName: z
      .string()
      .max(40, "Name must be 40 characters or fewer."),

    answer: z
      .string()
      .min(10, "Answer must be at least 10 characters.")
      .max(280, "Answer must be 280 characters or fewer."),

    anonymous: z.boolean(),
  })
  .refine(
    (data) => data.anonymous || data.displayName.trim().length >= 2,
    {
      message: "Provide a display name or post anonymously.",
      path: ["displayName"],
    },
  );

export type ExploreResponseFormValues = z.infer<typeof exploreResponseSchema>;
