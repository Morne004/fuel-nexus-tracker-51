import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, ChartBar, Table as TableIcon } from "lucide-react";
import { ResponsiveContainer, BarChart as ReBarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import PageLayout from "@/components/layout/PageLayout";

const summaryData = [
  { label: "Total Fuel Used", value: "120,000 L" },
  { label: "Total Spend", value: "R 2,100,000.00" },
  { label: "Locations", value: "12" },
  { label: "Suppliers", value: "7" },
];

const reportTableRows = [
  { location: "JHB Airport", supplier: "Supplier A", usage: 32000, spend: 560000 },
  { location: "DUR Airport", supplier: "Supplier B", usage: 27000, spend: 465000 },
  { location: "CPT Airport", supplier: "Supplier C", usage: 35000, spend: 610000 },
  { location: "PE Airport", supplier: "Supplier D", usage: 26000, spend: 465000 },
];

const chartData = [
  { name: "Jan", usage: 23000 },
  { name: "Feb", usage: 19000 },
  { name: "Mar", usage: 24500 },
  { name: "Apr", usage: 21000 },
  { name: "May", usage: 24500 },
];

export default function Reports() {
  return (
    <PageLayout title="Reports">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <BarChart className="w-7 h-7 text-secondary" />
          Reports
        </h2>
        <p className="text-muted-foreground max-w-2xl mt-2">
          Get detailed insights, summaries, and trends for your fuel operations. Select different report types in the tabs below to view statistics, visual analytics, and detailed breakdowns.
        </p>
      </div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="summary" className="flex items-center gap-1">
            <TableIcon className="w-4 h-4" /> Summary
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-1">
            <ChartBar className="w-4 h-4" /> Charts
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-1">
            <BarChart className="w-4 h-4" /> Detailed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {summaryData.map((stat) => (
              <Card key={stat.label}>
                <CardHeader>
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-lg">{stat.value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Locations</CardTitle>
              <CardDescription>This table shows the fuel usage and spend per location.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Usage (L)</TableHead>
                    <TableHead>Spend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportTableRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.supplier}</TableCell>
                      <TableCell>{row.usage.toLocaleString()}</TableCell>
                      <TableCell>{"R " + row.spend.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">Total</TableCell>
                    <TableCell className="font-bold">
                      {reportTableRows.reduce((a, b) => a + b.usage, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold">
                      {"R " +
                        reportTableRows
                          .reduce((a, b) => a + b.spend, 0)
                          .toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="charts">
          <div className="mb-5">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Usage Trend</CardTitle>
                <CardDescription>Monthly fuel usage for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    usage: {
                      label: "Usage (L)",
                      color: "#7F6CB1",
                      icon: ChartBar,
                    },
                  }}
                  className="min-h-[350px]"
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <ReBarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="usage" fill="#7F6CB1" name="Usage (L)" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Report</CardTitle>
              <CardDescription>
                Download the complete detailed usage and spend records as CSV or PDF.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded shadow font-medium">Download CSV</button>
                <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded shadow font-medium">Download PDF</button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                To access line-item records or custom reports, contact support or use the available exports above.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
