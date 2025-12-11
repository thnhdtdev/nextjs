import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";

export function DialogDelete({ onClick }) {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="link" className="text-gray-400 hover:text-red-500 ml-3">
						<Trash2 size={20} />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Remove Product</DialogTitle>
						<DialogDescription>
							Are you sure you want to remove this item from your cart? <br />
							This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button variant="destructive" type="submit" onClick={onClick}>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
