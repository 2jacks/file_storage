export function isFile(item: any): boolean {
  return typeof item?.content === 'string'
}

export function isFolder(item: any): boolean {
  return !isFile(item)
}

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function isObjectEmpty(item: object) {
  return Object.keys(item).length > 0
}

export function upload(file: File, onLoad: Function): void {
  var reader = new FileReader()
  reader.readAsText(file)
  reader.onload = e => {
    onLoad(e)
  }
  reader.onerror = function () {
    console.log('Error creating file')
  }
}

export function download(name: string, content: string) {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
  )
  element.setAttribute('download', name)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
