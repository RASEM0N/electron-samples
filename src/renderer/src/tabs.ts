export class Tabs {
    private readonly contents: NodeListOf<Element>
    private readonly items: NodeListOf<Element>

    constructor(contents: NodeListOf<Element>, items: NodeListOf<Element>) {
        this.contents = contents
        this.items = items

        this.throwHandlerOnAllItems()
    }

    private throwHandlerOnAllItems(): void {
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.hideContents()
                this.hideItems()

                // activate list item
                item.classList.add('active')

                // display content
                this.contents[index].classList.add('show')
            })
        })
    }

    private hideContents(): void {
        this.contents.forEach((content) => {
            content.classList.remove('show')
        })
    }

    private hideItems(): void {
        this.items.forEach((item) => {
            item.classList.remove('active')
        })
    }
}
