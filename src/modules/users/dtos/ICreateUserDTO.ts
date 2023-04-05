interface ICreateUserDTO {
  name: string;
  email: string;
  ddd: string;
  phone: string;
  password: string;
  nationality: string;
  monthly_income: number;
  occupation: string;
  pep: boolean;
  birthDate: Date;
}

export default ICreateUserDTO;
