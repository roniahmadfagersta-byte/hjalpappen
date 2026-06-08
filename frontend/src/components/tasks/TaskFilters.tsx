'use client';

import React from 'react';
import Card from '../ui/Card';
import Input, { Select } from '../ui/Input';
import { TaskCategory, TaskStatus } from '../../lib/types';

interface TaskFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  radius: number;
  setRadius: (val: number) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  radius,
  setRadius,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) => {
  const categoryOptions = [
    { value: '', label: 'Alla kategorier' },
    { value: 'GARDEN', label: '🌱 Trädgård' },
    { value: 'HOME', label: '🔨 Hem & Fix' },
    { value: 'ANIMAL', label: '🐾 Djurpassning' },
    { value: 'IT', label: '💻 IT-hjälp' },
    { value: 'STUDY', label: '📚 Läxhjälp' },
    { value: 'BABYSITTING', label: '👶 Barnpassning' },
    { value: 'MOVING', label: '📦 Flytthjälp' },
    { value: 'CRAFT', label: '🎨 Hantverk' }
  ];

  const statusOptions = [
    { value: '', label: 'Alla statusar' },
    { value: 'OPEN', label: 'Öppen' },
    { value: 'ASSIGNED', label: 'Tilldelad' },
    { value: 'IN_PROGRESS', label: 'Pågående' },
    { value: 'COMPLETED', label: 'Slutförd' }
  ];

  return (
    <Card className="task-filters-card glass-heavy">
      <h3 className="filters-title">Filtrera sökning</h3>
      
      {/* Search Input */}
      <Input
        label="Sökord"
        type="text"
        placeholder="T.ex. hund, gräs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Selection */}
      <Select
        label="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
      />

      {/* Status Selection */}
      <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={statusOptions}
      />

      {/* Radius Range */}
      <div className="filter-slider-group">
        <label className="slider-label">
          Sökradie: <span>{radius === 0 ? 'Hela Sverige' : `${radius} km`}</span>
        </label>
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="filter-slider"
        />
      </div>

      {/* Price Range */}
      <div className="filter-price-range">
        <label className="input-label">Prisspann (kr)</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input-field"
          />
          <span className="price-dash">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input-field"
          />
        </div>
      </div>
    </Card>
  );
};

export default TaskFilters;
