import React, { useState, useEffect } from "react";
function App() {
	const [merchants, setMerchants] = useState(null);
	useEffect(() => {
		getMerchants();
	}, []);
	function getMerchants() {
		fetch("http://localhost:3001")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setMerchants(data);
			});
	}
	function createMerchant() {
		let name = prompt("Enter merchant name");
		let email = prompt("Enter merchant email");
		fetch("http://localhost:3001/merchants", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email }),
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				alert(data);
				getMerchants();
			});
	}
	function deleteMerchant() {
		let id = prompt("Enter merchant id");
		fetch(`http://localhost:3001/merchants/${id}`, {
			method: "DELETE",
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				alert(data);
				getMerchants();
			});
	}
	return (
		<div>
			<ul>
				{merchants ? (
					merchants.map((merchant) => (
						<li key={merchant.id.toString()}>
							({merchant.id}) - {merchant.name} - {merchant.email}
						</li>
					))
				) : (
					<li>Não há dados do comerciantes disponíveis</li>
				)}
			</ul>
			<br />
			<button onClick={createMerchant}>Adicionar Comerciante</button>
			<br />
			<button onClick={deleteMerchant}>Excluir Comerciante</button>
		</div>
	);
}
export default App;
