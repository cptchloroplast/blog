<script>
  export let disabled = false
</script>

<button
  disabled={disabled}
  type="submit"
>
  <slot />
</button>

<style>
  button {
    background-color: black;
    border: none;
    padding: 10px 20px;
    cursor: pointer; 
    border-radius: 5px;
    flex-grow: 1;
  }

  button:hover {
    background-color: darkslategray;
  }

  button:disabled {
    cursor: wait;
    background-color: lightslategray;
  }
</style>