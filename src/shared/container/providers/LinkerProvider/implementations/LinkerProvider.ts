import linkerConfig from '@config/linker';
import axios, { AxiosInstance } from 'axios';
import ILinkerProvider from '../models/ILinkerProvider';

const {apiUrl, apiSecretKey, apiUsername} = linkerConfig;

export default class LinkerProvider implements ILinkerProvider {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: apiUrl,
            
        })
    }
}