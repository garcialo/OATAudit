export default function Quine() {
	const innerText =
		"export default function Quine() { const innerText = ; console.log(innerText.substring(0, 52) + String.fromCharCode(34) + innerText + String.fromCharCode(34) + innerText.substring(52)); return (<pre><code>{innerText.substring(0, 52) + String.fromCharCode(34) + innerText + String.fromCharCode(34) + innerText.substring(52)}</code></pre>);}";
	console.log(
		innerText.substring(0, 52) +
			String.fromCharCode(34) +
			innerText +
			String.fromCharCode(34) +
			innerText.substring(52)
	);
	return (
		<pre>
			<code>
				{innerText.substring(0, 52) +
					String.fromCharCode(34) +
					innerText +
					String.fromCharCode(34) +
					innerText.substring(52)}
			</code>
		</pre>
	);
}
