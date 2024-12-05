<script lang="ts">
  export let color = "black"
</script>

<h4 style="--color:{color}">
  <slot />
</h4>

<style>
  h4 {
    margin: 0;
    display: flex;
    justify-content: space-between;
    color: var(--color);
  }
</style>