import React, { useRef } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { Text } from "@chakra-ui/react";
import useSWR from "swr";
import useTranslation from "next-translate/useTranslation";

interface MonthData {
  month: string;
  value: number;
}

interface CustomTooltipProps {
  active: boolean;
  payload?: { value: number }[];
}

interface YearlyGraphItem {
  peakDailyBooking: number;
  monthName: string;
  averagePeakHour: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const point = payload[0];
    const bgColor = useColorModeValue(
      "rgba(255, 255, 255, 0.9)",
      "rgba(14, 14, 14, 1)"
    );
    return (
      <Box
        className="custom-tooltip"
        transform="translate(-50%, -50%)"
        padding="8px"
        backgroundColor={bgColor}
        border="1px solid #88DCA0"
        borderRadius="5px"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        position="relative"
        width="54px"
      >
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Text>{`${point.value}`}</Text>
        </Flex>
      </Box>
    );
  }

  return null;
};

const DailyBooking: React.FC = () => {
  const { data: bookingyearlyGraph } = useSWR("/api/bookings/averageBooking");

  const yearlyGraph = bookingyearlyGraph?.result;

  const monthData: MonthData[] = [
    { month: "", value: 0 },
    ...(yearlyGraph || []).map((item: YearlyGraphItem) => ({
      month: item.monthName,
      value: item.peakDailyBooking,
    })),
  ];

  const color2 = useColorModeValue(
    "rgba(67, 67, 69, 1)",
    "rgba(224, 224, 226, 1)"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  useTranslation("bookings");

  return (
    <Box borderWidth="1px" p={4} mx={4 } border="none" h={120}>
    
      <ResponsiveContainer width="100%" >
        
        <AreaChart data={monthData} ref={chartRef} margin={{ bottom: 20 }}>
        <XAxis dataKey="month" tickLine={false} axisLine={false} orientation="bottom"  interval={0}
            textAnchor="end"
            dy={20}
            tick={{ fill: color2 }}
            hide={true}
          />
          <YAxis hide={true} />
          <Tooltip
            content={<CustomTooltip active={false} />}
            cursor={{
              stroke: "rgba(78, 203, 113, 1)",
              strokeWidth: "2px",
              strokeDasharray: "5 5",
            }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgba(75,200,110,0.14)"
                stopOpacity={3}
              />
              <stop
                offset="70%"
                stopColor="rgba(75,200,110,0.14)"
                stopOpacity={0.5}
              />
              <stop
                offset="0%"
                stopColor="rgba(75,200,110,0.14)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area type="natural" dataKey="value" stroke="rgba(78, 203, 113, 1)" strokeWidth={"3px"} fill="url(#colorGradient)" />
          <CartesianGrid vertical={false}  stroke="transparent" strokeDasharray="solid" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DailyBooking;
