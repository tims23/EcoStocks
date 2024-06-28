"use client"

import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { ToggableSkeleton } from "./ToggableSkeleton"

const Statistics = () =>{
    const stats = null
    const loading = true

    const diagram = (
        <PieChart
        slotProps={{
            pieArcLabel: {opacity: 0},
            legend: { hidden: true},
        }}
    series={[
    {
      data: [
        { id: 0, value: 10, label: 'Positive' },
        { id: 1, value: 15, label: 'Neutral' },
        { id: 2, value: 20, label: 'Negative' },
      ],
      arcLabel: (item) => item.label,
      innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
    },
  ]}
  width={400}
  height={200}
/>
    )

    return (
        <Stack direction={"column"} spacing={2}>
                <Typography  variant="subtitle2" color="text.secondary">
                    TEST
                    {stats !== null ? stats.totalValue : ""}
                </Typography> 
            <ToggableSkeleton loading={loading} variant="rounded">
                {diagram}
            </ToggableSkeleton>
        </Stack>
    )
}

export default Statistics;