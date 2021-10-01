// @ts-ignore
import * as Materialize from './src/materialize'
import { ctxWin } from './src/vars'

ctxWin.addEventListener('load', () => {
    const form = document.getElementById('image-form') as HTMLFormElement
    const slider = document.getElementById('slider') as HTMLInputElement
    const img = document.getElementById('image-input') as HTMLInputElement

    const { path, os } = ctxWin.liteNodeApi
    document.getElementById('output-path').innerText = path.join(
        os.homedir(),
        'Downloads',
        'imageshrink',
    )

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const imgPath = img.files[0].path
        const quality = slider.value

        ctxWin.ipcApi.send.imageMinimize({
            from: imgPath,
            value: +quality,
        })

        ctxWin.ipcApi.on.imageDone(() => {
            Materialize.toast({
                html: `Image resized to ${slider.value}% quality`,
            })
        })
    })
})
