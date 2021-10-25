<script>
  export let text
  let show = false

  const toggle = () => {
    show = !show
    console.log(show)
  }
</script>

<div>
  <button 
    role="menu"
    type="button"
    on:click={toggle}
  >
    <span role="menu">{text}</span>
    <i 
      class="i-dropdown"
      role="menu"
    ></i>
  </button>
  <div id="items" class:show={show} >
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
    justify-content: space-between;
    flex-direction: row;
    box-sizing: border-box;
	  height: 100%;
	  border: none;
	  font-size: 1rem;
    font-weight: normal;
	  cursor: pointer;
    width: 100%;
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

  #items {
    display: none;
  }

  .show {
    display: flex !important;
  }
</style>