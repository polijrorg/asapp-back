interface IRequestDetails {
    label: string;
    value: string;
}
export default interface IPermissionWebhook {
    operator_cpf: string;
    operator_name: string;
    cnpj: string;
    client_id: string;
    payload: {
        request_type: string;
        request_sub_type: string;
        request_payload: {
            client_id: string;
            linker_id: number;
            action: string;
            scope: string;
        }
        requester_cpf: string | null;
        requester_cnpj: string;
        partner_id: string;
        partner_name: string;
        id: string;
        value: number;
        executor_cpf: string;
        executed_at: string;
        expires_at: string;
        expires_to_inactivity: number;
        expires_to_month: number;
        status: string;
        created_at: string;
        cancelled_at: string | null;
        latest_execution_data: {
            succeeded: boolean;
            data: {
                message: string;
            };
            error_message: string;
        };
        request_details: IRequestDetails[];
    };
    status: string;
    created_at: string;
    id_transaction: string;
}
