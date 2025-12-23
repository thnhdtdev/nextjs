import z from "zod";

const configScheme = z.object({
	NEXT_PUBLIC_API_URL: z.string()
});

const parsedConfig = configScheme.safeParse({
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
});

if (!parsedConfig.success) {
	console.error(parsedConfig.error.issues);
	throw new Error("Invalid config");
}

const envConfig = parsedConfig.data;
export default envConfig;
