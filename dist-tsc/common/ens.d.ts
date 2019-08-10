import { Schema } from '../types';
export interface ENSName {
    nodeHash: string;
    nameHash: string;
    name: string;
}
export declare const namehash: (name: string) => string;
export declare const nodehash: (name: string) => string;
export declare const ENSNameBaseSchema: Required<Pick<Schema<ENSName>, 'fields' | 'assetFromFields' | 'checkAsset' | 'hash'>>;
