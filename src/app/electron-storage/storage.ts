import Store from 'electron-store';

const store = new Store();

export function saveCompanyData(companyData: any) {
  store.set('company', companyData);
}

export function getCompanyData() {
  return store.get('company');
}

export function clearCompanyData() {
  store.delete('company');
}
