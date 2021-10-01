import img from 'imagemin'
import * as imgJPG from 'imagemin-mozjpeg'
import imgPNG from 'imagemin-pngquant'
import slash from 'slash'

// import * as buffer from 'node:buffer'

interface ShrinkImageOptions {
    from: string
    to: string
    quality: number
    successCb?: (...data: any[]) => void
    errorCb?: (...data: any[]) => void
}

type ShrinkImageType = (options: ShrinkImageOptions) => Promise<boolean>

export const shrinkAndSaveImage: ShrinkImageType = async ({
    quality,
    to: toArg,
    from: fromArg,
    successCb,
    errorCb,
}): Promise<boolean> => {
    try {
        const pngQuality = 1 / quality
        const from = slash(fromArg)
        const to = slash(toArg)

        const g = require

        console.log(quality, to, from)
        console.log(quality, toArg, fromArg)

        const files = await img([fromArg], {
            destination: toArg,
            plugins: [
                imgJPG({
                    quality: quality,
                }),
                imgPNG({
                    quality: [pngQuality, pngQuality],
                }),
            ],
        })

        if (successCb) {
            successCb(files)
        }

        return true
    } catch (error) {
        console.log(error);
        if (errorCb) {
            errorCb(error)
        }
        return false
    }
}
