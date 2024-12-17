<script lang="ts">
  export let name
  export let label = ""
  export let placeholder = ""
  export let required = false
  export let type: "text" | "email" = "text"
  export let value = ""
</script>

<label>
  <span>{label}</span>
  <input 
    name={name}
    placeholder={placeholder}
    required={required}
    type={type}
    value={value}
  />
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  input {
    padding: 8px;
    border-radius: 4px;
    box-shadow: none;
    font-family: sans-serif;
    font-size: medium;
    border: solid black 1px;
  }

  input:focus {
    outline: solid darkslateblue 2px;
    outline-offset: -1px;
  }

  input:valid:focus {
    outline: solid forestgreen 2px;
    outline-offset: -1px;
  }

  input:focus:user-invalid {
    outline: solid firebrick 2px;
    outline-offset: -1px;
  }
</style>