<script>
  export let text

  import { Icon } from "."

  let show = false

  const toggle = () => show = !show
  const close = (event) => {
    if (!event.target.matches('[role="menu"]')) show = false
  }
</script>

<svelte:window on:click={close} />

<div>
  <button 
    role="menu"
    type="button"
    title={text}
    on:click={toggle}
  >
    <span role="menu">{text}</span>
    <Icon icon="dropdown" role="menu" color="white" />
  </button>
  <div id="items" class:show={show} >
    <slot/>
  </div>
</div>

<style>
  button {
    padding: 8px;
    background-color: black;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    box-sizing: border-box;
	  border: none;
	  font-size: medium;
    font-weight: normal;
    font-family: sans-serif;
	  cursor: pointer;
    width: 100%;
    height: 100%;
  }

  button:hover, button:focus {
    color: white;
    background-color: dimgray;
  }

  button:active {
    color: white;
    background-color: darkslategray;
  }

  span {
    padding: 0px 8px;
    margin-right: 8px;
  }

  #items {
    display: none;
    flex-direction: column;
    position: absolute;
    min-width: fit-content;
    z-index: 1;
  }

  .show {
    display: flex !important;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  /** mobile */
  @media screen and (max-width: 1000px) {

    span {
      padding: unset;
    }

    #items {
      position: static;
      width: auto;
    }
  }
</style>