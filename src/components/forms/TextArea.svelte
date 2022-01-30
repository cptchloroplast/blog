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
    gap: 4px;
  }

  textarea {
    padding: 8px;
    border-radius: 4px;
    box-shadow: none;
    font-family: sans-serif;
    font-size: medium;
    border: solid black 1px;
  }
  textarea:focus {
    outline: solid darkslateblue 2px;
    outline-offset: -1px;
  }

  textarea:valid:focus {
    outline: solid forestgreen 2px;
    outline-offset: -1px;
  }

  textarea:focus:user-invalid {
    outline: solid firebrick 2px;
    outline-offset: -1px;
  }</style>