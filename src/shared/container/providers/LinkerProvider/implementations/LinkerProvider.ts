/* eslint-disable no-console */
import linkerConfig from '@config/linker';
import AppError from '@shared/errors/AppError';
import axios, { AxiosInstance } from 'axios';
import { injectable } from 'tsyringe';
import ILinkerError from '../entities/ILinkerError';
import IToken from '../entities/IToken';
import ILinkerProvider from '../models/ILinkerProvider';
import IPermissionWebhook from '../entities/IPermissionWebhook';
import IPermissionResponse from '../entities/IPermissionResponse';
import IPermissions from '../entities/IPermissions';

const {
  apiUrl, apiPermissionUrl, apiSandboxUrl, apiSecretKey, apiUsername
} = linkerConfig;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum Status {
  'REQUESTED',
  'APROVED',
  'REPROVED',
  'REVOKED'
}
@injectable()
export default class LinkerProvider implements ILinkerProvider {
  constructor() {
    this.client = axios.create({
      baseURL: apiUrl
    })
    this.webhookClient = axios.create({
      baseURL: apiPermissionUrl
    })
    this.sandboxClient = axios.create({
      baseURL: apiSandboxUrl
    })
  }

  private client: AxiosInstance;

    private webhookClient: AxiosInstance;

    private sandboxClient: AxiosInstance

    private linkerAuthToken: IToken | undefined = undefined;

    private handleLinkerError(err: unknown): AppError {
      const linkerError = err as ILinkerError;

      console.error(linkerError);

      return new AppError(
        `Linker error: ${linkerError.response.data.message}`,
        linkerError.response.status,
      );
    }

    // será necessário rodar essa função em todos os métodos da classe
    private async generateToken(): Promise<IToken> {
      try {
        // verifica se há o token ou se o token está expirado
        if ((!this.linkerAuthToken?.access_token) || ((new Date().getTime() - this.linkerAuthToken.created_at) > this.linkerAuthToken.expires_in * 1000)) {
          const { data } = await this.client.post<IToken>('/oauth2/token?grant_type=client_credentials',
            undefined, {
              auth: {
                username: apiUsername,
                password: apiSecretKey
              }
            });

          this.linkerAuthToken = { ...data, created_at: new Date().getTime() };
          this.client.defaults.headers.Authorization = `Bearer ${data.access_token}`

          return this.linkerAuthToken;
        }
        return this.linkerAuthToken as IToken;
      } catch (err: unknown) {
        throw this.handleLinkerError(err);
      }
    }

    public async requestPermissionWebhook(): Promise<IPermissionWebhook> {
      const { data } = await this.webhookClient.post('/v1/ledger/permission/linker/status')

      return data
    }

    public async requestPermission(cpf: string, cnpj: string, action: string): Promise<IPermissionResponse> {
      const body = { cpf, cnpj, action };

      const token = await this.generateToken()

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await this.sandboxClient.post('/v1/ledger/permission/request', body, config)

      return data
    }

    public async revokeAcess(cpf: string, cnpj: string, action: string): Promise<void> {
      const token = await this.generateToken();

      const body = {
        cpf,
        cnpj,
        action,
      }

      const header = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      await this.sandboxClient.post('/v1/ledger/permission/revoke', body, header)
    }

    public async listPermissions(status: Status, cnpj: string): Promise<IPermissions[]> {
      const token = await this.generateToken();

      const header = {
        params: {
          status, cnpj
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await this.sandboxClient.get('/v1/edger/permission/list', header)

      return data;
    }
}
