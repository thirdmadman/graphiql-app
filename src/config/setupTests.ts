/// <reference types="vitest/globals" />
import '@testing-library/react';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
