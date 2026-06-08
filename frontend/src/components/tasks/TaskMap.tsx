'use client';

import React, { useState } from 'react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Link from 'next/link';
import { Task } from '../../lib/types';
import { formatCurrency, getCategoryIcon } from '../../lib/utils';

interface TaskMapProps {
  tasks: Task[];
}

export const TaskMap: React.FC<TaskMapProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Map limits based on tasks in Stockholm area
  // Lat: 59.32 to 59.37
  // Lng: 17.95 to 18.01
  const mapCenter = { lat: 59.345, lng: 17.98 };

  const getCoordinatesPct = (lat: number, lng: number) => {
    // Linear interpolation to fit Stockholm coords inside an SVG box
    const minLat = 59.32;
    const maxLat = 59.37;
    const minLng = 17.95;
    const maxLng = 18.02;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Y-axis is inverted in screen space (top is 0)
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <Card className="task-map-container glass-heavy">
      {/* SVG Background representing roads & water (simulated Stockholm map) */}
      <svg className="simulated-map-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Water body (Mälaren/Baltic) */}
        <path d="M 0,90 Q 30,80 50,60 T 100,50 L 100,100 L 0,100 Z" fill="rgba(0, 206, 201, 0.08)" />
        <path d="M 10,0 Q 20,40 50,45 T 90,0 Z" fill="rgba(0, 206, 201, 0.08)" />

        {/* Roads/Highway lines */}
        <path d="M 0,50 Q 50,48 100,50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
        <path d="M 45,0 Q 48,50 52,100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
        <path d="M 15,0 Q 40,50 85,100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

        {/* Land grids */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" strokeDasharray="1 3" />
      </svg>

      <div className="map-overlay-title">📍 Geografisk kartvy (Stockholm)</div>

      {/* Task Pin Markers */}
      {tasks.map((task) => {
        const { x, y } = getCoordinatesPct(task.location.lat, task.location.lng);
        const isSelected = selectedTask?.id === task.id;

        return (
          <button
            key={task.id}
            className={`map-marker-pin ${isSelected ? 'marker-selected' : ''}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => setSelectedTask(isSelected ? null : task)}
            title={task.title}
          >
            <span className="marker-emoji">{getCategoryIcon(task.category)}</span>
            <span className="marker-sonar"></span>
          </button>
        );
      })}

      {/* Map details popup */}
      {selectedTask && (
        <Card className="map-task-popup glass-heavy animate-fade-in" variant="glass-heavy">
          <button className="popup-close" onClick={() => setSelectedTask(null)}>✕</button>
          <div className="popup-body">
            <div className="popup-category">{getCategoryIcon(selectedTask.category)} {selectedTask.address.split(',')[0]}</div>
            <h4 className="popup-title">{selectedTask.title}</h4>
            <div className="popup-meta">
              <span className="popup-price">{formatCurrency(selectedTask.price)}</span>
              <div className="popup-cust">
                <Avatar src={selectedTask.customerAvatar} name={selectedTask.customerName} size="sm" />
                <span>{selectedTask.customerName}</span>
              </div>
            </div>
            <Link href={`/tasks/${selectedTask.id}`} className="popup-link">
              <Button size="sm" variant="primary" fullWidth>
                Visa detaljer
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default TaskMap;
