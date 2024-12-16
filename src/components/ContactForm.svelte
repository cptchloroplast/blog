<script lang="ts">
  import { Button, Captcha, Form, Input, TextArea, Icon } from "@components/ui"
  const sitekey = process.env.HCAPTCHA_SITEKEY
</script>

<Form
  action="message"
  method="POST"
>
  <div class="column">
    <Input 
      name="email"
      label="Email"
      placeholder="me@domain.tld"
      type="email"
      required
    />
    <TextArea
      name="message"
      label="Message"
      placeholder="No spam please!"
      required 
    />
    <div class="row">
      <Captcha sitekey={sitekey} />
      <Button title="Send!">
        <Icon icon="send" color="white" size="large" />
      </Button>
    </div>
  </div>
</Form>

<style>
  .column {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
</style>