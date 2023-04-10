import { container } from 'tsyringe';
import LinkerProvider from './implementations/LinkerProvider';
import ILinkerProvider from './models/ILinkerProvider';

container.registerSingleton<ILinkerProvider>('LinkerProvider', LinkerProvider);
