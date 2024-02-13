import { z } from "zod"
export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be atleast 3 characters long"),
    description: z.string().min(3, "Description Must Be Atleast 3 Characters long")
    .max(400, "Description Is Too Long!"),
    location: z.string().min(3, "Location Must Be Atleast 3 Characters Long")
    .max(400, "Location Is Too Long"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
  });