export default function Input({ amount, setAmount }) {
	return (
		<>
			<span>Amount:</span>
			<input
				type="number"
				value={amount}
				onChange={(event) => {
					setAmount(event.target.value);
				}}
			/>
		</>
	);
}
