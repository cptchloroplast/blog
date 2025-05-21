<script lang="ts">
  import { Button, Form, Icon } from "@components/ui"
</script>

<Form action="admin/posts" method="POST">
  <Button title="Posts">
    <span>
      <Icon icon="wrench" color="white" size="medium" />
      Posts
    </span>
  </Button>
</Form>

<style>
  span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>