import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getYearsOfExperience = (startDate: Date, now = new Date()) => {
  const years = now.getFullYear() - startDate.getFullYear();
  const anniversary = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());

  return now < anniversary ? years - 1 : years;
};
