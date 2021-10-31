<script lang="ts">
  import Input from "./forms/Input.svelte"
  import Button from "./forms/Button.svelte"
  import { toast } from "../stores/toast"

  export let action
  export let method = "POST"

  const onSubmit = async (event) => {
    const data = [...event.target.elements].reduce((result, element) => {
      if (element.name && element.value) result[element.name] = element.value
      return result
    }, {})
    const button: HTMLButtonElement = event.submitter
    button.setAttribute("disabled", "disabled")
    const response = await fetch(`/api/${action}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    button.removeAttribute("disabled");
    if (!response.ok) {
      $toast = {
        text: json.message,
        type: "error",
      }
    }
		else if (json.ok) {
      $toast = {
        text: json.message,
        type: "success",
      }
		} else {
			$toast = {
        text: json.message,
        type: "reject",
      }
		}
  }
</script>

<form
  action={action}
  method={method}
  on:submit|preventDefault={onSubmit}
>
  <Input 
    name="email"
    label="Subscribe for the latest and greatest!"
    placeholder="me@domain.tld"
    type="email"
    required
  />
  <Button>
    <i class="i-send" />
  </Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  i {
    color: white;
    font-size: 30px;
  }
</style>