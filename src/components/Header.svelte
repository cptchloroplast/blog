<script lang="ts">
  import metadata from "../metadata"
  import { Item } from "./navigation"
  import Icon from "./Icon.svelte"
  
  let show = false
  const { navigation } = metadata

  const toggle = () => show = !show
  const close = (event: any) => {
    if (!event.target.matches('[role="menu"]')) show = false
  }
</script>

<svelte:window on:click={close} />

<nav>
  <div class="buttons">
    <a href="/" title="Home">
      <img
        alt="Logo" 
        src="/img/logo.png"
      >
    </a>
    <button 
      role="menu"
      type="button" 
      on:click={toggle}
    >
      <Icon
        icon="menu"
        color="white"
        size="large"
        role="menu"
      />
    </button>
  </div>
  <div class="links" class:show={show}>
    {#each navigation as item}
      <Item item={item} />
    {/each}
  </div>
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
	  background-color: black;
	  color: white;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 32px;
    margin: 4px;
  }

  button {
    display: none;
    cursor: pointer;
    background-color: black;
    border: none;
  }

  a {
    display: flex;
  }

  a:hover, a:focus {
    background-color: dimgray;
  }

  a:active {
    background-color: darkslategray;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .links {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  /** mobile */
  @media screen and (max-width: 1000px) {
    nav {
      flex-direction: column;
    }

    button {
      display: unset;
    }
    
    .links {
      flex-direction: column;
      display: none;
    }

    .show {
      display: flex;
    }
  }

</style>