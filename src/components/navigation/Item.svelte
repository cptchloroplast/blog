<script lang="ts">
  import Dropdown from "./Dropdown.svelte"
  
  export let item: NavItem
  
  const {text, href, external, child} = item
</script>

{#if child}
  <Dropdown class="item" text={text} />
{:else if !href}
  <span class="item">{text}</span>
{:else if !external}
  <a class="item" href={href}>{text}</a>
{:else}
  <a class="item" href={href} target="_blank">
    <span>{text}</span>
    <i class="i-external"></i>
  </a>
{/if}

<style>
  a {
    justify-content: space-between;
  }

  .item {
    padding: 10px;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 1rem;
    font-weight: normal;
  }

  .item:hover, .item:focus {
    color: white !important;
    background-color: darkslategray !important;
  }
</style>