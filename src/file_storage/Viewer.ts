export interface IViewer {}

export class Viewer {
  fs
  parent

  element

  constructor({ fs, parent }: any) {
    this.fs = fs
    this.parent = parent
    this.element = this.render()
    this.parent.container.insertAdjacentElement('beforeend', this.element)
  }

  update() {
    this.element.remove()
    this.element = this.render()

    this.parent.container.insertAdjacentElement('beforeend', this.element)
  }

  render() {
    const _root = document.createElement('div')
    _root.classList.add('viewer')
    _root.innerHTML = `
	
        <div class="viewer__container">
          <div class="opened-files">
            <ul class="opened-files__container">
	
						</ul>
					</div>
					<div class="opened-files__content">
          <div><xmp>${this.fs.selectedItem?.content || ''}</xmp></div>
          </div>
				</div>
	
		`

    const container = _root.querySelector('.opened-files__container')
    for (let file of this.fs.openedFiles) {
      const _fileRoot = document.createElement('li')
      _fileRoot.classList.add('opened-files__item')
      if (file.isSelected) {
        _fileRoot.classList.add('selected')
      }
      _fileRoot.addEventListener('click', e => {
        e.stopPropagation()
        this.fs.selectItem(file)
      })

      _fileRoot.innerHTML = `
                    <h4 class="opened-files__item-name">${file.name}</h4>
                    <div class="opened-files__item-close-button">X</div>
								`
      _fileRoot
        .querySelector('.opened-files__item-close-button')
        ?.addEventListener('click', e => {
          e.stopPropagation()
          this.fs.openedFiles.delete(file)
          this.update()
        })
      container?.append(_fileRoot)
    }

    return _root
  }
}
