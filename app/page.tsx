import Link from "next/link";

export default function HomePage() {
    return (
        <main>
            <h1 className="bg-red-500 text-white p-10 text-2xl">
                Homepage
            </h1>
                <button>
                    <Link href="/product">
                        Go to Product Page
                    </Link>
                </button>
                <button>
                    <Link href="/cart">
                        Go to Card Page
                    </Link>
                </button>
        </main>
    );
}
