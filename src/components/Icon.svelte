<script lang="ts">
  import type { Icon } from "../schemas"
  export let icon: Icon
  export let size: "small" | "medium" | "large" = "medium"
  export let color: "black" | "white" = "black"
  export let role: "none" | "menu" = "none"

  const sizes = {
    small: "8px",
    medium: "16px",
    large: "32px",
  }
</script>

<i
  class={`i-${icon}`} 
  style="--size:{sizes[size]};--color:{color};"
  role={role}
></i>

<style>
  i {
    font-size: var(--size);
    color: var(--color);
  }
</style>