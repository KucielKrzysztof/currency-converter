import SelectOption from "./SelectOption";
import popularCurrencyCodes from "./currencies";

export default function Select({ children, isLoading, value, onChange }) {
	return (
		<>
			<span>{children}</span>
			<select
				disabled={isLoading}
				value={value}
				onChange={(event) => {
					onChange(event.target.value);
				}}
			>
				{popularCurrencyCodes.map((code) => (
					<SelectOption key={code} code={code} />
				))}
			</select>
		</>
	);
}
