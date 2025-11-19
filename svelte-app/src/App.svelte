<script>
	import Hijo from './Hijo.svelte'
	export let name;

	let contador = 0;
	function incrementar(){
		contador = contador + 1;
	}

	function saludar(){
		alert("hola");
	}
</script>

<main>
	<!-- <h1>{name} es mi amigo!</h1> -->
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
	<h1>Contar: {contador}</h1>
	<button on:click={incrementar}>Sumar</button>
	<Hijo texto = "Guardar" color = "green"></Hijo>
	<Hijo texto = "Borrar" color = "red"></Hijo>
	<input type= "text" placeholder="Tu nombre" bind:value= {name}>
	<Hijo texto = "Saludar" color = "pink" on:click={saludar}>Saludar</Hijo>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>