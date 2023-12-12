'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  disableExec,
  enableExec,
} from '@/lib/redux/features/details/detailsSlice';

export const Details = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((store) => store.form);

  return (
    <div>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          aria-label="Open"
          onClick={() => dispatch(disableExec())}
        >
          Disable Execution
        </button>
        <div>
          <p>Submit button blocked? {form.isExecDisable.toString()}</p>
          <p>Counted of onChange textAria events: {form.value}</p>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          aria-label="Close"
          onClick={() => dispatch(enableExec())}
        >
          Enable Execution
        </button>
      </div>
    </div>
  );
};
