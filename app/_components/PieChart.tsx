"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/app/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart"

export const description = "A donut chart with text"

interface Budget {
  category: string,
  maximum: number,
  theme: string
}

interface PieChartProps {
  data: Budget[]
}

export default function PieChart_({ data }: PieChartProps) {
  
  const chartData = data.map((item: Budget) => ({
    category: item.category,
    maximum: item.maximum,
    fill: item.theme
  }));

const chartConfig = {
    visitors: {
      label: "Budget",
    },
    // Dynamic config based on budget data
    ...data.reduce((acc, item) => {
      acc[item.category] = {
        label: item.category,
        color: item.theme,
      };
      return acc;
    }, {} as Record<string, { label: string;  color: string}>)
  } satisfies ChartConfig

  const totalBudget = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.maximum, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-[300px]">
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="maximum"
              nameKey="category"
              innerRadius={50}
              strokeWidth={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${totalBudget}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Budget
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
