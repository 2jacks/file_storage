// @ts-nocheck
import { IMenuBar, IFileStorage } from '../_types'
import { createFolderModal } from './createFolderModal'
import { renameModal } from './renameModal'

export class MenuBar implements IMenuBar {
  fs: IFileStorage
  root: Element | null
  element: Element

  constructor({ fs, root }: { fs: IFileStorage; root: Element | null }) {
    this.fs = fs
    this.root = root
    if (!this.root) throw new Error('Error creating MenuBar')

    this.element = this.render()
  }

  openCreateFolderModal = () => {
    this.fs.root.appendChild(createFolderModal(this.fs.onCreateFolder))
  }
  openRenameModal = () => {
    this.fs.root.appendChild(
      renameModal(this.fs.selectedItem.name, this.fs.onRename)
    )
  }

  render(): HTMLElement {
    const _root = document.createElement('div')
    _root.insertAdjacentHTML(
      'afterbegin',
      `
			  <menu class="menu-bar">
            <li class="menu-bar__item" data-action="createFolder">
              <span class="menu-bar__item-name">Создать папку</span>
            </li>
            <li class="menu-bar__item" data-action="uploadFile">
              <span class="menu-bar__item-name">Загрузить файл</span>
              <input type="file">
            </li>
            <li class="menu-bar__item" data-action="downloadFile">
              <span class="menu-bar__item-name">Скачать файл</span>
            </li>
            <li class="menu-bar__item" data-action="deleteFolder">
              <span class="menu-bar__item-name">Удалить</span>
            </li>
            <li class="menu-bar__item" data-action="rename">
              <span class="menu-bar__item-name">Переименовать</span>
            </li>
        </menu>
		`
    )

    this.root?.insertAdjacentElement('afterbegin', _root)

    _root
      .querySelector('[data-action="createFolder"]')
      ?.addEventListener('click', this.openCreateFolderModal)
    _root
      .querySelector('[data-action="deleteFolder"]')
      ?.addEventListener('click', this.fs.onDeleteFolder)
    _root
      .querySelector('[data-action="uploadFile"] input')
      ?.addEventListener('change', this.fs.onUploadFile)

    _root
      .querySelector('[data-action="downloadFile"]')
      ?.addEventListener('click', this.fs.onDownloadFile)
    _root
      .querySelector('[data-action="rename"]')
      ?.addEventListener('click', this.openRenameModal)

    return _root
  }
}
