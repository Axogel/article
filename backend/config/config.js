module.exports  = {
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://localhost:27017/summary_app",
    },
    PORT: process.env.PORT || "5000",
}