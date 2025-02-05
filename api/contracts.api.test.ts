import contractsApi from '@/api/contractsApi';
describe('contractsApi Mock Tests', () => {
  test('getAllContracts should return a list of contracts', async () => {
    const contracts = await contractsApi.getAllContracts();
    expect(Array.isArray(contracts)).toBe(true);
    expect(contracts.length).toBeGreaterThan(0);
    expect(contracts[0]).toHaveProperty('id');
  });

  test('getContractByID should return a contract when found', async () => {
    const contract = await contractsApi.getContractByID('CT-001');
    expect(contract).toHaveProperty('id', 'CT-001');
  });

  test('getContractByID should reject if contract is not found', async () => {
    await expect(contractsApi.getContractByID('INVALID_ID')).rejects.toEqual({
      message: 'Contract INVALID_ID not found'
    });
  });

  test('createContract should add a new contract', async () => {
    const newContract = {
      name: 'New Contract',
      clientOrSupplier: 'Client',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-01'),
      status: 1,
      value: 1000,
      type: 2
    };
    const createdContract = await contractsApi.createContract(newContract);
    expect(createdContract).toHaveProperty('id');
    expect(createdContract.name).toBe('New Contract');
  });

  test('updateContract should modify an existing contract', async () => {
    const updatedContract = {
      id: 'CT-001',
      name: 'Updated Name',
      clientOrSupplier: 'Supplier',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      status: 1,
      value: 2000,
      type: 2
    };
    const contract = await contractsApi.updateContract(updatedContract);
    expect(contract.name).toBe('Updated Name');
  });

  test('updateContract should reject if contract does not exist', async () => {
    await expect(
      contractsApi.updateContract({
        id: 'INVALID_ID',
        name: 'Updated Name',
        clientOrSupplier: 'Supplier',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-01-01'),
        status: 1,
        value: 2000,
        type: 2
      })
    ).rejects.toEqual({
      message: 'Contract INVALID_ID not found'
    });
  });

  test('deleteContractByID should remove a contract', async () => {
    const response = await contractsApi.deleteContractByID('CT-001');
    expect(response).toEqual({ message: 'Contract CT-001 deleted successfully' });
  });

  test('deleteContractByID should reject if contract does not exist', async () => {
    await expect(contractsApi.deleteContractByID('INVALID_ID')).rejects.toEqual({
      message: 'Contract INVALID_ID not found'
    });
  });

  test('getAllContractsTypes should return contract types', async () => {
    const types = await contractsApi.getAllContractsTypes();
    expect(Array.isArray(types)).toBe(true);
    expect(types.length).toBeGreaterThan(0);
  });

  test('getAllContractsStatus should return contract statuses', async () => {
    const statuses = await contractsApi.getAllContractsStatus();
    expect(Array.isArray(statuses)).toBe(true);
    expect(statuses.length).toBeGreaterThan(0);
  });
});
