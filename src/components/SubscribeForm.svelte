<script lang="ts">
  import { Button, Form, Input } from "./forms"
  import { Icon } from "./ui"
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