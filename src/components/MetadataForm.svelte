<script lang="ts">
  import type { Metadata } from "@schemas"
  import { Button, Form, TextArea } from "./forms"
  import { Icon } from "./ui"
  export let metadata: Metadata
  const json = JSON.stringify(metadata, null, 2)
  const rows = (json.match(/\n/g) || []).length + 1
</script>
  <Form
    action="admin/metadata"
    method="POST"
    clear={false}
  >
    <TextArea 
      name="metadata"
      value={json}
      rows={rows}
      required
    />
    <Button title="Save">
      <Icon icon="success" color="white" size="large" />
    </Button>
</Form>
