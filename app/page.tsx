import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="bg-red-500 text-white p-10 text-2xl rounded-lg font-bold shadow mb-8">
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
            </div>
        </main>
    );
}
