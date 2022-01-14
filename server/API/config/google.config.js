import googleOAuth from "passport-google-oauth20";

import { UserModel } from "../database/allModels";

const GoogleStrategy = googleOAuth.Strategy;/*format of how to google config file js is */


export default (passport) => {
    passport.use(/*passport- enable of ur authentication */
        new GoogleStrategy({
            clientID: "887746508261-1dk9dqn5cfebo26mhqeek90k4lanjohc.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:4000/auth/google/callback"
        },
            async (accessToken, refreshToken, profile, done) => {
                //creating a new user
                const newUser = {
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value
                };
                try {
                    //check whether user exists or not
                    const user = await UserModel.findOne({ email: newUser.email });
                    if (user) {

                        //generating jwt token-authentication/security purpose
                        const token = user.generateJwtToken();
                        //return user
                        done(null, { user, token });
                    } else {
                        //create a new user
                        const user = await UserModel.create(newUser);

                        //generating jwt token
                        const token = user.generateJwtToken();
                        //return user
                        done(null, { user, token });
                    }
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );

    passport.serializeUser((userData, done) => done(null, { ...userData }));
    passport.deserializeUser((id, done) => done(null, id));

};