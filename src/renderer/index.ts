// import { ctxWin } from './src/vars'
import { Tabs } from './src/tabs'
import { ctxWin } from './src/vars'

window.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.content')
    const listItems = document.querySelectorAll('nav ul li')

    new Tabs(contents, listItems)
})

// https://www.npmjs.com/package/node-os-utils
window.addEventListener('DOMContentLoaded', async () => {
    const { getStaticData, getDynamicData } = ctxWin.osInfo

    const { cpu, os, mem } = await getStaticData()

    document.querySelector('#cpu-model').textContent = cpu.model
    document.querySelector('#comp-name').textContent = os.hostname
    document.querySelector('#os').textContent = `${os.type} ${os.arch}`
    document.getElementById('mem-total').innerText = mem.totalMemMb + 'МБ'

    setInterval(async () => {
        const { cpu, os } = await getDynamicData()

        document.getElementById('cpu-usage').innerText = cpu.usage + '%'
        document.getElementById('cpu-progress').style.width = cpu.usage + '%'
        document.getElementById('cpu-free').innerText = cpu.free + '%'
        document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime)
    }, 2000)
})

function secondsToDhms(seconds: number) {
    seconds = +seconds
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor((seconds % (3600 * 24)) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return `${d}d, ${h}h, ${m}m, ${s}s`
}
