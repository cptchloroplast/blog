<script lang="ts">
  import type { Metadata } from "@schemas";
  import { Icon, Button, Form, Input, Column } from "@components/ui";
  export let metadata: Metadata;
</script>

<Form action="admin/metadata" method="PATCH" clear={false}>
  <Column>
    <Input label="Name" name="name" value={metadata.name} required />
    <Input
      label="Email"
      name="email"
      value={metadata.email}
      type="email"
      required
    />
    <Input
      label="Username"
      name="username"
      value={metadata.username}
      required
    />
    <Input label="Title" name="title" value={metadata.title} required />
    <Input
      label="Description"
      name="description"
      value={metadata.description}
      required
    />
    <Input label="Repo" name="repo" value={metadata.repo} required />
    <Button title="Save">
      <Icon icon="success" color="white" size="large" />
    </Button>
  </Column>
</Form>
