import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Play, Coffee, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";

// Loading component
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: {
  title: string;
  value: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
  trend?: string;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-3xl font-bold">{value}</div>
          {trend && (
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Quick Actions Component
function QuickActions() {
  const t = useTranslations("teacher");

  const actions = [
    {
      title: t("createTeacher"),
      description: "Add a new teacher to the system",
      href: "/teachers/create",
      icon: Users,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: t("workSessions"),
      description: "View and manage work sessions",
      href: "/work-sessions",
      icon: Clock,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: t("teacherList"),
      description: "Browse all registered teachers",
      href: "/teachers",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-lg ${action.color} transition-colors`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

// Recent Activity Component
function RecentActivity() {
  const activities = [
    {
      id: 1,
      teacher: "John Doe",
      action: "started work session",
      time: "2 minutes ago",
      status: "active",
    },
    {
      id: 2,
      teacher: "Jane Smith",
      action: "took a break for grading",
      time: "15 minutes ago",
      status: "break",
    },
    {
      id: 3,
      teacher: "Mike Johnson",
      action: "completed work session (8.5 hours)",
      time: "1 hour ago",
      status: "completed",
    },
    {
      id: 4,
      teacher: "Sarah Wilson",
      action: "ended break and resumed work",
      time: "2 hours ago",
      status: "active",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "break":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{activity.teacher}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <Link href="/work-sessions">
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const t = useTranslations("teacher");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>

        {/* Stats Overview */}
        <Suspense fallback={<DashboardSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Teachers"
              value={24}
              icon={Users}
              color="text-blue-600"
              trend="+12%"
            />
            <StatsCard
              title="Currently Working"
              value={8}
              icon={Play}
              color="text-green-600"
              trend="+5%"
            />
            <StatsCard
              title="On Break"
              value={3}
              icon={Coffee}
              color="text-orange-600"
            />
            <StatsCard
              title="Today's Sessions"
              value={15}
              icon={Calendar}
              color="text-purple-600"
              trend="+8%"
            />
          </div>
        </Suspense>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Quick Actions
          </h2>
          <QuickActions />
        </div>

        {/* Recent Activity and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Today&apos;s Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156.5h</div>
                  <div className="text-sm text-gray-600">Total Hours Today</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">6.5h</div>
                  <div className="text-sm text-gray-600">Average Session</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Most Active Department
                  </span>
                  <Badge variant="secondary">Mathematics</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Peak Hours</span>
                  <span className="text-sm font-medium">
                    9:00 AM - 11:00 AM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Break Efficiency
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    92%
                  </span>
                </div>
              </div>

              <Button className="w-full mt-4" asChild>
                <Link href="/reports">View Detailed Reports</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
