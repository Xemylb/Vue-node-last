module.exports = function(app, posts) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    function mySetHeader(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.setHeader('Content-Type', 'application/json'); // If needed

    }
    // function mySetHeader(res) {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //     res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With'); // If needed
    // }
    app.get('/', function(req, res) {
        posts.find({}, function (err, allPosts) {

            res.render('index', { title: 'My blog', posts_list: allPosts});
        });

    });
    app.post('/getPosts', function(req, res) {
        mySetHeader(res);
        posts.find({}, function (err, allPosts) {
            res.json(allPosts);
        });

    });
    app.post('/getOne', function(req, res) {
        mySetHeader(res);
        let id = req.body.id;
        posts.findById(id, function (err, post) {
            res.json(post);
        });
    });
    // app.get('/write', isLoggedIn, function(req, res, next) {
    //     if(req.user.local.email == 'admin@gmail.com'){
    //         res.render('write');
    //     } else{
    //         res.redirect('/');
    //     }
    //
    // });
    app.post('/createPost',function (req, res){
        mySetHeader(res);
        let title = req.body.title,
            description = req.body.description,
            short_description = req.body.short_description,
            date = req.body.date,
            image = req.body.image;
        let newPost = new posts();
        newPost.title = title;
        newPost.description = description;
        newPost.short_description = short_description;
        newPost.date = date;
        newPost.image = image;

        newPost.save(function (err) {
            if (err) {
                res.status(500);
                return;
            }
        });
        //console.log(newPost);
        res.json(newPost);
    });

    app.post('/removePost', function(req, res) {
        mySetHeader(res);
        let id = req.body.id;
        //console.log(id);
        posts.findById( id, function (err , Obj) {
            Obj.remove()
        });
        res.json({answer: true})
    });

    app.put('/editPost', function(req, res) {
        mySetHeader(res);
        let data = req.body.data;
        //console.log(data);
        posts.findById(data._id , function (err , Obj) {
            Obj.title = req.body.data.title;
            Obj.description = req.body.data.description;
            Obj.short_description = req.body.data.short_description;
            Obj.date = req.body.data.date;
            Obj.save();
        });
         res.json({answer: true})
    });

    // app.post('/write',function (req, res) {
    //     var date = req.body.date;
    //     var title = req.body.title,
    //         content = req.body.content,
    //         author = req.body.author;
    //     var newPost = new posts();
    //     newPost.post.title = title;
    //     newPost.post.content = content;
    //     newPost.post.author = author;
    //     newPost.post.date = date;
    //
    //     newPost.save(function (err) {
    //         if (err) {
    //             res.status(500);
    //             return;
    //         }
    //     });
    //     res.redirect('/');
    // });

    // app.get('/post/:id', function(req, res) { //неработает
    //     var id = req.params.id;
    //     posts.findOne( {'post.title': id}, function (err , Obj) {
    //         res.render('post', { post: Obj.post});
    //     });
    // });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    // app.get('/login', function(req, res) {
    //
    //     // render the page and pass in any flash data if it exists
    //     res.render('login.jade', { message: req.flash('loginMessage') });
    // });
    //
    // // process the login form
    // // app.post('/login', do all our passport stuff here);
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect : '/profile', // redirect to the secure profile section
    //     failureRedirect : '/login', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));
    // // =====================================
    // // SIGNUP ==============================
    // // =====================================
    // // show the signup form
    // app.get('/signup', function(req, res) {
    //
    //     // render the page and pass in any flash data if it exists
    //     res.render('signup.jade', { message: req.flash('signupMessage') });
    // });
    //
    // // process the signup form
    // // app.post('/signup', do all our passport stuff here);
    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/profile', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));
    //
    // // =====================================
    // // PROFILE SECTION =====================
    // // =====================================
    // // we will want this protected so you have to be logged in to visit
    // // we will use route middleware to verify this (the isLoggedIn function)
    // app.get('/profile', isLoggedIn, function(req, res) {
    //     res.render('profile.jade', {
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });
    //
    // // =====================================
    // // LOGOUT ==============================
    // // =====================================
    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}