const router = require('./routes')

const handler = (request, response) => {

    const method = request.method;
    const url = request.url;

    // url que chegou na request do client
    const urlSplit = url.split('/').filter(Boolean);

    const resultRoute = router.filter(item => {
        return item.method.toLowerCase() === method.toLowerCase() &&
            item.url.toLowerCase().startsWith(`/${urlSplit[0].toLowerCase()}`)
    })

    const executeRouter = resultRoute.find(item => {
        const routeUrlSplit = item.url.split('/').filter(Boolean)
        return routeUrlSplit.length === urlSplit.length
    })

    // url configurada no arquivo de rotas
    const routerSplitUrl = executeRouter.url.split('/').filter(Boolean)

    const objParams = {}

    routerSplitUrl.forEach((item, index) => {
        if (item.startsWith(':')) {
            const itemFormat = item.replace(':', '');
            objParams[itemFormat] = urlSplit[index]
        }
    });


    request
        .on('data', (data) => {
            const body = JSON.parse(data);
            request.body = body;
        })
        .on('end', () => {

            // só adiciona params se tiver algo no objeto de params
            if (Object.keys(objParams).length > 0) {
                request.params = objParams;
            }
            return executeRouter.controller(request, response)
        });


}

module.exports = handler 