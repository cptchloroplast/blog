<script lang="ts">
  import { Icon, Button, Form, Input } from "@components/ui"
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