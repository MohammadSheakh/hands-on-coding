import UserDto from "src/users/user.dto";


// as user should be part of a company
// one user belongs to one company only 

export default class CreateCompanyDto {
  companyName: string;
  user: UserDto
}