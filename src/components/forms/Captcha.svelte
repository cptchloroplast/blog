<script>
  export let sitekey
</script>

<svelte:head>
  <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<div class="h-captcha" data-sitekey={sitekey}></div>