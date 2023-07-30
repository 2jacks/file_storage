export function createFolderModal(
  onOk: Function,
  onCancel?: Function
): Element {
  const _root = document.createElement('div')
  _root.classList.add('modal')
  _root.innerHTML = `
    <div class="modal__container">
      <div class="modal__body">
        <input type="text" placeholder="Введите имя папки"/>
        <div class="modal__body-button-group">
          <button data-action="ok">Создать</button>
          <button data-action="cancel">Отмена</button>
        </div>
      </div>
    </div>
	`

  _root.querySelector('[data-action="ok"]')?.addEventListener('click', () => {
    const value = _root.querySelector('input')?.value
    onOk(value)
    _root.remove()
  })
  _root
    .querySelector('[data-action="cancel"]')
    ?.addEventListener('click', () => {
      const value = _root.querySelector('input')?.value
      if (typeof onCancel === 'function') {
        onCancel(value)
      }
      _root.remove()
    })

  return _root
}
