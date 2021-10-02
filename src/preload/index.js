// https://electronjs.org/docs/tutorial/security
import { contextBridge } from 'electron'
import { cpu, mem, os } from 'node-os-utils'
import { join } from 'path'

contextBridge.exposeInMainWorld('osApi', {
    mem,
    cpu,
    os,
})

contextBridge.exposeInMainWorld('liteNodeApi', {
    path: {
        join: (...paths) => {
            return join(__dirname, ...paths)
        },
    },
})
