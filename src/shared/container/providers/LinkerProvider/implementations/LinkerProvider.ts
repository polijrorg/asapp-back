/* eslint-disable no-console */
import linkerConfig from '@config/linker';
import AppError from '@shared/errors/AppError';
import axios, { AxiosInstance } from 'axios';
import { injectable } from 'tsyringe';
import ILinkerError from '../entities/ILinkerError';
import IToken from '../entities/IToken';
import ILinkerProvider from '../models/ILinkerProvider';

const { apiUrl, apiSecretKey, apiUsername } = linkerConfig;

@injectable()
export default class LinkerProvider implements ILinkerProvider {
  constructor() {
    this.client = axios.create({
      baseURL: apiUrl
    })
  }

    private client: AxiosInstance;

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
}
