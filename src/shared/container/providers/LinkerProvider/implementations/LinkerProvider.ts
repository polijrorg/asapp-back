/* eslint-disable no-console */
import linkerConfig from '@config/linker';
import AppError from '@shared/errors/AppError';
import axios, { AxiosInstance } from 'axios';
import { injectable } from 'tsyringe';
import ICreateTransferDTO from '../dtos/ICreateTransferDTO';
import ILinkerError from '../entities/ILinkerError';
import IToken from '../entities/IToken';
import ITransferRequest from '../entities/ITransferRequest';
import ITransferResponse from '../entities/ITransferResponse';
import ILinkerProvider from '../models/ILinkerProvider';
import IPermissionWebhook from '../entities/IPermissionWebhook';
import IPermissionResponse from '../entities/IPermissionResponse';
import IPermissions from '../entities/IPermissions';

const { authUrl, apiSecretKey, apiUsername, apiUrl } = linkerConfig;

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
    this.authClient = axios.create({
      baseURL: authUrl
    });
    this.apiClient = axios.create({
      baseURL: apiUrl
    });
  }

  private authClient: AxiosInstance;

  private apiClient: AxiosInstance;

  private linkerAuthToken: IToken | undefined = undefined;

  private handleLinkerError(err: unknown): AppError {
    const linkerError = err as ILinkerError;

    console.error(linkerError);

    return new AppError(
      `Linker error: ${linkerError.response.data.message}`,
      linkerError.response.status
    );
  }

  // será necessário rodar essa função em todos os métodos da classe
  private async generateToken(): Promise<IToken> {
    try {
      // verifica se há o token ou se o token está expirado
      if (
        !this.linkerAuthToken?.access_token ||
        new Date().getTime() - this.linkerAuthToken.created_at >
          this.linkerAuthToken.expires_in * 1000
      ) {
        const { data } = await this.authClient.post<IToken>(
          '/oauth2/token?grant_type=client_credentials',
          undefined,
          {
            auth: {
              username: apiUsername,
              password: apiSecretKey
            }
          }
        );

        this.linkerAuthToken = { ...data, created_at: new Date().getTime() };
        this.apiClient.defaults.headers.Authorization = `Bearer ${data.access_token}`;

        return this.linkerAuthToken as IToken;
      }
      return this.linkerAuthToken as IToken;
    } catch (err: unknown) {
      throw this.handleLinkerError(err);
    }
  }

  public async createTransfer({
    amount,
    contact_email,
    destiny_key
  }: ICreateTransferDTO): Promise<ITransferResponse> {
    try {
      await this.generateToken();

      const data: ITransferRequest = {
        request_type: 'PIX_OPEN_API',
        request_sub_type: 'PIX_OPEN_API_CREATE',
        cnpj: process.env.CNPJ as string,
        request_payload: {
          amount,
          contact_email,
          destiny_key,
          cnpj: process.env.CNPJ as string,
          notification: true,
          transfer_type: 1
        }
      };

      const response = await this.apiClient.post<ITransferResponse>(
        '/v1/pix/transfers/create',
        data
      );

      return response.data;
    } catch (err: unknown) {
      throw this.handleLinkerError(err);
    }
  }
}
