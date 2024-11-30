import { useState, useCallback } from 'react';

interface NotificationOptions {
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export function useNotification() {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<NotificationOptions['type']>('info');
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = useCallback((
    text: string,
    options: NotificationOptions = {}
  ) => {
    setMessage(text);
    setType(options.type || 'info');
    setIsVisible(true);

    if (options.duration !== 0) {
      setTimeout(() => {
        setIsVisible(false);
      }, options.duration || 3000);
    }
  }, []);

  const hideNotification = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    message,
    type,
    isVisible,
    showNotification,
    hideNotification,
  };
}