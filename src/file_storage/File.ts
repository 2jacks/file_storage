// @ts-nocheck
import { IFile } from './_types'
import sprite from '../assets/sprite.svg'

export class File implements IFile {
  _name: string
  description: string | null
  content: string | null

  fs: any
  parent: any
  element: Element

  isOpened: boolean = false
  isSelected: boolean = false

  constructor({
    fs,
    parent,
    name,
    description,
    content
  }: {
    fs: any
    parent: any
    name: string
    description: string | null
    content: string | null
  }) {
    this.fs = fs
    this.parent = parent

    this._name = name
    this.description = description
    this.content = content

    this.element = this.render()
  }
  get name() {
    return this._name
  }
  set name(newName: string) {
    this._name = newName
    this.update()
  }

  onClick = () => {
    this.fs.selectItem(this)
  }

  delete = () => {
    this.element.remove()
    this.parent.removeChild(this.name)
  }

  update() {
    this.element?.remove()
    this.element = this.render()
  }

  render(): Element {
    const _root = document.createElement('li')
    _root.classList.add('explorer__item')

    const header = document.createElement('div')
    header.classList.add('explorer__item-header')
    _root.appendChild(header)
    header.addEventListener('click', this.onClick)

    if (this.description) {
      const hint = document.createElement('div')
      hint.classList.add('explorer__item-hint')
      hint.innerHTML = `
      <div class="hint__container">
        ${this.description}
      </div>
    `
      header.appendChild(hint)
    }

    const icon = document.createElement('div')
    icon.classList.add('explorer__item-icon')
    icon.insertAdjacentHTML(
      'afterbegin',
      ` <svg>
        	<use xlink:href="${sprite}#file" />
      	</svg>
			`
    )
    header.insertAdjacentElement('afterbegin', icon)

    const name = document.createElement('div')
    name.classList.add('explorer__item-name')
    header.appendChild(name)
    name.innerHTML = this._name || ''

    this.parent.container?.insertAdjacentElement('afterbegin', _root)

    return _root
  }
}
