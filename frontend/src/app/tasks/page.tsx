'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TaskCard from '../../components/tasks/TaskCard';
import TaskFilters from '../../components/tasks/TaskFilters';
import TaskMap from '../../components/tasks/TaskMap';
import { mockTasks } from '../../lib/mock-data';
import { Task } from '../../lib/types';

export default function TasksPage() {
  const searchParams = useSearchParams();
  
  // States for filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [status, setStatus] = useState('');
  const [radius, setRadius] = useState(0); // 0 = all
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // View mode
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // Apply filters
  useEffect(() => {
    let result = [...mockTasks];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q) ||
          task.address.toLowerCase().includes(q)
      );
    }

    // Category
    if (category) {
      result = result.filter((task) => task.category === category);
    }

    // Status
    if (status) {
      result = result.filter((task) => task.status === status);
    }

    // Min Price
    if (minPrice) {
      result = result.filter((task) => task.price >= Number(minPrice));
    }

    // Max Price
    if (maxPrice) {
      result = result.filter((task) => task.price <= Number(maxPrice));
    }

    setFilteredTasks(result);
  }, [search, category, status, radius, minPrice, maxPrice]);

  return (
    <div className="tasks-page-wrapper">
      <div className="container">
        {/* Page Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="gradient-text">Hitta Uppdrag</h1>
            <p>Här kan du söka efter lokala jobb eller erbjuda din hjälp.</p>
          </div>
          <div className="view-toggle-buttons glass">
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋 Lista
            </button>
            <button
              className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              📍 Karta
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="tasks-layout-grid">
          {/* Sidebar Filters */}
          <aside className="tasks-sidebar-area">
            <TaskFilters
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              status={status}
              setStatus={setStatus}
              radius={radius}
              setRadius={setRadius}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </aside>

          {/* Main Area */}
          <main className="tasks-main-area">
            {viewMode === 'map' ? (
              <TaskMap tasks={filteredTasks} />
            ) : (
              <>
                <div className="tasks-count-bar">
                  Hittade <strong>{filteredTasks.length}</strong> uppdrag
                </div>

                {filteredTasks.length > 0 ? (
                  <div className="tasks-cards-list">
                    {filteredTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                ) : (
                  <Card className="no-tasks-card glass">
                    <span className="no-tasks-emoji">🔍</span>
                    <h3>Inga uppdrag matchar din sökning</h3>
                    <p>Testa att nollställa dina filter eller ändra dina sökord.</p>
                    <Button
                      variant="glass"
                      onClick={() => {
                        setSearch('');
                        setCategory('');
                        setStatus('');
                        setRadius(0);
                        setMinPrice('');
                        setMaxPrice('');
                      }}
                    >
                      Nollställ filter
                    </Button>
                  </Card>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
