import React, { useState } from 'react';

/**
 * Hook for showing/hiding contact-form toast alerts.
 *
 * @returns {{
 *   alert: { show: boolean, text: string, type: 'danger' | 'success' },
 *   showAlert: (opts: { text: string, type?: 'danger' | 'success' }) => void,
 *   hideAlert: () => void
 * }}
 *
 * @example
 * const { alert, showAlert, hideAlert } = useAlert();
 * showAlert({ text: 'Sent!', type: 'success' });
 */
const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' });

  /**
   * Display an alert banner.
   * @param {{ text: string, type?: 'danger' | 'success' }} opts
   */
  const showAlert = ({ text, type = 'danger' }) =>
    setAlert({
      show: true,
      text,
      type,
    });

  /** Hide the current alert and reset state. */
  const hideAlert = () =>
    setAlert({
      show: false,
      text: '',
      type: 'danger',
    });

  return { alert, showAlert, hideAlert };
};

export default useAlert;
