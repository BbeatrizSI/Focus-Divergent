interface TimerCircleProps {
  timeLeft: number
  progressPercentage: number
}

export default function TimerCircle({ timeLeft, progressPercentage }: TimerCircleProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const circumference = 2 * Math.PI * 45

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-64 h-64 md:w-72 md:h-72">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-calm-200 dark:text-peaceful-700"
          />
          <path
            d="M 50 5 A 45 45 0 1 1 49.99 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-calm-500 dark:text-peaceful-400 transition-all duration-300"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference * (1 - progressPercentage / 100),
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl md:text-5xl font-semibold text-calm-800 dark:text-peaceful-100 tabular-nums tracking-wider">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    </div>
  )
}
