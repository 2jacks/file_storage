export interface IComponent {
  root: Element | null // Родительский элемент
  element: Element | null // Корневой элемент компонента
  container?: Element | null // Элемент, в который помещать дочерние компоненты

  parent?: IComponent | null // Сссылка на экземпляр родителя
  children?: IComponent[] | null // Экземпляры, которые иерархически находятся в текущем

  render(): void // Начальный рендер разметки компонента
}

export interface IFileStorage extends IComponent {
  data: any[]

  explorer: IExplorer
  viewer: IViewer

  selectedItem: IFile | IFolder | null
  selectItem: (item: any) => void

  removeChild: (name: string) => void

  onDeleteFolder: (folder: IFolder) => void
  onCreateFolder: (name: string) => void

  onUploadFile: (file: File) => void
  onDownloadFile: (file: IFile) => void
  onDeleteFile: (file: IFile) => void

  onRename: (name: string) => void
}

export interface IExplorer extends IComponent {
  fs: IFileStorage

  children: Array<IFolder | IFile>
}

export interface IMenuBar extends IComponent {
  fs: IFileStorage
}

export interface IFolderDto {
  name: string
  data?: Array<IFolderDto | IFileDto>
}
export interface IFolder extends IComponent, IFolderDto {
  add(name: string): void
  delete(): void
  rename(newName: string): void

  fs: IFileStorage

  isOpened: boolean
  isSelected: boolean

  toggle(): void // Скрыть / показать содержимое
}

export interface IFileDto {
  name: string
  description: string | null
  content: string | null
}

export interface IFile extends IComponent, IFileDto {
  upload(path: string): void
  download(): void
  delete(): void
  rename(): void
  changeDescription(newDescription: string): void

  fs: IFileStorage

  isOpened: boolean
  isSelected: boolean
}

export interface IViewer extends IComponent {
  fs: IFileStorage
  parent: IComponent
}
