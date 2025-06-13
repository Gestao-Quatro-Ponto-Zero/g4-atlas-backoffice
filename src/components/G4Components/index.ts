// Centralização de componentes do G4 Apollo Design System
// PRIORIDADE 1: Sempre usar G4 Design System quando disponível

// Quando o G4 Design System estiver disponível, descomente e use:
// export { Button } from '@g4-educacao/g4-apollo-design-system';
// export { Checkbox } from '@g4-educacao/g4-apollo-design-system';
// export { Card } from '@g4-educacao/g4-apollo-design-system';
// export { Input } from '@g4-educacao/g4-apollo-design-system';
// export type { ButtonProps } from '@g4-educacao/g4-apollo-design-system';

// Temporariamente, re-exportamos do Shadcn até G4 estar disponível
export { Button } from '@/components/ui/button';
export { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export { Input } from '@/components/ui/input';
export { Checkbox } from '@/components/ui/checkbox';

// TODO: Migrar para G4 Design System quando disponível
// Documentação: https://gestao-quatro-ponto-zero.github.io/g4-apollo-design-system/