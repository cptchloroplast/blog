<button type="submit">
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
</style>