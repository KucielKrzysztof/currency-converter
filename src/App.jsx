import { useEffect, useState } from "react";
import Select from "./assets/Select";
import Output from "./assets/Output";
import Input from "./assets/Input";

export default function App() {
	const [amount, setAmount] = useState("");
	const [convertFrom, setConvertFrom] = useState("USD");
	const [convertTo, setConvertTo] = useState("USD");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		async function getConverted() {
			try {
				setError("");
				setIsLoading(true);
				if (amount <= 0) {
					setOutput("");
					return;
				}
				if (convertFrom === convertTo) {
					setOutput(<span style={{ color: "yellow" }}>Can't convert between same currency - </span>);
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
			} finally {
				setIsLoading(false);
			}
		}

		getConverted();

		return () => {
			controller.abort();
		};
	}, [amount, convertFrom, convertTo]);

	return (
		<div className="card">
			<h2> 💶Exchange💵 Rate Calculator</h2>
			<Select value={convertFrom} onChange={setConvertFrom}>
				From:
			</Select>
			<Select value={convertTo} onChange={setConvertTo}>
				To:
			</Select>
			<Input amount={amount} setAmount={setAmount}></Input>

			<Output isLoading={isLoading} output={output} error={error} convertTo={convertTo} />
		</div>
	);
}
