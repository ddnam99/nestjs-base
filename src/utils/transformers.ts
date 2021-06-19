import { Transform } from 'class-transformer';

export const Trim = () =>
  Transform(({ value }) => {
    if (!value) return value;

    if (typeof value === 'string') {
      return value?.trim();
    }
  });
