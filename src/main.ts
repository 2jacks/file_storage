// @ts-nocheck
import '@styles/_reset.css'
import './styles.css'

import { data as _data } from './mocks/data'

import { FileStorage } from './file_storage/FileStorage'
import { IFileDto, IFolderDto } from './file_storage/_types'


const fileStorage = new FileStorage({ root: '#app', data: _data })

