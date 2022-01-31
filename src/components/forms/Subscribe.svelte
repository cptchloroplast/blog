<script lang="ts">
  import Input from "./Input.svelte"
  import Button from "./Button.svelte"
  import Form from "./Form.svelte"
  import Icon from "../Icon.svelte"
</script>

<Form
  action="subscribe"
  method="POST"
>
  <div>
    <Input 
      name="email"
      label="Subscribe for the latest and greatest!"
      placeholder="me@domain.tld"
      type="email"
      required
    />
    <Button title="Subscribe!">
      <Icon icon="send" color="white" size="large" />
    </Button>
  </div>
</Form>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 8px;
  }
</style>