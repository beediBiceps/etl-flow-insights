
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Database, Clock } from 'lucide-react';

// Sample data for different time periods
const timelineData = {
  '24h': {
    performance: [
      { date: '00:00', duration: 140, records: 42000, success: 95 },
      { date: '04:00', duration: 135, records: 45000, success: 98 },
      { date: '08:00', duration: 160, records: 48000, success: 92 },
      { date: '12:00', duration: 125, records: 44000, success: 100 },
      { date: '16:00', duration: 145, records: 46000, success: 96 },
      { date: '20:00', duration: 130, records: 47000, success: 98 }
    ],
    hourlyVolume: [
      { hour: '00:00', volume: 12 },
      { hour: '04:00', volume: 8 },
      { hour: '08:00', volume: 45 },
      { hour: '12:00', volume: 38 },
      { hour: '16:00', volume: 52 },
      { hour: '20:00', volume: 28 }
    ]
  },
  '7d': {
    performance: [
      { date: 'Mon', duration: 142, records: 43000, success: 96 },
      { date: 'Tue', duration: 138, records: 46000, success: 97 },
      { date: 'Wed', duration: 155, records: 49000, success: 94 },
      { date: 'Thu', duration: 128, records: 45000, success: 99 },
      { date: 'Fri', duration: 148, records: 47000, success: 95 },
      { date: 'Sat', duration: 132, records: 48000, success: 98 },
      { date: 'Sun', duration: 125, records: 44000, success: 100 }
    ],
    hourlyVolume: [
      { hour: 'Mon', volume: 312 },
      { hour: 'Tue', volume: 298 },
      { hour: 'Wed', volume: 445 },
      { hour: 'Thu', volume: 380 },
      { hour: 'Fri', volume: 520 },
      { hour: 'Sat', volume: 280 },
      { hour: 'Sun', volume: 195 }
    ]
  },
  '30d': {
    performance: [
      { date: 'Week 1', duration: 145, records: 45000, success: 96 },
      { date: 'Week 2', duration: 140, records: 47000, success: 94 },
      { date: 'Week 3', duration: 152, records: 44000, success: 97 },
      { date: 'Week 4', duration: 138, records: 49000, success: 98 }
    ],
    hourlyVolume: [
      { hour: 'Week 1', volume: 2430 },
      { hour: 'Week 2', volume: 2680 },
      { hour: 'Week 3', volume: 2245 },
      { hour: 'Week 4', volume: 2890 }
    ]
  },
  '90d': {
    performance: [
      { date: 'Month 1', duration: 148, records: 46000, success: 95 },
      { date: 'Month 2', duration: 142, records: 48000, success: 97 },
      { date: 'Month 3', duration: 139, records: 47000, success: 96 }
    ],
    hourlyVolume: [
      { hour: 'Month 1', volume: 9840 },
      { hour: 'Month 2', volume: 10220 },
      { hour: 'Month 3', volume: 9680 }
    ]
  }
};

const jobStatusData = [
  { name: 'Successful', value: 1198, color: '#22c55e' },
  { name: 'Failed', value: 12, color: '#ef4444' },
  { name: 'In Progress', value: 3, color: '#3b82f6' },
  { name: 'Queued', value: 8, color: '#f59e0b' }
];

const resourceUtilization = [
  { resource: 'CPU', current: 68, max: 100 },
  { resource: 'Memory', current: 74, max: 100 },
  { resource: 'Storage', current: 45, max: 100 },
  { resource: 'Network', current: 32, max: 100 }
];

export const MetricsDashboard = () => {
  const [selectedTimeline, setSelectedTimeline] = useState<'24h' | '7d' | '30d' | '90d'>('7d');

  const currentData = timelineData[selectedTimeline];

  return (
    <div className="space-y-6">
      {/* Timeline Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timeline Control
            </CardTitle>
            <Select value={selectedTimeline} onValueChange={(value: '24h' | '7d' | '30d' | '90d') => setSelectedTimeline(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Currently viewing data for: <span className="font-semibold">{
              selectedTimeline === '24h' ? 'Last 24 Hours' :
              selectedTimeline === '7d' ? 'Last 7 Days' :
              selectedTimeline === '30d' ? 'Last 30 Days' : 'Last 90 Days'
            }</span>
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends - {selectedTimeline.toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.performance}>
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

        {/* Data Volume by Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Volume - {selectedTimeline.toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={currentData.hourlyVolume}>
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
            <CardTitle>Key Performance Indicators - {selectedTimeline.toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {selectedTimeline === '24h' ? '96.7%' : 
                   selectedTimeline === '7d' ? '98.2%' :
                   selectedTimeline === '30d' ? '96.3%' : '96.0%'}
                </p>
                <p className="text-sm text-green-600">Success Rate</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {selectedTimeline === '24h' ? '2.4min' : 
                   selectedTimeline === '7d' ? '2.3min' :
                   selectedTimeline === '30d' ? '2.7min' : '2.5min'}
                </p>
                <p className="text-sm text-blue-600">Avg Duration</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-700">
                  {selectedTimeline === '24h' ? '45.3K' : 
                   selectedTimeline === '7d' ? '45.2K' :
                   selectedTimeline === '30d' ? '46.3K' : '47.0K'}
                </p>
                <p className="text-sm text-purple-600">Avg Records/Run</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-700">
                  {selectedTimeline === '24h' ? '1.2%' : 
                   selectedTimeline === '7d' ? '0.8%' :
                   selectedTimeline === '30d' ? '1.4%' : '1.1%'}
                </p>
                <p className="text-sm text-orange-600">Error Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
