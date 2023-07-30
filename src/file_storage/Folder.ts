// @ts-nocheck
import sprite from '../assets/sprite.svg'
import { IFileStorage, IFolder, IFile, IFileDto } from './_types'
export class Folder implements IFolder {
  _data: any
  _name: string
  children: Array<IFolder | IFile>
  buildTree: (data: any[]) => Array<IFolder | IFile>

  fs: IFileStorage
  parent: any

  element: HTMLElement | null
  container: HTMLElement | null

  isOpened: boolean = false
  isSelected: boolean = false

  constructor({
    fs,
    parent,
    name,
    data,
    buildTree
  }: {
    fs: IFileStorage
    name: string
    parent: any
    data: Array<IFolder | IFile>
    buildTree: (data: any[]) => Array<IFolder | IFile>
  }) {
    this.fs = fs
    this.parent = parent

    this._name = name

    this.element = this.render()
    this.container = this.element.querySelector(`.explorer__list`)

    this.buildTree = buildTree
    this._data = data
    this.children = this.buildTree(data)
  }
  get name() {
    return this._name
  }
  set name(newName: string) {
    this._name = newName
    this.update()
  }

  toggle = e => {
    e.stopPropagation()
    this.isOpened = !this.isOpened

    if (this.element) {
      if (this.isOpened) {
        this.element.classList.add('explorer__item--closed')
      } else {
        this.element.classList.remove('explorer__item--closed')
      }
    }
  }

  select = () => {
    this.fs.selectItem(this)
  }

  delete() {
    this.children.forEach(child => {
      child.delete()
    })
  }

  removeChild(name: string) {
    this.fs.removeChild.call(this, name)
  }

  update() {
    this.element?.remove()

    this.element = this.render()
    this.container = this.element.querySelector(`.explorer__list`)

    this.children.forEach(child => child.update())
  }

  render(): HTMLElement {
    const _root = document.createElement('li')
    _root.classList.add('explorer__item')

    const header = document.createElement('div')
    header.classList.add('explorer__item-header')
    header.addEventListener('click', this.select)
    _root.appendChild(header)

    const arrow = document.createElement('div')
    arrow.classList.add('explorer__item-arrow')
    arrow.insertAdjacentHTML(
      'afterbegin',
      ` <svg>
        	<use xlink:href="${sprite}#arrow" />
      	</svg>
			`
    )
    arrow.addEventListener('click', this.toggle)
    header.appendChild(arrow)

    const icon = document.createElement('div')
    icon.classList.add('explorer__item-icon')
    icon.insertAdjacentHTML(
      'afterbegin',
      ` <svg>
        	<use xlink:href="${sprite}#folder" />
      	</svg>
			`
    )
    header.appendChild(icon)

    const name = document.createElement('div')
    name.classList.add('explorer__item-name')
    header.appendChild(name)
    name.innerHTML = this._name || ''

    const list = document.createElement('div')
    list.classList.add('explorer__list')
    _root.insertAdjacentElement('beforeend', list)

    this.parent.container?.insertAdjacentElement('afterbegin', _root)

    return _root
  }
}
