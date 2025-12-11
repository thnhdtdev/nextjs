"use client"

import Link from "next/link";
import {Button} from "@/src/components/ui/button";
import {toast} from "sonner";

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="p-10 text-2xl font-bold mb-8">
                Homepage
            </h1>
            <div className="flex gap-4">
                <Link href="/product">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition">
                        Go to Product Page
                    </button>
                </Link>
                <Link href="/cart">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition">
                        Go to Cart Page
                    </button>
                </Link>

       <Button variant="destructive">Destructive</Button>


                <Button
                    variant="destructive"
                    onClick={() =>
                        toast("Event has been created", {
                            description: "Sunday, December 03, 2023 at 9:00 AM",
                            action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                        })
                    }
                >
                    Show Toast
                </Button>
            </div>
        </main>
    );
}
