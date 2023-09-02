import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { join } from "path"
import { writeFile } from "fs/promises"
import { homedir } from "os";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

export async function run_handeler(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    // TODO: add structure assertion to the data object
    return async (data: { lang: 'py' | 'cpp' | 'c', code: string, input: string }, callback: any) => {
        console.debug(data)
        const path = join(homedir(), "temp", socket.id)
        await exec(['mkdir', '-p', path].join(' '))
        let STDERR
        let STDOUT
        switch (data.lang) {
            case "py": {
                await writeFile(join(path, 'temp.py'), data.code)
                await writeFile(join(path, 'input'), data.input)
                const { stderr, stdout } = await exec(['docker', 'run', '-v', `${path}:/code`, '-a', 'stdout', '-a', 'stderr', 'python'].join(' '))
                STDERR = stderr
                STDOUT = stdout
                break;
            }
            case "cpp": {
                await writeFile(join(path, 'temp.cpp'), data.code)
                await writeFile(join(path, 'input'), data.input)
                const { stderr, stdout } = await exec(['docker', 'run', '-v', `${path}:/code`, '-a', 'stdout', '-a', 'stderr', 'cpp'].join(' '))
                STDERR = stderr
                STDOUT = stdout
                break
            }
            case "c": {
                await writeFile(join(path, 'temp.c'), data.code)
                await writeFile(join(path, 'input'), data.input)
                const { stderr, stdout } = await exec(['docker', 'run', '-v', `${path}:/code`, '-a', 'stdout', '-a', 'stderr', 'clang'].join(' '))
                STDERR = stderr
                STDOUT = stdout
                break
            }
        }

        if (STDERR) {
            callback({
                output: STDERR
            })
            return null
        }

        callback({
            output: STDOUT
        })

        return null

    }
}