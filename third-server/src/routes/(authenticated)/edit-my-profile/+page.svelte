<script>
    import { enhance } from "$app/forms";


    
</script>

<div class="fill">
<form action="?/update" use:enhance>
    <input type="text" placeholder="profile bio" name="bio">
    <input type="text" placeholder="profile image address" name="img">
    <button type="submit">Confirm Changes</button>
</form>
</div>