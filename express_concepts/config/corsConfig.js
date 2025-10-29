import cors from "cors";

const configureCors = () => {
  return cors({
    //origin -> which domains are allowed to access the resources
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", //local development
        "https://upvera.vercel.app", //production domain
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); //allow the request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],

    exposedHeaders: ["X-Total-Count", "Content-Range"],

    credentials: true, //allow cookies to be sent
    preflightContinue: false,
    maxAge: 600, //cache pre flight response for 10 minutes(avoid sending options request multiple times)
    optionsSuccessStatus: 204,
  });
};

export default configureCors;
