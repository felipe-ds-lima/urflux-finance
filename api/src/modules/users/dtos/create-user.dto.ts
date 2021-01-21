import { IAppRole } from '../enums/AppRole'

export class CreateUserDto {
  name: string
  email: string
  password: string
  appRole?: IAppRole
}
