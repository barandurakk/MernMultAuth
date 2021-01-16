const passport = require("passport");
const mongoose = require("mongoose");
const usersController = require("../controllers/users");
const { use } = require("passport");
const checkJWT = passport.authenticate('jwt', { session: false });


const User = mongoose.model("users");

module.exports = (app) => {

app.post("/api/signup", usersController.signUp );

app.post('/api/signin',
        passport.authenticate('local', { session: false }), 
        usersController.signIn);

app.post("/api/auth/google", 
        passport.authenticate('google-token', { session: false }),
        usersController.googleOAuth
    );

app.post("/api/auth/link/google", 
        checkJWT,
        passport.authorize('google-token', { session: false }),
        usersController.linkGoogle
);

app.post("/api/auth/unlink/google",
        checkJWT,
        usersController.unlinkGoogle
        )

app.get("/api/getuser", checkJWT,usersController.getUser);

};
