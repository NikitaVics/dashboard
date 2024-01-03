import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { Text } from '@chakra-ui/react';

interface MonthData {
  month: string;
  value: number;
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const point = payload[0];
    return (
      <div className="custom-tooltip" style={{ opacity: 0.7, maxHeight: '30px', overflow: 'hidden' }}>
        <Text>{`${point.value}`}</Text>
      </div>
    );
  }

  return null;
};


const MonthTabs: React.FC = () => {
  const monthData: MonthData[] = [
    { month: '', value: 0 },
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 50 },
    { month: 'Apr', value: 20 },
    { month: 'May', value: 80 },
    { month: 'Jun', value: 60 },
    { month: 'Jul', value: 40 },
    { month: 'Aug', value: 90 },
    { month: 'Sep', value: 30 },
    { month: 'Oct', value: 70 },
    { month: 'Nov', value: 40 },
    { month: 'Dec', value: 60 },
  ];

  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const chartRef = useRef<any>(null);

  const handleMonthClick = (index: number) => {
    setSelectedMonthIndex(index);
    setShowTooltip(true);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    handleMonthClick(0);
  }, []);

  return (
    <Box borderWidth="1px" p={4} m={4}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthData} ref={chartRef}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis hide={true} />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(75,200,110,0.14)" stopOpacity={1} />
              <stop offset="70%" stopColor="rgba(255,255,255,1)" stopOpacity={1} />
              <stop offset="100%" stopColor="#fff" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area type="bumpX" dataKey="value" stroke="rgba(78, 203, 113, 1)" fill="url(#colorGradient)" />
          <ReferenceLine y={20} stroke="#E5E4E2" strokeDasharray="solid" isFront={true} />
          <ReferenceLine y={80} stroke="#E5E4E2" strokeDasharray="solid" isFront={true} />
          <ReferenceLine y={100} stroke="#E5E4E2" strokeDasharray="solid" isFront={true} />
          <ReferenceLine y={40} stroke="#E5E4E2" strokeDasharray="solid" isFront={true} />
          <ReferenceLine y={60} stroke="#E5E4E2" strokeDasharray="solid" isFront={true} />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthTabs;
