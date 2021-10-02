// import { ctxWin } from './src/vars'
import { Tabs } from './src/tabs'
import { ctxWin } from './src/vars'

window.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.content')
    const listItems = document.querySelectorAll('nav ul li')

    new Tabs(contents, listItems)
})

window.addEventListener('DOMContentLoaded', () => {
    const { cpu, os, mem } = ctxWin.osApi

    document.querySelector('#cpu-model').textContent = cpu.model()
})
