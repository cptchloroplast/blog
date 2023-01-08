<script lang="ts">
  export let item: Navigation
  
  import Dropdown from "./Dropdown.svelte"
  import Icon from "../Icon.svelte"
  
  const {text, href, external, children, icon} = item
</script>

{#if children}
  <Dropdown text={text}>
    {#each children as child}
      {#if !child.href}
        <span class="item child">{child.text}</span>
      {:else if !child.external}
        <a class="item child" href={child.href} title={child.text}>
          <span>{child.text}</span>
          {#if child.icon}
            <Icon icon={child.icon} color="white" />
          {/if}
        </a>
      {:else}
        <a class="item child" href={child.href} title={child.href} target="_blank" rel="noreferrer">
          <span>{child.text}</span>
          <Icon icon="external" />
        </a>
      {/if}
    {/each}
  </Dropdown>
{:else if !href}
  <span class="item">{text}</span>
{:else if !external}
  <a class="item" href={href} title={text}>
    <span>{text}</span>
      {#if icon}
        <Icon icon={icon} color="white" />
      {/if}
    </a>
{:else}
  <a class="item" href={href} title={href} target="_blank" rel="noreferrer">
    <span>{text}</span>
    <Icon icon="external" />
  </a>
{/if}

<style>
  a {
    justify-content: space-between;
    gap: 8px;
  }

  .item {
    padding: 8px 16px;
    color: white;
    background-color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 1rem;
    font-weight: normal;
  }

  .item:hover, .item:focus {
    color: white;
    background-color: dimgray;
  }

  .item:active {
    color: white;
    background-color: darkslategray;
  }

  .child {
    color: black;
    background-color: white;
  }

  .child:hover, .child:focus {
    color: black;
    background-color: lightgray;
  }

  .child:active {
    color: black;
    background-color: slategray;
  }

   /** mobile */
   @media screen and (max-width: 1000px) {
    .item {
      padding: 8px;
    }
}
</style>