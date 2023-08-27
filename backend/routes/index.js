const express = require('express');
const router = express.Router();
const validate = require("express-jsonschema").validate

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const fs = require("fs/promises")

const path = require("node:path")
const crypto = require("crypto")

function uuid() {
  const date = new Date()
  return crypto.randomBytes(16).toString("hex") + date.getTime()
}

var schema = {
  type: 'object',
  properties: {
    input: {
      type: 'array',
      items: {
        'type': 'string'
      },
      required: true
    },
    code: {
      type: 'array',
      items: {
        'type': 'string'
      },
      required: true
    },
    lang: {
      type: 'string',
      required: true,
      enum: ['py', 'cpp']
    }
  }
}


router.get('/', function (req, res, next) {
  res.send({
    message: "the server is working"
  })
})


router.post("/", validate({ body: schema }), async function (req, res) {
  const HOME = process.env.HOME
  const UUID = uuid()
  const targetDirName = 'temp/' + UUID

  switch (req.body.lang) {
    case ("py"): {
      await exec(['mkdir', '-p', path.join(HOME, targetDirName)].join(' '))
      await fs.writeFile(path.join(HOME, targetDirName, 'temp.py'), req.body.code.join('\n'))
      await fs.writeFile(path.join(HOME, targetDirName, 'input'), req.body.input.join('\n'))
      try {
        const { err, stdout, stderr } = await exec(['python3', path.join(HOME, targetDirName, 'temp.py'), '<', path.join(HOME, targetDirName, 'input')].join(' '))
        return res.send({
          status: "ok",
          output: stdout
        })
      } catch (e) {
        return res.send({
          status: "failed",
          output: e.stderr
        })
      }
    }
    case ("cpp"): {

      await exec(['mkdir ', path.join(HOME, targetDirName)].join(' '))
      await fs.writeFile(path.join(HOME, targetDirName, 'temp.cpp'), req.body.code.join('\n'))
      await fs.writeFile(path.join(HOME, targetDirName, 'input'), req.body.input.join('\n'))

      try {
        await exec(["g++", path.join(HOME, targetDirName, 'temp.cpp'), "-o", path.join(HOME, targetDirName, 'output')].join(' '))
        const { err, stdout, stderr } = await exec([path.join(HOME, targetDirName, 'output'), '<', path.join(HOME, targetDirName, 'input')].join(' '))
        return res.send({
          status: "ok",
          output: stdout
        })
      } catch (e) {
        return res.send({
          status: "failed",
          output: e.stderr
        })
      }

    }
  }
})


module.exports = router;
