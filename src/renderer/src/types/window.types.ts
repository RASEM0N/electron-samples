// import { ListenerType } from './index'
import Mem from 'node-os-utils/lib/mem'
import Cpu from 'node-os-utils/lib/cpu'
import Os from 'node-os-utils/lib/os'

export type WindowType = Window & typeof globalThis
export type WindowContextApiType = {
    osInfo: {
        getStaticData: () => Promise<{
            cpu: {
                model: string
            }
            os: {
                type: string
                arch: string
                hostname: string
            }
            mem: {
                totalMemMb: number
            }
        }>
        getDynamicData: () => Promise<{
            cpu: {
                usage: number
                free: number
            }
            os: {
                uptime: number
            }
        }>
    }
    liteNodeApi: {
        path: {
            join: (...paths: string[]) => string
        }
    }
}
