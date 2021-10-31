<script lang="ts">
  export let name
  export let label = ""
  export let placeholder = ""
  export let required = false
  export let rows = 5
</script>

<label>
  <span>{label}</span>
  <textarea 
    name={name}
    placeholder={placeholder}
    required={required}
    rows={rows}
  />
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  textarea {
    padding: 10px;
    border-radius: 5px;
    box-shadow: none;
    font-family: sans-serif;
    font-size: medium;
    border-color: black;
  }

  textarea:valid {
    border-color: forestgreen;
  }

  textarea:focus:invalid {
    border-color: firebrick;
  }
</style>