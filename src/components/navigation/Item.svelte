<script lang="ts">
  import Dropdown from "./Dropdown.svelte"
  
  export let item: Nav
  
  const {text, href, external, children} = item
</script>

{#if children}
  <Dropdown text={text}>
    {#each children as child}
      {#if !child.href}
        <span class="item">{child.text}</span>
      {:else if !child.external}
        <a class="item" href={child.href} title={child.text}>{child.text}</a>
      {:else}
        <a class="item" href={child.href} title={child.text} target="_blank">
          <span>{child.text}</span>
          <i class="i-external"></i>
        </a>
      {/if}
    {/each}
  </Dropdown>
{:else if !href}
  <span class="item">{text}</span>
{:else if !external}
  <a class="item" href={href} title={text}>{text}</a>
{:else}
  <a class="item" href={href} title={text} target="_blank">
    <span>{text}</span>
    <i class="i-external"></i>
  </a>
{/if}

<style>
  a {
    width: 100%;
    justify-content: space-between;
  }

  .item {
    padding: 8px;
    color: white;
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
</style>