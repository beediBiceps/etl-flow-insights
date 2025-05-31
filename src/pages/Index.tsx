
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BarChart3, Activity, Database, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ETL Pipeline Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Monitor, track, and optimize your data pipeline performance with comprehensive analytics
          </p>
          <Button 
            onClick={() => navigate('/analytics')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            View Analytics Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Activity className="h-6 w-6" />
                Real-time Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track your ETL pipeline status, current jobs, and progress in real-time with live updates and notifications.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Database className="h-6 w-6" />
                Detailed Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access comprehensive run history, job details, and error logs with advanced filtering and search capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <TrendingUp className="h-6 w-6" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visualize trends, analyze performance patterns, and optimize your pipeline with interactive charts and KPIs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
