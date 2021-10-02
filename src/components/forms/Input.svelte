<script>
  export let value
  export let placeholder
</script>

<input 
  bind:value={value} 
  placeholder={placeholder}
/>

<style>
  input {
    padding: 10px;
  }
</style>