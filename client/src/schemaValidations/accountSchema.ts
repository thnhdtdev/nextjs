import z from "zod";

export const RegisterSchema = z
	.object({
		name: z.string().min(2).max(256),
		email: z.string().email(),
		password: z.string().min(6).max(100),
		confirmPassword: z.string().min(6).max(100)
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"]
			});
		}
	});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
