/// <reference types="jest" />
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Matcher } from 'react-day-picker';

/**
 * Helper para encontrar e clicar em um dia desabilitado no calendário
 */
export function clickDisabledDay(): void {
  const calendar = screen.getByTestId('datepicker-calendar');
  const disabledDays = calendar.querySelectorAll('.ods-date__disabled');

  expect(disabledDays.length).toBeGreaterThan(0);

  const firstDisabledDay = disabledDays[0];
  expect(firstDisabledDay).not.toBeNull();

  const clickableElement =
    (firstDisabledDay as HTMLElement).querySelector('button') ||
    (firstDisabledDay as HTMLElement);
  fireEvent.click(clickableElement);
}

/**
 * Helper para abrir o calendário clicando no input
 */
export function openCalendar(inputTestId = 'datepicker-input-1'): void {
  const input = screen.getByTestId(inputTestId);
  fireEvent.click(input);
  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();
}

/**
 * Helper para verificar se o tooltip aparece com a mensagem esperada
 */
export async function expectTooltipToAppear(
  message: string,
  timeout = 3000
): Promise<void> {
  await waitFor(
    () => {
      const tooltip = screen.getByTestId('datepicker-disabled-tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(message);
    },
    { timeout }
  );
}

/**
 * Helper para verificar se o tooltip não aparece
 */
export function expectTooltipNotToAppear(): void {
  expect(
    screen.queryByTestId('datepicker-disabled-tooltip')
  ).not.toBeInTheDocument();
}

/**
 * Helper para verificar se o tooltip não aparece (versão assíncrona com waitFor)
 */
export async function expectTooltipNotToAppearAsync(): Promise<void> {
  await waitFor(() => {
    expect(
      screen.queryByTestId('datepicker-disabled-tooltip')
    ).not.toBeInTheDocument();
  });
}

export const commonDisabledDaysProps = {
  get disabledDays(): Matcher[] {
    return [{ before: new Date() }] as Matcher[];
  },
  disabledDaysMessage: 'Este dia está bloqueado',
};

export function getFirstDisabledDate(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
}

/** Mensagem para o primeiro dia desabilitado nos testes de lista */
export const LIST_DISABLED_MESSAGE = 'Feriado municipal';

export function makeDisabledDaysListProps(): {
  disabledDays: Matcher[];
  disabledDaysMessage: { date: Date; message: string }[];
} {
  return {
    disabledDays: [{ before: new Date() }] as Matcher[],
    disabledDaysMessage: [
      { date: getFirstDisabledDate(), message: LIST_DISABLED_MESSAGE },
    ],
  };
}
