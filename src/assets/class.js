export class ItemForStorageDelete{
  constructor(pathToFile, fileName) {
    this.pathToFile = pathToFile
    this.fileName = fileName
  }
}

export class NewUser{
  constructor(name, password, email, tel, ) {
    this.name = name,
    this.password = password,
    this.email = email,
    this.tel = tel,
    this.role= 'user'
  }
}
