import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex justify-center gap-3 mt-20">
			<Button className="px-10">
				<Link href="/login">Login</Link>
			</Button>
			<Button className="px-10">
				<Link href="/register">Register</Link>
			</Button>
		</div>
	);
}
