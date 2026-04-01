# CLAUDE.md

## Knowledge Base (OBRIGATÓRIO)

A Blu mantém uma **base de conhecimento centralizada** com diretrizes de arquitetura, padrões de código, deploy, observabilidade e mais:
- Repositório: git@github.com:Pagnet/knowledge-bases.git

### Como localizar os arquivos

O caminho de acesso depende do ambiente de execução:

| Ambiente | Caminho base |
|---|---|
| **GitHub Action** | `./knowledge-bases/knowledge-bases/` (já clonado pelo workflow) |
| **Local** | Clone temporário (veja abaixo) |

**No ambiente local**, clone o repositório antes de iniciar a tarefa:

```bash
kb_dir=$(mktemp -d)
git clone --depth 1 git@github.com:Pagnet/knowledge-bases.git "$kb_dir"
# Arquivos em: $kb_dir/knowledge-bases/
```

### Regras de uso

> **⚠️ REGRA PRINCIPAL: A knowledge base DEVE ser clonada e consultada ANTES de qualquer outra ação.** Não analise código, não elabore planos, não faça review, não sugira mudanças e não implemente nada antes de ter lido os arquivos relevantes da knowledge base. Esta é a primeira etapa obrigatória de toda tarefa, sem exceção.

1. **Antes de qualquer coisa**, clone a knowledge base (se local) e liste recursivamente todos os arquivos `.md` disponíveis para descobrir o que está disponível. Nenhuma análise de código ou planejamento deve acontecer antes desta etapa.
2. **Leia os arquivos relevantes da knowledge base** ao contexto da tarefa antes de olhar para o código do projeto. Sempre leia `agents/reviewer.md` e `skills/review.md` quando existirem e a tarefa envolver review.
3. **Somente após consultar a knowledge base**, prossiga com análise de código, elaboração de planos, code review, sugestões de mudanças ou implementação.
4. **Cite a diretriz** quando apontar um problema. Ex: "Conforme `architecture/clean-arch.md`, a camada de domain não deve depender de infra."
5. **Se os arquivos não puderem ser lidos** (erro de permissão, clone falhou), informe explicitamente que as diretrizes não puderam ser consultadas e **não prossiga** até alinhar com o usuário.
