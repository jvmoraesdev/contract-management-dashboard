import { Contract, ContractWithId, Status, Type } from '@/interfaces/contracts.interface';
import mocked from './__mock__.json';
import axios from 'axios';
import { Response } from '@/interfaces/general.interface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'content-type': 'application/json' }
});

/*
 * Many backend functionalities are simulated here. However, it is important to emphasize that
 * a real API layer would only call the backend and return the result without manipulating data.
 */

/*
 * Since JSON does not support the Date type, it was decided to keep it as a string and perform the
 * conversion at the time of usage.
 */
const formattedContracts: ContractWithId[] = mocked.contracts.map((contract) => ({
  ...contract,
  startDate: new Date(`${contract.startDate}T00:00:00`),
  endDate: new Date(`${contract.endDate}T00:00:00`)
}));

export default {
  getAllContracts: () =>
    new Promise<ContractWithId[]>((resolve, reject) => {
      /*
       * If calling the backend is required, this is how it would be done.
       * Since we are using a mock, it is not necessary.
       */

      /*
       * instance
       *    .get('/contracts')
       *    .then((response) => {
       *        if (response.status === 200) {
       *          resolve(response.data.body);
       *        } else {
       *          reject(new Error('Error'));
       *        }
       *    })
       *    .catch((error) => {
       *        console.error(error);
       *        reject(error);
       *    });
       */

      // Mock response that would be returned by the API
      const contracts = formattedContracts.map((contract) => ({
        ...contract,
        startDate: new Date(contract.startDate),
        endDate: new Date(contract.endDate)
      }));

      if (contracts.length) {
        resolve(contracts);
      } else {
        reject({ message: 'No contracts found' });
      }
    }),

  getContractByID: (id: string) =>
    new Promise<ContractWithId>((resolve, reject) => {
      // Mock response that would be returned by the API
      const selectedContract = formattedContracts.find((contract) => contract.id === id);

      if (selectedContract) {
        resolve(selectedContract);
      } else {
        reject({ message: `Contract ${id} not found` });
      }
    }),

  createContract: async (contract: Contract) =>
    new Promise<ContractWithId>((resolve) => {
      // Mock response that would be returned by the API
      const lastContract = formattedContracts[formattedContracts.length - 1];
      const newId = `CT-${(parseInt(lastContract.id.split('-')[1]) + 1).toString().padStart(3, '0')}`;
      const newContract = {
        ...contract,
        id: newId
      };

      formattedContracts.push(newContract);

      resolve(newContract);
    }),

  updateContract: async (updatedContract: ContractWithId) =>
    new Promise<ContractWithId>((resolve, reject) => {
      // Mock response that would be returned by the API
      const contractIndex = formattedContracts.findIndex(
        (contract) => contract.id === updatedContract.id
      );

      if (contractIndex !== -1) {
        formattedContracts[contractIndex] = {
          ...updatedContract
        };

        resolve(formattedContracts[contractIndex]);
      } else {
        reject({ message: `Contract ${updatedContract.id} not found` });
      }
    }),

  deleteContractByID: async (id: string) =>
    new Promise<Response>((resolve, reject) => {
      // Mock response that would be returned by the API
      const contract = formattedContracts.findIndex((contract) => contract.id === id);

      if (contract !== -1) {
        formattedContracts.splice(contract, 1);
        resolve({ message: `Contract ${id} deleted successfully` });
      } else {
        reject({ message: `Contract ${id} not found` });
      }
    }),

  getAllContractsTypes: () =>
    new Promise<Type[]>((resolve, reject) => {
      const types = mocked.types;
      if (types.length) {
        resolve(types);
      } else {
        reject({ message: 'No types found' });
      }
    }),

  getAllContractsStatus: () =>
    new Promise<Status[]>((resolve, reject) => {
      const status = mocked.status;
      if (status.length) {
        resolve(status);
      } else {
        reject({ message: 'No status found' });
      }
    })
};
