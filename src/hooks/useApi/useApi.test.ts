import { renderHook, act } from '../../../tests';
import { useApi } from './useApi';

// Mock API function
const mockApiFunction = vi.fn();

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useApi(mockApiFunction));
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle successful API call', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockApiFunction.mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useApi(mockApiFunction));
    
    await act(async () => {
      await result.current.execute();
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle API error', async () => {
    const mockError = new Error('API Error');
    mockApiFunction.mockRejectedValue(mockError);
    
    const { result } = renderHook(() => useApi(mockApiFunction));
    
    await act(async () => {
      try {
        await result.current.execute();
      } catch (error) {
        // Expected to throw
      }
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(mockError);
  });

  it('should call onSuccess callback', async () => {
    const mockData = { id: 1, name: 'Test' };
    const onSuccess = vi.fn();
    mockApiFunction.mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useApi(mockApiFunction, { onSuccess }));
    
    await act(async () => {
      await result.current.execute();
    });
    
    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  it('should reset state', () => {
    const { result } = renderHook(() => useApi(mockApiFunction));
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});