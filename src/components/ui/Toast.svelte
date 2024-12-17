<script>
  import { toast } from "./toast"
  import { Icon } from "."
</script>

{#if $toast}
<div class:flash={$toast}>
  <Icon icon={toast.type} color="white" size="large" />
  <span>{$toast.text}</span>
</div>
{/if}

<style>
  div {
    visibility: hidden;
    background-color: darkslategray;
    color: white;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    bottom: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .flash {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }

  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 36px; opacity: 1;}
  }

  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 36px; opacity: 1;}
  }

  @-webkit-keyframes fadeout {
    from {bottom: 36px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
  }

  @keyframes fadeout {
    from {bottom: 36px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }
</style>