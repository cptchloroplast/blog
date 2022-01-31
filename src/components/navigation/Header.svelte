<script lang="ts">
  export let logo
  
  import Item from "./Item.svelte"
  
  let show = false
  let button

  const nav: Nav[] = [
    {
      text: "Posts",
      href: "/posts"
    },
    {
      text: "Projects",
      children: [
        {
          text: "Okkema Labs",
          href: "https://okkema.org",
          external: true,
        },
        {
          text: "Rayün Handmade",
          href: "https://rayunhandmade.com",
          external: true,
        },
        {
          text: "Crank Tools",
          href: "https://crank.tools",
          external: true,
        },
      ]
    },
    {
      text: "Tags",
      href: "/tags"
    },
    {
      text: "Contact",
      href:"/contact"
    }
  ]

  const toggle = () => show = !show
  const close = (event) => {
    if (!event.target.matches('[role="menu"]')) show = false
  }
</script>

<svelte:window on:click={close} />

<nav>
  <div class="buttons">
    <a href="/" title="Home">
      <img
        alt="Logo" 
        src={logo}
      >
    </a>
    <button 
      role="menu"
      type="button" 
      bind:this={button}
      on:click={toggle}
    >
      <i 
        class="i-menu"
        role="menu"  
      ></i>
    </button>
  </div>
  <div class="links" class:show={show}>
    {#each nav as item}
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

  a:hover, a:focus {
    background-color: dimgray;
  }

  a:active {
    background-color: darkslategray;
  }

  i {
    color: white;
    font-size: 30px;
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