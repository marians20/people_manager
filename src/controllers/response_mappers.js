exports.queryToResponse = async (res, func) => {
    try {
        const response = await func();
        res.json(response);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.text);
    }
};

exports.commandToResponse = async (res, func) => {
    try {
        const response = await func();
        res.status(response.statusCode).send(response.text);
    } catch (error) {
        res.status(error.statusCode).send(error.text);
    }
};
