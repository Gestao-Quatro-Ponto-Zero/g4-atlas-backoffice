# useApi Hook

Hook personalizado para gerenciar chamadas de API com loading, error e data states.

## Uso

```tsx
import { useApi } from '@/hooks/useApi';
import { userService } from '@/services';

const UserProfile = () => {
  const { data: user, loading, error, execute } = useApi(userService.getUserProfile);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};
```

## Com Callbacks

```tsx
const { execute } = useApi(userService.updateUser, {
  onSuccess: (user) => {
    toast.success('Usuário atualizado com sucesso!');
  },
  onError: (error) => {
    toast.error(`Erro: ${error.message}`);
  }
});
```

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| apiFunction | Function | Função de API a ser executada |
| options | UseApiOptions | Callbacks opcionais |

## Return

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| data | T \| null | Dados retornados da API |
| loading | boolean | Estado de carregamento |
| error | Error \| null | Erro da requisição |
| execute | Function | Executa a chamada da API |
| reset | Function | Reseta o estado do hook |