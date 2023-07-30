// @ts-nocheck
import {
  IExplorer,
  IFolder,
  IFolderDto,
  IFile,
  IFileDto,
  IFileStorage
} from './_types'
import { Folder } from './Folder'
import { File } from './File'

import { isFile, isFolder } from '@/utils/helpers'

export class Explorer implements IExplorer {
  fs: IFileStorage

  root: Element | null
  element: Element | null
  container: Element | null

  data: (IFolderDto | IFileDto)[]
  children: (IFolder | IFile)[]

  constructor({
    fs,
    data,
    root
  }: {
    fs: IFileStorage
    data: Array<IFolder | IFile>
    root: Element | null
  }) {
    this.fs = fs

    this.root = root
    if (!this.root) throw new Error('Error creating Explorer')

    this.data = data
    this.element = this.render()

    this.container = this.element.querySelector(`.explorer__list`)

    this.children = this.buildTree(this.data)
  }

  buildTree(data: any[]): Array<IFolder | IFile> | [] {
    let result: any[] = []

    data.forEach(item => {
      if (isFile(item)) {
        result.push(
          new File({
            fs: this.fs,
            parent: this,
            name: item.name,
            description: item.description,
            content: item.content,
            root: this.container
          })
        )
      }
      if (isFolder(item)) {
        result.push(
          new Folder({
            fs: this.fs,
            parent: this,
            name: item.name,
            data: item.data,
            buildTree: this.buildTree,
            root: this.container
          })
        )
      }
    })

    return result
  }

  removeChild(name: string) {
    this.children = this.children.filter(
      (child: IFolder | IFile) => child.name !== name
    )
  }

  render(): Element {
    const _root = document.createElement('div')
    _root.classList.add('explorer')

    const container = document.createElement('div')
    container.classList.add('explorer__container')
    _root.insertAdjacentElement('afterbegin', container)

    const list = document.createElement('div')
    list.classList.add('explorer__list')
    container.insertAdjacentElement('afterbegin', list)

    this.root?.insertAdjacentElement('afterbegin', _root)

    return _root
  }
}
