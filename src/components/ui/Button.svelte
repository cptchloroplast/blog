<script lang="ts">
  export let onClick: (event: MouseEvent) => void = () => {}
  export let disabled = false
  export let title: string | undefined
</script>

<button
  disabled={disabled}
  on:click={onClick}
  type="submit"
  title={title}
>
  <slot />
</button>

<style>
  button {
    background-color: black;
    color: white;
    font-size: 1rem;
    border: none;
    padding: 8px 24px;
    cursor: pointer; 
    border-radius: 4px;
  }

  button:hover, button:focus{
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