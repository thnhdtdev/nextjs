"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import envConfig from "@/config";
import API from "@/const/api-routes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/schemaValidations/accountSchema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";

const RegisterForm = () => {
	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
			confirmPassword: ""
		}
	});

	async function onSubmit(data: RegisterSchemaType) {
		try {
			const response = await fetch(`${envConfig.NEXT_PUBLIC_API_URL}${API.REGISTER}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			const result = await response.json();

			if (!response.ok) {
				if (response.status === 422) {
					const detailError = result.errors?.[0]?.message;
					toast.error(detailError);
					// throw new Error(detailError || "Dữ liệu không hợp lệ");
				}

				// throw new Error(result.message || "Đăng ký thất bại");
			}

			toast.info("Đăng ký thành công!");
			console.log(result);
		} catch (error: any) {
			toast.error(error.message);
			console.error(error);
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-3xl">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Confirm Password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>{" "}
		</div>
	);
};

export default RegisterForm;
