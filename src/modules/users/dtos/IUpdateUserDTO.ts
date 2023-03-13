interface IUpdateUserDTO {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    nationality: string;
    monthly_income: number;
    occupation: string;
    pep: boolean;
    birthDate: Date;
}

export default IUpdateUserDTO;
