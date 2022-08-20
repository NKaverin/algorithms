export function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const route = 'http://localhost:3000';