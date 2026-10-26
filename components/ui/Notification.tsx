import ReactDOM from 'react-dom';
import classes from './Notification.module.css';
import React from 'react';

export type NotificationStatus = 'pending' | 'success' | 'error';

export interface NotificationProps {
  title: string;
  message: string;
  status: NotificationStatus;
}

function Notification({ title, message, status }: NotificationProps) {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  const portalTarget = document.getElementById('notifications');

  if (!portalTarget) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <div className={cssClasses}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    ),
    portalTarget
  );
}

export default Notification;
