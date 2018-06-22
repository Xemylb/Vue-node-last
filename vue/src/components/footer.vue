<template>

    <footer class="text-muted footer bg-dark">
        <div class="container">
            <div class="d-flex justify-content-between">
                <p>Footer Exemple</p>
                <p>@copyright 2018</p>
            </div>

        </div>
    </footer>

</template>

<script>
    export default {
        name: "footer",
        template: '<customFooter/>',
        data(){
            return{
                title: 'Footer'
            }
        }
    }
</script>

<style lang="sass" scoped>
.footer
    padding: 15px 0 0 0
    p
        color: #fff

</style>