const express = require(`express`);
const { PORT, NODE_ENV } = require(`./config/index`);
const { dbConnection } = require(`./config/db`);
const { success, error, info } = require(`consola`);
const morgan = require(`morgan`);
const cookieparser = require(`cookie-parser`);
const cors = require(`cors`);
const color = require(`colors`);
// const errorhandler=require(`errorhandler`);
const createError = require(`http-errors`);

//importing all routes
const authroute = require(`./routes/auth`);
const profileroute = require(`./routes/profile`);
const movieroute = require(`./routes/movie`);


const app = express();

let StartServer = async () => {
    try {
        dbConnection();


        app.use(express.json());
        app.use(cors());
        app.use(cookieparser());

        if (NODE_ENV === `development`) {
            app.use(morgan("dev"));
        }


        app.use("/api/auth", authroute);
        app.use("/api/profile", profileroute);
        app.use("/api/movie", movieroute)

        //404 not found error
        app.use((req, res, next) => {
            next(createError(404, `not found`));
        });

        //error handling 
        app.use(function (err, req, res, next) {
            return res.status(err.status || 500).json({ success: 0, message: err.message, stack: err.stack });
        })



        //listen port
        app.listen(PORT, err => {
            if (err) {
                error(err);
            } else {
                success(`server is running on ${PORT}`.yellow.bold);
            }
        })

    } catch (err) {
        error(err);

    }
}

StartServer();