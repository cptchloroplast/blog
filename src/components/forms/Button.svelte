<script lang="ts">
  export let onClick: (event: MouseEvent) => void
  export let disabled = false
</script>

<button
  disabled={disabled}
  on:click={onClick}
  type="submit"
>
  <slot />
</button>

<style>
  button {
    background-color: black;
    border: none;
    padding: 8px 24px;
    cursor: pointer; 
    border-radius: 4px;
  }

  button:hover {
    background-color: dimgray;
  }

  button:active {
    background-color: darkslategray;
  }

  button:disabled {
    background-color: lightslategray;
    cursor: wait;
  }
</style>