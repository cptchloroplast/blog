<script lang="ts">
  import Input from "./Input.svelte"
  import Button from "./Button.svelte"
  import Form from "./Form.svelte"
  import TextArea from "./TextArea.svelte"
  import Captcha from "./Captcha.svelte"
  
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
        <i class="i-send" />
      </Button>
    </div>
  </div>
</Form>

<style>
  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: end;
  }

  i {
    color: white;
    font-size: 30px;
  }
</style>