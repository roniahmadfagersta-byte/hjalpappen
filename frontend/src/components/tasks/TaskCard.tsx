import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { Task } from '../../lib/types';
import { formatCurrency, getCategoryLabel, getCategoryIcon, getStatusColor, getStatusLabel, formatRelativeTime } from '../../lib/utils';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const statusStyle = getStatusColor(task.status);

  return (
    <Card className="task-card" hoverable>
      <div className="task-card-header">
        <div className="task-category-badge">
          <span className="badge-emoji">{getCategoryIcon(task.category)}</span>
          <span className="badge-text">{getCategoryLabel(task.category)}</span>
        </div>
        <Badge style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
          {getStatusLabel(task.status)}
        </Badge>
      </div>

      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-desc">{task.description.slice(0, 120)}...</p>

      <div className="task-card-meta">
        <div className="task-location">
          <span>📍</span> {task.address.split(',')[0]}
        </div>
        <div className="task-price">{formatCurrency(task.price)}</div>
      </div>

      <div className="task-card-time-posted">
        <span>⏰</span> Inlagt {formatRelativeTime(task.createdAt)}
      </div>

      <div className="task-card-footer">
        <div className="task-customer">
          <Avatar src={task.customerAvatar} name={task.customerName} size="sm" />
          <span>{task.customerName}</span>
        </div>
        <Link href={`/tasks/${task.id}`}>
          <Button size="sm" variant="glass">
            Visa detaljer
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TaskCard;
