
import React from 'react';
import { PipelineOverview } from '@/components/analytics/PipelineOverview';
import { PipelineTracking } from '@/components/analytics/PipelineTracking';
import { MetricsDashboard } from '@/components/analytics/MetricsDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">ETL Pipeline Analytics</h1>
          <p className="text-slate-600 text-lg">Monitor, track, and optimize your data pipeline performance</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
            <TabsTrigger value="tracking" className="text-base">Tracking</TabsTrigger>
            <TabsTrigger value="metrics" className="text-base">Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PipelineOverview />
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <PipelineTracking />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <MetricsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
