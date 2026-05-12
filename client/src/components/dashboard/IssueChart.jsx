import { Card, Text } from '@radix-ui/themes';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IssueChart = ({ data }) => {
  const chartData = [
    { name: 'Open', count: data.open, fill: '#ef4444' },
    { name: 'In Progress', count: data.inProgress, fill: '#8b5cf6' },
    { name: 'Closed', count: data.closed, fill: '#22c55e' },
  ];

  return (
    <Card>
      <Text size="3" weight="bold" className="mb-4 block">
        Issue Status Distribution
      </Text>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
