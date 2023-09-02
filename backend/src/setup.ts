const net = require('net');

async function isPortInUse(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const server = net.createServer()
            .listen(port, () => {
                server.close();
                resolve(false);
            })
            .on('error', () => {
                resolve(true);
            });
    });
}


async function getPort(): Promise<number> {
    let port: number | string = process.env['port'] || process.env['PORT'] || '3000'
    if (Number.isNaN(Number(port))) {
        port = '3001'
    }
    port = Number(port)
    let running = true

    while (port >= 5000 && port >= 3000 || running) {
        console.log("testing port " + port);
        running = await isPortInUse(port)
        if (!running) {
            return port
        }
        port++
    }
    throw new Error("All PORT are in use || please use a nomral env !!! ")
}


type Env = 'dev' | 'proc'
function getEnv(): Env {
    let env = process.env['node_env'] || process.env['NODE_ENV'] || 'dev'
    if (!(['dev', 'proc'].includes(env))) {
        env = 'dev'
    }
    return env as Env
}


const setup = (async () => {
    let PORT = await getPort()
    let ENV = getEnv()

    return {
        PORT,
        ENV 
    }
}
)()

export default setup
