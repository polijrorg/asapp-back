enum Countries {
  BR = 'BR',
  US = 'US',
  UK = 'UK',
  CH = 'CH',
  IT = 'IT'
}

interface ICreateContactDTO {
  country: Countries;
  contact_name: string;
  bank_code: number;
  bank_name: string;
  agency: string;
  account: string;
  user_id: string;
  document: string;
  email?: string;
  pix_key?: string;
}

export default ICreateContactDTO;
