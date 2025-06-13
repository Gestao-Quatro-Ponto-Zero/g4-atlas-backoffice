# useAnalytics Hook

Hook para gerenciar analytics de forma consistente na aplicação.

## Uso

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const { trackButtonClick, trackUserAction, trackError } = useAnalytics();

  const handleClick = () => {
    trackButtonClick('header-login', { section: 'navigation' });
  };

  const handleSearch = (query: string) => {
    trackUserAction('search_performed', { query, resultsCount: 42 });
  };

  return (
    <button onClick={handleClick}>Login</button>
  );
};
```

## Métodos Disponíveis

### trackUserAction(action, parameters?)
Rastreia ações customizadas do usuário.

### trackPageView(url?)
Rastreia visualizações de página.

### trackButtonClick(buttonName, additionalData?)
Rastreia cliques em botões.

### trackError(error, additionalData?)
Rastreia erros da aplicação.

### trackFormSubmit(formName, additionalData?)
Rastreia submissões de formulários.

## Configuração

Configure o Google Analytics ID no arquivo `.env`:

```env
VITE_GA_ID=G-XXXXXXXXXX
```