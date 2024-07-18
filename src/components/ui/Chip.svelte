<script lang="ts">
  export let href: string
  export let title: string
</script>


<a href={href} title={title}>
  <slot />
</a>

<style>
  a {
    color: white;
    background-color: black;
    padding: 8px;
    border-radius: 35px;
    cursor: pointer;
    text-decoration: none;
  }

  a:hover, a:focus {
    color: white;
    background-color: dimgray;
  }

  a:active {
    color: white;
    background-color: darkslategray;
  }
</style>