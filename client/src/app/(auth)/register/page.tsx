import RegisterForm from "@/app/(auth)/register/register-form";

const Register = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="font-semibold text-3xl mb-4">Đăng ký</h1>
			<div>
				<RegisterForm />
			</div>
		</div>
	);
};

export default Register;
