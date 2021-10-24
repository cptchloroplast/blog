<script lang="ts">
  import Item from "./Item.svelte"

  export let logo

  const nav: NavItem[] = [
    {
      text: "Posts",
      href: "/posts"
    }
  ]
</script>

<nav>
  <div class="buttons">
    <a href="/" title="ben.okkema.org">
      <img
        alt="Logo" 
        src={logo}
      >
    </a>
    <i class="i-menu"></i>
  </div>
  <div class="links">
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
    margin: 5px;
  }

  i {
    display: none;
    cursor: pointer;
    margin: 10px;
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

  @media screen and (max-width: 1000px) {
    nav {
      flex-direction: column;
    }

    i {
      display: unset;
    }
    
    .links {
      flex-direction: column;
      display: none;
    }
  }

</style>