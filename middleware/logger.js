// Logger middleware
module.exports = (req, res, next) => {
    let current_datetime = new Date();
    let formatted_time =
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    let log = `${formatted_time} ${method} ${url}`;
    console.log(log);
    next();
};
