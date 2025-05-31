
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Eye, RefreshCw } from 'lucide-react';

const pipelineRuns = [
  {
    id: 'run-2024-001',
    startTime: '2024-01-15 10:30:00',
    endTime: '2024-01-15 10:32:15',
    status: 'completed',
    duration: '2m 15s',
    recordsProcessed: 45200,
    jobs: [
      { name: 'Extract', status: 'completed', duration: '45s', records: 45200 },
      { name: 'Transform', status: 'completed', duration: '1m 10s', records: 45200 },
      { name: 'Load', status: 'completed', duration: '20s', records: 45200 }
    ]
  },
  {
    id: 'run-2024-002',
    startTime: '2024-01-15 09:30:00',
    endTime: '2024-01-15 09:31:58',
    status: 'completed',
    duration: '1m 58s',
    recordsProcessed: 42800,
    jobs: [
      { name: 'Extract', status: 'completed', duration: '38s', records: 42800 },
      { name: 'Transform', status: 'completed', duration: '1m 5s', records: 42800 },
      { name: 'Load', status: 'completed', duration: '15s', records: 42800 }
    ]
  },
  {
    id: 'run-2024-003',
    startTime: '2024-01-15 08:30:00',
    endTime: '2024-01-15 08:31:12',
    status: 'failed',
    duration: '1m 12s',
    recordsProcessed: 0,
    error: 'Connection timeout during transform phase',
    jobs: [
      { name: 'Extract', status: 'completed', duration: '40s', records: 38500 },
      { name: 'Transform', status: 'failed', duration: '32s', records: 0, error: 'Connection timeout' },
      { name: 'Load', status: 'skipped', duration: '0s', records: 0 }
    ]
  }
];

export const PipelineTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRun, setSelectedRun] = useState<string | null>(null);

  const filteredRuns = pipelineRuns.filter(run => {
    const matchesSearch = run.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || run.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'secondary',
      failed: 'destructive',
      running: 'default',
      skipped: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Pipeline Run History</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search runs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="running">Running</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Runs Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Run ID</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRuns.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="font-medium">{run.id}</TableCell>
                    <TableCell>{run.startTime}</TableCell>
                    <TableCell>{run.duration}</TableCell>
                    <TableCell>{getStatusBadge(run.status)}</TableCell>
                    <TableCell>{run.recordsProcessed.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRun(selectedRun === run.id ? null : run.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Job Details */}
      {selectedRun && (
        <Card>
          <CardHeader>
            <CardTitle>Job Details - {selectedRun}</CardTitle>
          </CardHeader>
          <CardContent>
            {pipelineRuns
              .filter(run => run.id === selectedRun)
              .map(run => (
                <div key={run.id} className="space-y-4">
                  {run.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-medium">Error:</p>
                      <p className="text-red-700">{run.error}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {run.jobs.map((job, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{job.name}</h4>
                            {getStatusBadge(job.status)}
                          </div>
                          <div className="space-y-1 text-sm text-slate-600">
                            <p>Duration: {job.duration}</p>
                            <p>Records: {job.records.toLocaleString()}</p>
                            {job.error && (
                              <p className="text-red-600">Error: {job.error}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
