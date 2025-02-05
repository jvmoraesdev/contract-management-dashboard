import contractsApi from '@/api/contractsApi';
import {
  getAllContracts,
  getContractByID,
  createContract,
  updateContract,
  deleteContractByID,
  getAllContractsStatus,
  getAllContractsTypes
} from '@/services/contracts.service';
import { Contract, ContractWithId, Status, Type } from '@/interfaces/contracts.interface';

jest.mock('../api/contractsApi');

describe('Contracts Service', () => {
  const mockContracts: ContractWithId[] = [
    {
      id: 'CT-001',
      name: 'Manutenção TI',
      clientOrSupplier: 'ABC Ltda.',
      startDate: new Date('2023-01-15'),
      endDate: new Date('2025-01-15'),
      status: 1,
      value: 150000.0,
      type: 1
    }
  ];

  it('should fetch all contracts', async () => {
    (contractsApi.getAllContracts as jest.Mock).mockResolvedValue(mockContracts);
    const result = await getAllContracts();
    expect(result).toEqual(mockContracts);
  });

  it('should fetch a contract by ID', async () => {
    const contract = mockContracts[0];
    (contractsApi.getContractByID as jest.Mock).mockResolvedValue(contract);
    const result = await getContractByID('CT-001');
    expect(result).toEqual(contract);
  });

  it('should create a contract', async () => {
    const newContract: Contract = {
      name: 'Novo Contrato',
      clientOrSupplier: 'Cliente X',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2026-01-01'),
      status: 1,
      value: 200000.0,
      type: 2
    };

    const createdContract: ContractWithId = { id: 'CT-999', ...newContract };
    (contractsApi.createContract as jest.Mock).mockResolvedValue(createdContract);

    const result = await createContract(newContract);
    expect(result).toEqual(createdContract);
  });

  it('should update a contract', async () => {
    const updatedContract = { ...mockContracts[0], name: 'Manutenção TI - Atualizado' };
    (contractsApi.updateContract as jest.Mock).mockResolvedValue(updatedContract);

    const result = await updateContract(updatedContract);
    expect(result).toEqual(updatedContract);
  });

  it('should delete a contract by ID', async () => {
    (contractsApi.deleteContractByID as jest.Mock).mockResolvedValue({
      message: 'Deleted successfully'
    });
    const result = await deleteContractByID('CT-001');
    expect(result).toBe('Deleted successfully');
  });

  it('should fetch all contract statuses', async () => {
    const mockStatuses: Status[] = [
      { id: 1, name: 'Ativo' },
      { id: 2, name: 'Expirado' }
    ];
    (contractsApi.getAllContractsStatus as jest.Mock).mockResolvedValue(mockStatuses);

    const result = await getAllContractsStatus();
    expect(result).toEqual(mockStatuses);
  });

  it('should fetch all contract types', async () => {
    const mockTypes: Type[] = [
      { id: 1, name: 'Serviço' },
      { id: 2, name: 'Fornecimento' }
    ];
    (contractsApi.getAllContractsTypes as jest.Mock).mockResolvedValue(mockTypes);

    const result = await getAllContractsTypes();
    expect(result).toEqual(mockTypes);
  });

  it('should throw an error if fetching contracts fails', async () => {
    (contractsApi.getAllContracts as jest.Mock).mockRejectedValue(new Error('API error'));

    try {
      await getAllContracts();
    } catch (error) {
      expect(error).toEqual('API error');
    }
  });
});
