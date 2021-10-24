<script>
  export let value
  export let label
  export let placeholder
</script>

<label>{label}
  <input 
    bind:value={value} 
    placeholder={placeholder}
  />
</label>

<style>
  input {
    padding: 10px;
  }
</style>