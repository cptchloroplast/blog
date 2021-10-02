<script>
  export let text
</script>

<div>
  <button type="button">
    <span>{text}</span>
    <i class="i-dropdown"></i>
  </button>
  <div>
    <slot/>
  </div>
</div>

<style>
  button {
    padding: 10px;
    background-color: black;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    flex-direction: row;
    box-sizing: border-box;
	  height: 100%;
	  border: none;
	  font-size: 1rem;
    font-weight: normal;
	  cursor: pointer;
  }

  span {
    font-size: 1rem;
    font-weight: normal;
  }

  button:hover, button:focus {
    color: white !important;
    background-color: darkslategray !important;
  }

  i {
    margin-left: 10px; 
  }
</style>