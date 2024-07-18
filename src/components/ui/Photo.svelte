<script lang="ts">
  export let src: string
  export let alt: string
</script>

<div>
  <img src={src} alt={alt}>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    border-radius: 2px;
    width: 100%;
  }
</style>