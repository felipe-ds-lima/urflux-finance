import { IAppRole } from '../enums/app-role'

export class CreateUserDto {
  name: string
  email: string
  password: string
  appRole?: IAppRole
}
