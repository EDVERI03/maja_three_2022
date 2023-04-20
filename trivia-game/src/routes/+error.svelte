<script>
    import { page } from '$app/stores';
</script>

<div class="errorbox">
    <h1>ERROR: {$page.error?.message}</h1>
</div>
