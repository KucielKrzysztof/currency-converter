export default function Output({ isLoading, output, error, convertTo }) {
	return (
		<>
			{isLoading && <p>Loading...</p>}
			{!output && !error && <p> </p>}
			{!output && error && <p>{error}</p>}
			{!isLoading && output && (
				<>
					Result:
					<p>
						{output} {convertTo}
					</p>
				</>
			)}
		</>
	);
}
