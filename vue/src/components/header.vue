<template>
    <header>
        <div class="bg-dark collapse" id="navbarHeader" style="">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8 col-md-7 py-4">
                        <h4 class="text-white">About</h4>
                        <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                    </div>
                    <div class="col-sm-4 offset-md-1 py-4">
                        <h4 class="text-white">Contact</h4>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-white">Follow on Twitter</a></li>
                            <li><a href="#" class="text-white">Like on Facebook</a></li>
                            <li><a href="#" class="text-white">Email me</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar navbar-dark bg-dark box-shadow">
            <div class="container d-flex justify-content-between">
                <router-link class="navbar-brand d-flex align-items-center" tag="a" :to ="{name: 'Home'}"> <img src="../assets/logo.png" class="img-responsive my-logo" alt="logo">
                    <strong>Vue</strong></router-link>
                <ul class="nav">
                    <li class="nav-item">
                        <router-link class="btn btn-success" tag="a" :to ="{name: 'Home'}">Home</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "header",
        template:'<customHeader/>',
        data(){
            return{
                title: 'Header'
            }
    }
    }
</script>

<style lang="sass" scoped>

.my-logo
    width: 45px
</style>