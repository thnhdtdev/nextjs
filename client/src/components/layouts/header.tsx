import { ModeToggle } from "@/components/layouts/toggleMode";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
	return (
		<div className="flex justify-between">
			<div>App</div>
			<div className="flex items-center gap-4">
				<div className="flex gap-2 items-center">
					<Button className="px-8" variant="outline" size="icon">
						<Link href="/login">Login</Link>
					</Button>
					<Button className="px-8" variant="outline" size="icon">
						<Link href="/register">Register</Link>
					</Button>
				</div>
				<ModeToggle />
			</div>
		</div>
	);
};

export default Header;
