
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Database } from 'lucide-react';

const performanceData = [
  { date: '2024-01-10', duration: 140, records: 42000, success: 95 },
  { date: '2024-01-11', duration: 135, records: 45000, success: 98 },
  { date: '2024-01-12', duration: 160, records: 48000, success: 92 },
  { date: '2024-01-13', duration: 125, records: 44000, success: 100 },
  { date: '2024-01-14', duration: 145, records: 46000, success: 96 },
  { date: '2024-01-15', duration: 130, records: 47000, success: 98 }
];

const jobStatusData = [
  { name: 'Successful', value: 1198, color: '#22c55e' },
  { name: 'Failed', value: 12, color: '#ef4444' },
  { name: 'In Progress', value: 3, color: '#3b82f6' },
  { name: 'Queued', value: 8, color: '#f59e0b' }
];

const hourlyVolumeData = [
  { hour: '00:00', volume: 12 },
  { hour: '04:00', volume: 8 },
  { hour: '08:00', volume: 45 },
  { hour: '12:00', volume: 38 },
  { hour: '16:00', volume: 52 },
  { hour: '20:00', volume: 28 }
];

const resourceUtilization = [
  { resource: 'CPU', current: 68, max: 100 },
  { resource: 'Memory', current: 74, max: 100 },
  { resource: 'Storage', current: 45, max: 100 },
  { resource: 'Network', current: 32, max: 100 }
];

export const MetricsDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance Trends */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="duration"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Duration (seconds)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="records"
                stroke="#22c55e"
                strokeWidth={2}
                name="Records Processed"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Job Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Job Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {jobStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hourly Data Volume */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Hourly Data Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={resourceUtilization} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="resource" type="category" />
              <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
              <Bar dataKey="current" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-700">98.2%</p>
              <p className="text-sm text-green-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-700">2.3min</p>
              <p className="text-sm text-blue-600">Avg Duration</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-700">45.2K</p>
              <p className="text-sm text-purple-600">Avg Records/Run</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingDown className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-700">0.8%</p>
              <p className="text-sm text-orange-600">Error Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
