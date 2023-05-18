type ChartProps<T extends import('chart.js').ChartType> = React.ComponentProps<
	import('react-chartjs-2/dist/types').TypedChartComponent<T>
>
type BarProps = ChartProps<'bar'>
type DoughnutProps = ChartProps<'doughnut'>
