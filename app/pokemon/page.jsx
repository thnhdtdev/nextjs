"use client";

import { Fragment, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchPokemons({ pageParam = "https://pokeapi.co/api/v2/pokemon?limit=15" }) {
	const res = await fetch(pageParam);
	if (!res.ok) throw new Error("Failed to fetch Pokemon");
	return res.json();
}

export default function ProductPage() {
	const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage, status } =
		useInfiniteQuery({
			queryKey: ["pokemon"],
			queryFn: fetchPokemons,
			getNextPageParam: (lastPage) => lastPage.next ?? undefined
		});

	const observerTarget = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					console.log(entries);
					fetchNextPage();
				}
			},
			{ threshold: 1.0 }
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}
		return () => {
			if (observerTarget.current) {
				observer.unobserve(observerTarget.current);
			}
		};
	}, [hasNextPage, fetchNextPage]);

	if (status === "pending") return <p className="p-4">Loading...</p>;
	if (status === "error") return <p className="p-4 text-red-500">Error: {error.message}</p>;

	return (
		<div className="p-4">
			<div className="space-y-2">
				{data.pages.map((page, i) => (
					<Fragment key={i}>
						{page.results.map((pokemon) => (
							<div className="p-4 border bg-gray-50">
								<p className="font-medium text-red-600">{pokemon.name}</p>
							</div>
						))}
					</Fragment>
				))}
			</div>

			{hasNextPage && <div ref={observerTarget} className="h-16 border border-red-600" />}
		</div>
	);
}
