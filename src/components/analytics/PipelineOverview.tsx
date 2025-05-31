
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Database, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const mockPipelineData = {
  status: 'running',
  currentJob: 'Transform Data',
  progress: 75,
  totalRuns: 1247,
  successfulRuns: 1198,
  failedRuns: 12,
  avgDuration: '2.3 minutes',
  lastRun: '2 minutes ago',
  recordsProcessed: '2.1M',
  dataVolume: '485 GB'
};

const recentRuns = [
  { id: 'run-001', status: 'completed', duration: '2m 15s', records: '45.2K', timestamp: '5 min ago' },
  { id: 'run-002', status: 'completed', duration: '1m 58s', records: '42.8K', timestamp: '35 min ago' },
  { id: 'run-003', status: 'failed', duration: '1m 12s', records: '0', timestamp: '1h ago' },
  { id: 'run-004', status: 'completed', duration: '2m 45s', records: '48.1K', timestamp: '2h ago' }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'running': return <Activity className="h-4 w-4 text-blue-500" />;
    case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
    default: return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    running: 'default',
    completed: 'secondary',
    failed: 'destructive'
  } as const;
  
  return (
    <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const PipelineOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Pipeline Status Card */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Current Pipeline Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              {getStatusBadge(mockPipelineData.status)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Job:</span>
              <span className="text-sm text-slate-600">{mockPipelineData.currentJob}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress:</span>
                <span className="text-sm text-slate-600">{mockPipelineData.progress}%</span>
              </div>
              <Progress value={mockPipelineData.progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-slate-600">Records Processed</p>
              <p className="text-2xl font-bold">{mockPipelineData.recordsProcessed}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Duration</p>
              <p className="text-2xl font-bold">{mockPipelineData.avgDuration}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Runs */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Pipeline Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRuns.map((run) => (
              <div key={run.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(run.status)}
                  <div>
                    <p className="font-medium text-sm">{run.id}</p>
                    <p className="text-xs text-slate-500">{run.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{run.duration}</p>
                  <p className="text-xs text-slate-500">{run.records} records</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
