// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { use, useEffect, useState } from "react";

export default function App() {
	const [amount, setAmount] = useState("");
	const [convertFrom, setConvertFrom] = useState("CAD");
	const [convertTo, setConvertTo] = useState("INR");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		async function getConverted() {
			try {
				setError("");
				if (amount <= 0) {
					setOutput("");
					return;
				}
				if (convertFrom === convertTo) {
					setOutput("Can't convert between same currency");
					return;
				}
				const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`, {
					signal: controller.signal,
				});
				if (!res.ok) throw new Error("Something went wrong with fetching data");
				const data = await res.json();
				console.log(data);
				const { rates } = data;
				console.log(rates[Object.keys(rates)[0]]);
				setOutput(rates[Object.keys(rates)[0]]);
			} catch (error) {
				console.log(error);
				if (error.name !== "AbortError") setError(error.message);
			}
		}

		getConverted();

		return () => {
			controller.abort();
		};
	}, [amount, convertFrom, convertTo]);

	return (
		<div>
			<input
				type="number"
				value={amount}
				onChange={(event) => {
					setAmount(event.target.value);
				}}
			/>
			<select
				value={convertFrom}
				onChange={(event) => {
					setConvertFrom(event.target.value);
				}}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<select
				value={convertTo}
				onChange={(event) => {
					setConvertTo(event.target.value);
				}}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			{!output && !error && <p></p>}
			{!output && error && <p>{error}</p>}
			{output && (
				<p>
					{output} {convertTo}
				</p>
			)}
		</div>
	);
}
