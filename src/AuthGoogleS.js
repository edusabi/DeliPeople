require("dotenv").config({});

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

// Adicionando o modelo do Schema do banco de dados
const AuthGoogle = require("./models/AuthGoogle");

passport.serializeUser((user, done) => {
  done(null, user.id); // Apenas serializando o ID do usuário para a sessão
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await AuthGoogle.findById(id); // Usando findById para buscar o usuário pelo ID
    done(null, user);
  } catch (error) {
    console.error("Erro ao deserializar o usuário: ", error);
    done(error, null);
  }
});

passport.use(new GoogleStrategy({ 
  clientID: process.env.cliente_ID,
  clientSecret: process.env.cliente_SECRET,
  callbackURL: "/auth/google/callback",
  scope: ['email', 'profile'],
},
  async function (request, accessToken, refreshToken, profile, done) {
    try {
      let user = await AuthGoogle.findOne({ email: profile._json.email });
      if (!user) {
        user = await AuthGoogle.create({
          googleId: profile.id,
          name: profile._json.name,
          email: profile._json.email,
          avatar: profile._json.picture.replace("=s96-c", "=s1080-c")
        });
        console.log("Usuário criado com sucesso");
      }
      done(null, user);
    } catch (error) {
      console.error("Erro ao criar ou encontrar usuário: ", error);
      done(error, null);
    }
  }
));