"use client";

import { useState } from "react";

interface Todo {
	id: number;
	title: string;
	note: string;
	dueDate: string;
	priority: string;
	tagColor: string;
	isCompleted: boolean;
	createdAt: string;
}

export default function TodoPage() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [priority, setPriority] = useState("");
	const [tagColor, setTagColor] = useState("");

	const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all");
	const handleAddTodo = (e) => {
		e.preventDefault();

		if (!title.trim()) {
			alert("Please enter title");
		}

		const newTodo: Todo = {
			id: Date.now(),
			title: title,
			note: note,
			dueDate: dueDate,
			priority: priority,
			tagColor: tagColor,
			isCompleted: false,
			createdAt: new Date().toISOString()
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

	const filteredTodos = todos.filter((todo) => {
		if (filterStatus === "active") return !todo.isCompleted;
		if (filterStatus === "completed") return todo.isCompleted;
		return true;
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
								onChange={(e) => setPriority(e.target.value as any)}
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

			{/* LIST  */}
			<div className="w-1/2">
				<h2 className="text-xl font-bold mb-4 text-gray-800">Danh Sách ({todos.length})</h2>

				<div className="bg-white p-1 rounded-lg shadow-sm border flex text-sm">
					{(["all", "active", "completed"] as const).map((status) => (
						<button
							key={status}
							onClick={() => setFilterStatus(status)}
							className={`px-3 py-1.5 rounded-md capitalize transition-colors
                            ${
								filterStatus === status
									? "bg-blue-100 text-blue-700 font-bold"
									: "text-gray-500 hover:bg-gray-50"
							}`}
						>
							{status}
						</button>
					))}
				</div>
				<div className="space-y-3">
					{filteredTodos.length === 0 && (
						<p className="text-gray-400">Chưa có công việc nào...</p>
					)}

					{filteredTodos.map((todo) => (
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

								<div className="flex-1">
									<div className="flex justify-between items-start">
										<h3
											className={`font-bold text-lg ${todo.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}
										>
											{todo.title}
										</h3>

										<span
											className={`px-2 py-1 text-xs rounded font-bold uppercase 
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
									</div>

									<p className="text-gray-600 text-sm mt-1">{todo.note}</p>
									<div className="text-xs text-gray-400 mt-2">
										{todo.dueDate
											? `Hạn: ${new Date(todo.dueDate).toLocaleString()}`
											: "Không có thời hạn"}
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
