import 'application.css'
import { ctxWin } from './vars'

window.addEventListener('load', () => {
    const btnToggleTheme = document.querySelector('#toggle-theme')
    const btnToSystemTheme = document.querySelector('#to-system-theme')
    const themeText = document.querySelector('#theme')

    // toggle themes
    btnToggleTheme.addEventListener('click', async () => {
        const isDarkTheme: boolean = await ctxWin.themeApi.toggle()

        themeText.textContent = isDarkTheme ? 'Dark' : 'Light'
    })

    // to system theme
    btnToSystemTheme.addEventListener('click', async () => {
        await ctxWin.themeApi.toSystem()
        themeText.textContent = 'System'
    })
})
