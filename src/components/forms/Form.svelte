<script lang="ts">
  import { toast } from "../../stores/toast"

  export let action
  export let method = "POST"
  export let clear = true

  const onSubmit = async (event: any) => {
    const form: HTMLFormElement = event.target
    const data = [...form.elements].reduce((result, element) => {
      if (element.name && element.value) result[element.name] = element.value
      return result
    }, {})
    const button: HTMLButtonElement = event.submitter
    button.setAttribute("disabled", "disabled")
    const response = await fetch(`/${action}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const json = await response.json<any>()
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
      if (clear) {
        form.reset()
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
  <slot />
</form>
