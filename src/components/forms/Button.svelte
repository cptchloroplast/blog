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
    border-radius: 3px;
  }

  button:hover {
    background-color: darkslategray;
  }

  button:disabled {
    cursor: progress;
  }
</style>