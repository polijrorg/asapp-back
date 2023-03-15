enum DocType {
    CNH = 'CNH',
    RG = 'RG',
    PASSPORT ='PASSPORT'
}

interface ICreateDocumentDTO {
    type: DocType;
    issuing_authority:string;
    number: string;
    expiration_date: Date;
    user_id: string;
    front: string;
    back?: string;
}

export default ICreateDocumentDTO;
