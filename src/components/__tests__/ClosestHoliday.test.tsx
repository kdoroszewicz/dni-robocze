import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import ClosestHoliday from '../ClosestHoliday';
import { polishHolidays } from '../../workDaysUtils';
import * as dateFns from 'date-fns';
import * as dateFnsTz from 'date-fns-tz';

vi.mock('next/cache', () => ({
  unstable_noStore: vi.fn(),
}));

// We still need to mock date-fns to have predictable day calculations
vi.mock('date-fns', async () => {
  const actual = await vi.importActual('date-fns');
  return {
    ...actual,
    differenceInCalendarDays: vi.fn().mockReturnValue(16),
  };
});

vi.mock('date-fns-tz', async () => {
  const actual = await vi.importActual('date-fns-tz');
  return {
    ...actual,
    utcToZonedTime: vi.fn().mockImplementation((date) => date),
  };
});

describe('ClosestHoliday', () => {
  const mockDate = new Date('2024-03-15');
  const mockHoliday = {
    name: 'Wielkanoc',
    date: '2024-03-31',
    start: new Date('2024-03-31'),
    end: new Date('2024-03-31'),
    type: 'public',
    rule: 'easter'
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
    vi.spyOn(global.Date, 'now').mockImplementation(() => mockDate.getTime());
    vi.spyOn(dateFns, 'differenceInCalendarDays').mockReturnValue(16);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders the closest holiday information', () => {
    vi.spyOn(polishHolidays, 'getHolidays').mockReturnValue([mockHoliday]);

    render(<ClosestHoliday />);

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Najbliższe święto wolne od pracy za 16 dni to');
    expect(heading).toHaveTextContent('Wielkanoc');
  });

  it('does not render when no future holidays are found', () => {
    const pastHoliday = {
      name: 'Past Holiday',
      date: '2024-01-01',
      start: new Date('2024-01-01'),
      end: new Date('2024-01-01'),
      type: 'public',
      rule: 'fixed'
    };
    vi.spyOn(polishHolidays, 'getHolidays').mockReturnValue([pastHoliday]);
    vi.spyOn(dateFns, 'differenceInCalendarDays').mockReturnValue(-74);

    const { container } = render(<ClosestHoliday />);
    expect(container.firstChild).toBeNull();
  });

  it('checks next year for holidays if none found in current year', () => {
    const nextYearHoliday = {
      name: 'New Year',
      date: '2025-01-01',
      start: new Date('2025-01-01'),
      end: new Date('2025-01-01'),
      type: 'public',
      rule: 'fixed'
    };
    const getHolidaysSpy = vi.spyOn(polishHolidays, 'getHolidays');
    getHolidaysSpy
      .mockReturnValueOnce([]) // Current year - no holidays
      .mockReturnValueOnce([nextYearHoliday]); // Next year
    vi.spyOn(dateFns, 'differenceInCalendarDays').mockReturnValue(292);

    render(<ClosestHoliday />);

    expect(getHolidaysSpy).toHaveBeenCalledTimes(2);
    expect(getHolidaysSpy).toHaveBeenNthCalledWith(1, 2024);
    expect(getHolidaysSpy).toHaveBeenNthCalledWith(2, 2025);
    expect(screen.getByText('New Year')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    vi.spyOn(polishHolidays, 'getHolidays').mockReturnValue([mockHoliday]);
    const customClass = 'custom-class';

    render(<ClosestHoliday className={customClass} />);

    const heading = screen.getByRole('heading');
    expect(heading.className).toContain(customClass);
  });

  it('generates correct holiday URL', () => {
    vi.spyOn(polishHolidays, 'getHolidays').mockReturnValue([mockHoliday]);

    render(<ClosestHoliday />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/wielkanoc');
  });
}); 