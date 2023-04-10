import IPermissionResponse from '../entities/IPermissionResponse'
import IPermissions from '../entities/IPermissions'
import IPermissionWebhook from '../entities/IPermissionWebhook'

enum Status {
    'REQUESTED',
    'APROVED',
    'REPROVED',
    'REVOKED'
  }

/* eslint-disable @typescript-eslint/no-empty-interface */
export default interface ILinkerProvider {
    requestPermissionWebhook(): Promise<IPermissionWebhook>
    revokeAcess(cpf: string, cnpj: string, action: string): Promise<void>
    requestPermission(cpf: string, cnpj: string, action: string): Promise<IPermissionResponse>
    listPermissions(status: Status, cnpj: string): Promise<IPermissions[]>
}
