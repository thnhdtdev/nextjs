"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import { DialogDelete } from "@/components/dialogDelete";
type Priority = "low" | "medium" | "high";
type FilterStatus = "all" | "active" | "completed";
type SortOption = "created" | "dueDate" | "priority";

interface Todo {
	id: number;
	title: string;
	note: string;
	dueDate: string;
	priority: Priority;
	tagColor: string;
	isCompleted: boolean;
	createdAt: number;
}

interface FilterButtonsProps {
	filterStatus: FilterStatus;
	setFilterStatus: (status: FilterStatus) => void;
}

interface SortSelectProps {
	sortBy: SortOption;
	setSortBy: (sortBy: SortOption) => void;
}

//filter
function FilterButtons({ filterStatus, setFilterStatus }: FilterButtonsProps) {
	const FILTER_OPTIONS = ["all", "active", "completed"] as const;
	return (
		<div className="flex gap-1 text-sm bg-gray-100 p-1 rounded">
			{FILTER_OPTIONS.map((status) => {
				const active = filterStatus === status;
				return (
					<button
						key={status}
						onClick={() => setFilterStatus(status)}
						className={`px-3 py-1.5 rounded capitalize transition-all ${
							active
								? "bg-white text-blue-600 shadow font-bold"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						{status}
					</button>
				);
			})}
		</div>
	);
}

//sort
function SortSelect({ sortBy, setSortBy }: SortSelectProps) {
	const SORT_OPTIONS = [
		{ value: "created", label: "Created date (Newest)" },
		{ value: "dueDate", label: "Deadline (Urgent first)" },
		{ value: "priority", label: "Priority (Highest)" }
	] as const;

	return (
		<div className="flex items-center gap-2 text-sm">
			<span className="text-gray-500">Sort by:</span>
			<select
				value={sortBy}
				onChange={(e) => setSortBy(e.target.value as SortOption)}
				className="p-1.5 border rounded bg-gray-50 outline-none focus:border-blue-500 cursor-pointer"
			>
				{SORT_OPTIONS.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default function TodoPage() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [priority, setPriority] = useState<Priority>("medium");
	const [tagColor, setTagColor] = useState("");

	const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
	const [sortBy, setSortBy] = useState<SortOption>("created");

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			toast.error("Please enter title");
			return;
		}

		const newTodo: Todo = {
			id: Date.now(),
			title: title,
			note: note,
			dueDate: dueDate,
			priority: priority,
			tagColor: tagColor,
			isCompleted: false,
			createdAt: Date.now()
		};

		setTodos([newTodo, ...todos]);

		setTitle("");
		setNote("");
		setDueDate("");
		setPriority("medium");
	};

	const handlecompletedTodo = (id: number) => {
		const updateTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isCompleted: !todo.isCompleted };
			}
			return todo;
		});
		setTodos(updateTodos);
	};

	const handleDeleteTodo = (id: number) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
		toast.success("Deleted successfully");
	};

	const processedTodos = todos
		.filter((todo) => {
			if (filterStatus === "active") return !todo.isCompleted;
			if (filterStatus === "completed") return todo.isCompleted;
			return true;
		})

		//sort
		.sort((a, b) => {
			if (sortBy === "created") {
				return b.createdAt - a.createdAt;
			}

			if (sortBy === "dueDate") {
				const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
				const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
				return dateA - dateB;
			}

			if (sortBy === "priority") {
				const score = { high: 3, medium: 2, low: 1 };
				return score[b.priority] - score[a.priority];
			}
			return 0;
		});

	return (
		<div className="min-h-screen bg-gray-100 p-8 flex gap-6 justify-center">
			<div className="w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
				<h2 className="text-xl font-bold mb-4 text-gray-800">Todo</h2>

				<form onSubmit={handleAddTodo} className="flex flex-col gap-3">
					<label className="font-medium text-sm">
						Title <span className="text-red-500">*</span>
					</label>

					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="p-2 border rounded focus:outline-blue-500"
					/>
					<label className="font-medium text-sm">Note</label>
					<textarea
						value={note}
						placeholder="Note"
						onChange={(e) => setNote(e.target.value)}
						className="p-2 border rounded focus:outline-blue-500 h-24"
					/>

					<div className="flex gap-2">
						<div className="w-1/2">
							<label className="font-medium text-sm block mb-1">Due date</label>
							<input
								type="datetime-local"
								value={dueDate}
								onChange={(e) => setDueDate(e.target.value)}
								className="w-full p-2 border rounded text-sm"
							/>
						</div>

						<div className="w-1/2">
							<label className="font-medium text-sm block mb-1">Priority</label>
							<select
								value={priority}
								onChange={(e) => setPriority(e.target.value as Priority)}
								className="w-full p-2 border rounded text-sm"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
					</div>
					<label className="font-medium text-sm">Tag Color</label>
					<div className="flex items-center gap-2">
						<input
							type="color"
							value={tagColor}
							onChange={(e) => setTagColor(e.target.value)}
							className="h-8 w-16 cursor-pointer border rounded"
						/>
					</div>
					<button
						type="submit"
						className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition"
					>
						Add
					</button>
				</form>
			</div>

			<div className="w-1/2">
				<h2 className="text-xl font-bold mb-4 text-gray-800">Todo List ({todos.length})</h2>

				<div className="bg-white p-3 rounded-lg shadow-sm border flex justify-between items-center">
					<FilterButtons filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

					<SortSelect sortBy={sortBy} setSortBy={setSortBy} />
				</div>

				<div className="space-y-3">
					{processedTodos.length === 0 && (
						<p className="text-gray-400">No tasks yet...</p>
					)}

					{processedTodos.map((todo) => (
						<div
							key={todo.id}
							className={`p-4 rounded-lg shadow-sm border-l-8 transition-all duration-200 ${todo.isCompleted ? "bg-gray-100 opacity-60" : "bg-white"}`}
							style={{ borderLeftColor: todo.tagColor }}
						>
							<div className="flex items-start gap-3">
								<input
									type="checkbox"
									checked={todo.isCompleted}
									onChange={() => handlecompletedTodo(todo.id)}
									className="mt-1.5 w-5 h-5 cursor-pointer accent-blue-600"
								/>

								<div className="flex-1 min-w-0">
									<div className="flex justify-between items-start gap-2">
										<div
											className={`font-bold text-lg min-w-0 break-all ${
												todo.isCompleted
													? "line-through text-gray-500"
													: "text-gray-800"
											}`}
										>
											{todo.title}
										</div>
										<div className="flex items-start gap-2 shrink-0">
											<span
												className={`px-2 py-1 text-xs rounded font-bold uppercase whitespace-nowrap
                            ${
								todo.priority === "high"
									? "bg-red-100 text-red-600"
									: todo.priority === "medium"
										? "bg-yellow-100 text-yellow-600"
										: "bg-green-100 text-green-600"
							}`}
											>
												{todo.priority}
											</span>

											<DialogDelete
												onClick={() => handleDeleteTodo(todo.id)}
											/>
										</div>
									</div>
									<p className="text-gray-600 text-sm mt-1 break-words">
										{todo.note}
									</p>
									<div className="text-xs text-gray-400 mt-2">
										{todo.dueDate
											? `Deadline: ${new Date(todo.dueDate).toLocaleString()}`
											: "No deadline"}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
