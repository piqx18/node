const checkParameters = (params, requiredParameters) => {
    let errors = []
    for (let param of requiredParameters) {
        if(params[param] === undefined) {
            errors.push(`Params ${param} is required`)
        }
    }
    return errors
}

module.exports = checkParameters