<template>
    <div class="container">
        <div class="row" v-if="posts[0]">
            <div class="col-md-4" v-for="post in posts">
                <div class="card mb-4 box-shadow">
                    <img class="card-img-top img-responsive" v-bind:src="post.image"  alt="Thumbnail [100%x225]" data-holder-rendered="true">
                    <div class="card-body">
                           <div class="form-group"  v-if="editIdPost == post._id">
                               <label for="quick_edit_name" class="control-label">Название</label>
                                 <input v-bind:id="quick_edit_name" type="text" v-model="post.title">
                           </div>
                        <p class="card-title" v-else>{{post.title}}</p>
                           <div class="form-group form-group_short-descr" v-if="editIdPost == post._id">
                               <label for="quick_edit_short_descr" class="control-label">Краткое описание</label>
                        <input v-bind:id="quick_edit_short_descr"  type="text" v-model="post.short_description">
                           </div>
                        <p class="card-text" v-else>{{post.short_description}}</p>
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="btn-group">
                                 <router-link class="btn btn-sm btn-outline-info" tag="button" :to ="{name: 'Post', params: {id: post._id}}">Перейти</router-link>
                                <button type="button" class="btn btn-sm btn-outline-success" v-if="editIdPost == post._id" v-on:click="editSave(post)">Save</button>
                                <button type="button" class="btn btn-sm btn-outline-success" v-on:click="editPost(post._id)" v-else>Отредактировать</button>
                                <button type="button" class="btn btn-sm btn-outline-danger" v-on:click="removePost(post._id)">Удалить</button>
                            </div>
                        </div>
                        <p class="card-body__date">
                            <small class="text-muted">Дата: {{post.date}}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <h3>Постов нет</h3>
        </div>
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6">
                <div class="form">
                    <h3>Добавить пост</h3>
                    <div class="form-group">
                        <label for="input-text" class="control-label">Название</label>
                        <input v-model="newPostData.title" type="text" class="form-control"  placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="input-text" class="control-label">Краткое описание</label>
                        <textarea v-model="newPostData.short_description"  class="form-control"  placeholder=""></textarea>
                    </div>
                    <div class="form-group">
                        <label for="input-text" class="control-label">Полное Описание</label>
                        <textarea v-model="newPostData.description" class="form-control"  placeholder=""></textarea>
                    </div>
                    <div class="btn btn-success" v-on:click="createPost()">Создать пост</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: "postlist",
        data(){
            return {
                    msg: 'Welcome to Your Vue.js App',
                    posts: [],
                    testReq: '',
                    newPostData: {
                        title: '',
                        date: '',
                        short_description: '',
                        description: '',
                        image: 'https://i0.wp.com/aftoncs.com/wp-content/uploads/2014/04/bokeh-cover-bg.jpg',
                    },
                    editIdPost:'',

            }
        },
        methods: {
            getAllPosts: function(){
                axios.post('http://localhost:3001/getPosts')
                    .then(response => {
                        this.posts = response.data;
                        console.log(this.posts);
                    }).catch(e => {
                    this.errors.push(e)
                });
            },
            removePost: function(id){
                axios.post('http://localhost:3001/removePost', qs.stringify({ 'id': id})).then(response => {
                    console.log(response.data);
                    if(response.data.answer){
                        console.log(111);
                        this.posts = this.posts.filter(function (elem) {
                            if(elem._id != id){
                                return elem;
                            }
                        });
                    }
                }).catch(e => {
                    this.errors.push(e)
                });


            },
            getCurrentDate: function () {
                function addZero (elem) {
                    if (+elem < 10){
                        elem = "0"+elem;
                    }
                    return elem;
                }
                let date = new Date();
                date = addZero(date.getDate()) + '.' + addZero(date.getMonth() + 1) + '.' + date.getFullYear()+ ' ' + addZero(date.getHours())+ ':'+ addZero(date.getMinutes());
                return date;
            },
            createPost: function () {
                let date = this.getCurrentDate();
                let newPost = { 'title': this.newPostData.title, 'description':  this.newPostData.description, 'short_description': this.newPostData.short_description, 'image': this.newPostData.image, 'date': date };
                axios.post('http://localhost:3001/createPost', qs.stringify(newPost)).then(response => {
                    this.posts.push(response.data)
                });
                this.newPostData.title = '';
                this.newPostData.description = '';
                this.newPostData.short_description = '';
                // this.newPostData.author = '';
            },
            editPost: function (id) {
                this.editIdPost = id;
            },
            editSave: function (newPostData) {
                this.editIdPost = '';
                axios.put('http://localhost:3001/editPost', qs.stringify({'data': newPostData})).then(response => {
                    if(response.data.answer){
                        console.log(response.data);
                    }
                }).catch(e => {
                    this.errors.push(e)
                });
            }
        },
        beforeCreate: function () {
            axios.post('http://localhost:3001/getPosts')
                .then(response => {
                    this.posts = response.data;
                    console.log(this.posts);
                }).catch(e => {
                this.errors.push(e)
            });
        },
    }
</script>

<style lang="sass" scoped>
    input, textarea
        width: 100%

    textarea
        height: 72px

    .form-group_short-descr

        input
            height: 72px

    .card-body__date
        margin-top: 10px

    .card-text
        height: 72px
        overflow: hidden
        text-align: left

    .card-title
        font-weight: 600

    .form
        padding: 20px
        background-color: #eee
</style>