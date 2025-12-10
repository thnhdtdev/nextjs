import Link from "next/link";

export default function ProductPage() {
    return (
        <main>
            <button>
                <Link href="/detailProduct">
                    Go to detail Product Page
                </Link>
            </button>
        </main>
    );
}