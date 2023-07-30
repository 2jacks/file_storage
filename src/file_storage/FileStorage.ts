// @ts-nocheck
import {
  IFileStorage,
  IMenuBar,
  IExplorer,
  IFolder,
  IFile,
  IViewer
} from './_types'

import { Explorer } from './Explorer'
import { MenuBar } from './MenuBar/MenuBar'

import { Folder } from './Folder'
import { File } from './File'
import { download, upload } from '@/utils/helpers'
import { Viewer } from './Viewer'

export class FileStorage implements IFileStorage {
  root: HTMLElement | null
  element: HTMLElement
  container?: Element | null | undefined

  data: any[]

  explorer: IExplorer

  menuBarContainer: Element | null
  menuBar: IMenuBar
  children: null = null

  selectedItem: IFile | IFolder | null = null
  openedFiles: Set<IFile | IFolder> = new Set()

  viewer: IViewer

  constructor({ root, data }: { root: string; data: any[] }) {
    this.root = document.querySelector(root)
    if (!this.root) throw new Error('Error creating FileStorage')

    this.element = this.render()
    this.container = this.element.querySelector(`.main`)

    this.data = data

    this.menuBarContainer = this.element.querySelector(
      `.file-storage__container`
    )
    this.menuBar = new MenuBar({
      fs: this,
      root: this.menuBarContainer
    })

    this.explorer = new Explorer({
      fs: this,
      data: this.data,
      root: this.container
    })

    this.viewer = new Viewer({ fs: this, parent: this })
  }

  onDeleteFolder = (folder: IFolder) => {
    this.selectedItem?.element?.remove()
    this.openedFiles.delete(this.selectedItem)
    this.selectedItem?.children?.forEach(child => {
      this.selectedItem.removeChild(child.name)
      this.openedFiles.delete(child)
      this.viewer.update()
    })

    this.selectedItem.parent.removeChild(this.selectedItem.name)
    this.viewer.update()
  }
  onCreateFolder = (name: string) => {
    const _root =
      this.selectedItem instanceof Folder
        ? this.selectedItem
        : this.selectedItem.parent
    _root.children?.push(
      new Folder({
        fs: this,
        root: _root.container,
        name: name,
        parent: _root,
        buildTree: _root.buildTree,
        data: []
      })
    )
  }
  onDeleteFile = () => {
    this.selectedItem?.element?.remove()
    this.selectedItem?.parent.removeChild(this.selectedItem.name)
    this.openedFiles.delete(this.selectedItem)
    this.viewer.update()
  }
  onUploadFile = (e: any) => {
    const file = e.target.files[0]
    const name = file.name
    e.target.value = null
    if (file) {
      upload(file, (e: any) => {
        const _root =
          this.selectedItem instanceof Folder
            ? this.selectedItem
            : this.selectedItem.parent
        _root.children?.push(
          new File({
            fs: this,
            parent: _root,
            name: name,
            description: null,
            content: e.target?.result || ''
          })
        )
      })
    }
  }
  onDownloadFile = () => {
    if (this.selectedItem instanceof File) {
      download(this.selectedItem.name, this.selectedItem.content || '')
    }
  }
  onRename = (name: string) => {
    this.selectedItem.name = name
    this.viewer.update()
  }

  selectItem(item: any) {
    if (this.root && item) {
      if (item instanceof File) {
        this.openedFiles.add(item)
      }

      const selectedItems = this.root.querySelectorAll(`.selected`)
      if (selectedItems) {
        selectedItems.forEach(_item => {
          _item.classList.remove('selected')
        })
      }

      if (this.selectedItem) {
        this.selectedItem.isSelected = false
      }

      this.selectedItem = item
      this.selectedItem.isSelected = true

      this.selectedItem?.element?.classList.add('selected')

      this.viewer.update()
    }
  }

  removeChild(name: string) {
    this.children = this.children.filter(
      (child: IFolder | IFile) => child.name !== name
    )
  }

  update() {
    this.root?.replaceChildren(this.element)
    this.element = this.render()
    this.root?.replaceChildren(this.element)
  }

  render(): HTMLElement {
    const _root = document.createElement('div')
    _root.classList.add('file-storage')

    const container = document.createElement('div')
    container.classList.add('file-storage__container')
    _root.insertAdjacentElement('afterbegin', container)

    const main = document.createElement('div')
    main.classList.add('main')
    container.insertAdjacentElement('afterbegin', main)

    this.root?.insertAdjacentElement('afterbegin', _root)

    return _root
  }
}
