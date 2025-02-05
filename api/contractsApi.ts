import { Contract, ContractWithId } from '@/interfaces/contracts.interface';
import mocked from './__mock__.json';
import axios from 'axios';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'content-type': 'application/json' }
});

/*
 * Many backend functionalities are simulated here. However, it is important to emphasize that
 * a real API layer would only call the backend and return the result without manipulating data.
 */

export default {
  getAllContracts: () =>
    new Promise((resolve, reject) => {
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
      const contracts = mocked.contracts.map((contract) => ({
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
    new Promise((resolve, reject) => {
      // Mock response that would be returned by the API
      const selectedContract = mocked.contracts.find((contract) => contract.id === id);

      if (selectedContract) {
        resolve(selectedContract);
      } else {
        reject({ message: `Contract ${id} not found` });
      }
    }),

  createContract: async (contract: Contract) =>
    new Promise((resolve) => {
      // Mock response that would be returned by the API
      const lastContract = mocked.contracts[mocked.contracts.length - 1];
      const newId = `CT-${(parseInt(lastContract.id.split('-')[1]) + 1).toString().padStart(3, '0')}`;
      const newContract = {
        ...contract,
        id: newId,
        startDate: moment(contract.startDate).format('YYYY-MM-DD'),
        endDate: moment(contract.endDate).format('YYYY-MM-DD')
      };

      mocked.contracts.push(newContract);

      resolve(mocked.contracts);
    }),

  updateContract: async (updatedContract: ContractWithId) =>
    new Promise((resolve) => {
      // Mock response that would be returned by the API
      const contractIndex = mocked.contracts.findIndex(
        (contract) => contract.id === updatedContract.id
      );

      if (contractIndex !== -1) {
        mocked.contracts[contractIndex] = {
          ...updatedContract,
          startDate: moment(updatedContract.startDate).format('YYYY-MM-DD'),
          endDate: moment(updatedContract.endDate).format('YYYY-MM-DD')
        };

        resolve(mocked.contracts[contractIndex]);
      } else {
        resolve({ message: `Contract ${updatedContract.id} not found` });
      }
    }),

  deleteContractByID: async (id: string) =>
    new Promise((resolve, reject) => {
      // Mock response that would be returned by the API
      const contrac = mocked.contracts.findIndex((contract) => contract.id === id);

      if (contrac !== -1) {
        mocked.contracts.splice(contrac, 1);
        resolve({ message: `Contract ${id} deleted successfully` });
      } else {
        reject({ message: `Contract ${id} not found` });
      }
    }),

  getAllContractsTypes: () =>
    new Promise((resolve, reject) => {
      const types = mocked.types;
      if (types.length) {
        resolve(types);
      } else {
        reject({ message: 'No types found' });
      }
    }),

  getAllContractsStatus: () =>
    new Promise((resolve, reject) => {
      const status = mocked.status;
      if (status.length) {
        resolve(status);
      } else {
        reject({ message: 'No status found' });
      }
    })
};
