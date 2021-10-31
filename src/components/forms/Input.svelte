<script lang="ts">
  export let name
  export let label
  export let placeholder
  export let required = false
  export let type: "text" | "email" = "text"
</script>

<label>
  <span>{label}</span>
  <input 
    name={name}
    placeholder={placeholder}
    required={required}
    type={type}
  />
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  input {
    padding: 10px;
  }
</style>