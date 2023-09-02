import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { join, } from "path"
import { writeFile } from "fs/promises"
import { homedir } from "os";

const util = require("util");
const exec = util.promisify(require("child_process").exec);


export async function run_handeler(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    return async (data: { lang: 'py' | 'cpp', code: string, input: string }, _callback: any) => {
        const path = join(homedir(), "temp", socket.id)
        await exec(['mkdir', '-p', path].join(' '))
        switch (data.lang) {
            case "py":
                await writeFile(join(path, 'temp.py'), "print('hi')")
                await writeFile(join(path, 'input'), "")
                const { stderr, stdout } = await exec(['docker', 'run', '-v', `${path}:/code`, '-a', 'stdout', '-a', 'stderr', 'test9'].join(' '))
                if (stderr) {
                    console.debug({
                        output: stderr
                    })
                    _callback({
                        output: stderr,
                    })
                    return
                }
                console.debug({
                    output: stdout
                })
                _callback({
                    output: stdout
                })
                return;

            default:
                return;
        }

    }
}