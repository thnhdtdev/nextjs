"use client";

import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchPokemons({ pageParam = "https://pokeapi.co/api/v2/pokemon?limit=5" }) {
	const res = await fetch(pageParam);
	if (!res.ok) throw new Error("Failed to fetch Pokemon");
	return res.json();
}

export default function ProductPage() {
	const { data, error, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, status } =
		useInfiniteQuery({
			queryKey: ["pokemon"],
			queryFn: fetchPokemons,
			getNextPageParam: (lastPage) => lastPage.next ?? undefined
		});

	if (status === "pending") return <p>Loading...</p>;
	if (status === "error") return <p>Error: {error.message}</p>;

	return (
		<>
			{data.pages.map((page, i) => (
				<Fragment key={i}>
					{page.results.map((pokemon) => (
						<p className="text-red-600" key={pokemon.name}>
							{pokemon.name}
						</p>
					))}
				</Fragment>
			))}

			<button
				onClick={() => fetchNextPage()}
				disabled={!hasNextPage || isFetchingNextPage}
				className="border px-4 py-2 mt-4"
			>
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
						? "Load More"
						: "Nothing more to load"}
			</button>

			<div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
		</>
	);
}
