<script lang="ts"></script>

<footer>
    <small>
        <slot></slot>
    </small>
    <small>
        <slot name="right"></slot>
    </small>
</footer>
  
  <style>
    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 8px;
        flex-shrink: 0;
        background-color: black;
        color: white;
    }
</style>  