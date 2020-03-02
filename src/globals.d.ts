declare module 'ethereumjs-abi' {
  const soliditySHA3: (argTypes: string[], args: any[]) => Buffer;
  const methodID: (name: string, types: string[]) => Buffer;
  const rawEncode: (argTypes: string[], args: any[]) => Buffer;
  const encodeSingle: (type: string, arg: any) => Buffer;
  const elementaryName: (name: string) => string;
  const isDynamic: (type: string) => boolean;
}

declare module 'wyvern-js' {
  export const WyvernProtocol: any;
}

declare module '*.json' {
  const value: any;
  export default value;
}
