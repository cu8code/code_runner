
type Callback = {
    error: string,
}

export async function run_python_handeler(_code: string, _input: string, _c: (res: Callback) => any) {
    console.log("python handeler");
}


export async function run_cpp_python_handeler(_code: string, _input: string, _callback: (res: Callback) => any) {

}

