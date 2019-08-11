import { Schema } from '../../types';
export interface ContractRoleType {
    roleGetter: string;
    roleSetter: string;
    address: string;
    name?: string;
    description?: string;
}
export declare const ContractRoleSchema: Schema<ContractRoleType>;
