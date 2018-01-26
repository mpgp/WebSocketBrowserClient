import * as NotificationSystem from 'react-notification-system';

class NotificationService {
    private container: NotificationSystem.System;

    initialize(container: NotificationSystem.System) {
        this.container = container;
    }

    error(params: NotificationSystem.Notification) {
        this.show(params, 'error');
    }

    info(params: NotificationSystem.Notification) {
        this.show(params, 'info');
    }

    success(params: NotificationSystem.Notification) {
        this.show(params, 'success');
    }

    warning(params: NotificationSystem.Notification) {
        this.show(params, 'warning');
    }

    private show(params: NotificationSystem.Notification, level: 'error' | 'warning' | 'info' | 'success') {
        this.container.addNotification({
            ...params,
            level
        });
    }
}

export default new NotificationService();
