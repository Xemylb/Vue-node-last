<template>
    <div v-if="post" class="single-post">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1 class="single-post__title">{{post.title}}</h1>
                    <div class="single-post__top-block">
                        <div class="single-post__date">Дата публикации: {{post.date}}   </div>
                        <!--<div class="single-post__post-control"><div class="btn-group">-->
                            <!--&lt;!&ndash;<button type="button" class="btn btn-sm btn-primary" (click)="quickEdit(post)">Quick edit</button>&ndash;&gt;-->
                        <!--</div></div>-->
                    </div>
                    <div class="single-post__content clearfix">
                        <img class="img-fluid single-post__image" v-bind:src="post.image" v-bind:alt="post.title">
                        <div class="single-post__description">
                        {{post.description}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: "post",
        data(){
            return{
                post:{

                }
            }
        },
        mounted: function() {
            let id = this.$route.params.id;
                axios.post('http://localhost:3001/getOne', qs.stringify({'id':id}))
                    .then(response => {
                        this.post = response.data;
                    }).catch(e => {
                    this.errors.push(e)
                });
        }
    }
</script>

<style lang="sass"  scoped>
    .single-post__image
        float: left
        width: 40%
        margin-right: 10px


    .single-post__date
        color: gray
        margin-right: 20px

    .single-post__top-block
        display: flex
        align-items: center
        margin-bottom: 20px

    .single-post__description
        text-align: left
</style>