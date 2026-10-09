import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DocsContext } from '@storybook/blocks';
import { STORY_ARGS_UPDATED, UPDATE_STORY_ARGS } from '@storybook/core-events';
import { Select } from '../../packages/ocean-react/src/Select';
import Switch from '../../packages/ocean-react/src/Switch';
import Input from '../../packages/ocean-react/src/Input';
import TextArea from '../../packages/ocean-react/src/TextArea';
import { c } from './blocks';
import { Md, Translate } from './i18n';

/*
 * Props table of a component with live controls. Each control updates the args of the
 * story given in `of`, so the example rendered with <Story of={…} /> changes with it.
 */

export type ApiArgType = {
  description?: string;
  descriptionKey?: string;
  descriptionVars?: Record<string, string>;
  control?: unknown;
  options?: string[];
  table?: {
    category?: string;
    type?: { summary: string };
    defaultValue?: { summary: string };
  };
};

type Args = Record<string, unknown>;

type Channel = {
  on: (event: string, fn: (payload: never) => void) => void;
  off: (event: string, fn: (payload: never) => void) => void;
  emit: (event: string, payload: unknown) => void;
};

type ResolvedStory = { id: string; initialArgs: Args };

type Context = {
  channel: Channel;
  resolveOf: (of: unknown, types: string[]) => { story: ResolvedStory };
  getStoryContext: (story: ResolvedStory) => { args: Args };
};

const useStoryArgs = (
  of: unknown
): [Args, (name: string, value: unknown) => void] => {
  const context = useContext(DocsContext) as unknown as Context;
  const story = useMemo(
    () => context.resolveOf(of, ['story']).story,
    [context, of]
  );
  const [args, setArgs] = useState<Args>(() => {
    try {
      return context.getStoryContext(story).args;
    } catch {
      return story.initialArgs;
    }
  });

  useEffect(() => {
    const onUpdate = ({
      storyId,
      args: next,
    }: {
      storyId: string;
      args: Args;
    }) => {
      if (storyId === story.id) setArgs(next);
    };
    context.channel.on(
      STORY_ARGS_UPDATED,
      onUpdate as (payload: never) => void
    );
    return () =>
      context.channel.off(
        STORY_ARGS_UPDATED,
        onUpdate as (payload: never) => void
      );
  }, [context, story]);

  const update = (name: string, value: unknown) => {
    setArgs((current) => ({ ...current, [name]: value }));
    context.channel.emit(UPDATE_STORY_ARGS, {
      storyId: story.id,
      updatedArgs: { [name]: value },
    });
  };
  return [args, update];
};

const controlType = (argType: ApiArgType): string | undefined =>
  typeof argType.control === 'string'
    ? argType.control
    : (argType.control as { type?: string } | undefined)?.type;

const JsonControl = ({
  name,
  value,
  onChange,
  t,
}: {
  name: string;
  value: unknown;
  onChange: (value: unknown) => void;
  t: Translate;
}) => {
  const text = JSON.stringify(value ?? {}, null, 2);
  const [draft, setDraft] = useState(text);
  const [error, setError] = useState(false);
  useEffect(() => setDraft(text), [text]);
  return (
    <TextArea
      aria-label={name}
      className="odoc-json"
      value={draft}
      rows={Math.min(8, draft.split('\n').length)}
      error={error}
      helperText={error ? t('api.invalidJson') : undefined}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setDraft(event.target.value)
      }
      onBlur={() => {
        try {
          onChange(JSON.parse(draft));
          setError(false);
        } catch {
          setError(true);
        }
      }}
    />
  );
};

const Control = ({
  name,
  argType,
  value,
  onChange,
  t,
}: {
  name: string;
  argType: ApiArgType;
  value: unknown;
  onChange: (value: unknown) => void;
  t: Translate;
}): React.ReactElement => {
  const type = controlType(argType);
  const fallback = argType.table?.defaultValue?.summary.replace(/^'|'$/g, '');
  if (argType.control === false || !type) return <>–</>;
  if (type === 'boolean')
    return (
      <Switch
        id={`odoc-control-${name}`}
        aria-label={name}
        checked={value === undefined ? fallback === 'true' : Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    );
  if (['select', 'radio', 'inline-radio'].includes(type) && argType.options)
    return (
      <Select
        ariaLabel={name}
        className="odoc-control-select"
        options={argType.options.map((option) => ({
          value: option,
          label: option,
        }))}
        value={(value as string) ?? fallback ?? argType.options[0]}
        onChange={(option) => onChange(option.value)}
      />
    );
  if (type === 'text')
    return (
      <Input
        aria-label={name}
        value={(value as string) ?? ''}
        placeholder={fallback}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  if (type === 'object')
    return <JsonControl name={name} value={value} onChange={onChange} t={t} />;
  return <>–</>;
};

const describe = (name: string, argType: ApiArgType, t: Translate) => {
  const key = argType.descriptionKey ?? `api.${name}`;
  const text = t.has(key) ? t(key) : argType.description ?? '';
  return Object.entries(argType.descriptionVars ?? {}).reduce(
    (result, [k, v]) => result.replace(`{${k}}`, v),
    text
  );
};

/** Props grouped by category (component props first, then the nested blocks). */
export const ApiTable = ({
  of,
  argTypes,
  t,
}: {
  of: unknown;
  argTypes: Record<string, ApiArgType>;
  t: Translate;
}): React.ReactElement => {
  const [args, update] = useStoryArgs(of);
  const groups: [string, [string, ApiArgType][]][] = [];
  Object.entries(argTypes).forEach(([name, argType]) => {
    const category = argType.table?.category ?? '';
    let group = groups.find(([key]) => key === category);
    if (!group) {
      group = [category, []];
      groups.push(group);
    }
    group[1].push([name, argType]);
  });

  return (
    <div className="odoc-table-wrap">
      <table className="odoc-table odoc-api">
        <thead>
          <tr>
            <th scope="col">{t('api.name')}</th>
            <th scope="col">{t('api.description')}</th>
            <th scope="col">{t('api.default')}</th>
            <th scope="col">{t('api.control')}</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(([category, rows]) => (
            <React.Fragment key={category}>
              <tr className="odoc-api__group">
                <th scope="colgroup" colSpan={4}>
                  {category === 'Nested blocks'
                    ? t('api.nestedBlocks')
                    : category}
                </th>
              </tr>
              {rows.map(([name, argType]) => (
                <tr key={name}>
                  <td>{c(name)}</td>
                  <td>
                    <Md text={describe(name, argType, t)} />
                    {argType.table?.type && (
                      <span className="odoc-api__type">
                        {c(argType.table.type.summary)}
                      </span>
                    )}
                  </td>
                  <td>
                    {argType.table?.defaultValue
                      ? c(argType.table.defaultValue.summary)
                      : '–'}
                  </td>
                  <td className="odoc-api__control">
                    <Control
                      name={name}
                      argType={argType}
                      value={args[name]}
                      onChange={(value) => update(name, value)}
                      t={t}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
