import React from 'react';
import AlertLevel from '../../enums/AlertLevel';

const Alert: React.FC<{ message: string, level: AlertLevel }> = ({ message, level }) => {
  const setAlertLevel = (): string => {
    switch (level) {
      case AlertLevel.Error:
        return 'alert-danger';
      case AlertLevel.Warning:
        return 'alert-warning';
      default:
        return 'alert-info';
    }
  };

  return (
    <div className={`alert ${setAlertLevel()}`} role="alert">
      { message }
    </div>
  );
};

export default Alert;
