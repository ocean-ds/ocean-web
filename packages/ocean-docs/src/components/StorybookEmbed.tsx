import React from 'react';
import styles from './StorybookEmbed.module.css';

interface StorybookEmbedProps {
  /** ID da story no Storybook (ex: "components-button--usage") */
  storyId: string;
  /** Altura do iframe (padrão: 400px) */
  height?: number;
  /** Mostrar toolbar do Storybook (padrão: true) */
  showToolbar?: boolean;
  /** Mostrar apenas o canvas sem painel lateral */
  viewMode?: 'story' | 'docs';
  /** Título do embed para acessibilidade */
  title?: string;
}

export default function StorybookEmbed({
  storyId,
  height = 400,
  showToolbar = true,
  viewMode = 'story',
  title = 'Storybook Story',
}: StorybookEmbedProps): JSX.Element {
  const baseUrl = 'https://ocean-ds.github.io/ocean-web';

  // URL para iframe com toolbar
  const toolbarUrl = `${baseUrl}/?path=/story/${storyId}&full=1&shortcuts=false&singleStory=true`;

  // URL para iframe apenas com canvas
  const canvasUrl = `${baseUrl}/iframe.html?id=${storyId}&viewMode=${viewMode}&shortcuts=false&singleStory=true`;

  const iframeSrc = showToolbar ? toolbarUrl : canvasUrl;

  return (
    <div className={styles.storybookEmbed}>
      <iframe
        src={iframeSrc}
        width="100%"
        height={height}
        title={title}
        className={styles.iframe}
        loading="lazy"
      />
      <div className={styles.footer}>
        <a
          href={`${baseUrl}/?path=/story/${storyId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          🚀 Abrir no Storybook
        </a>
      </div>
    </div>
  );
}
